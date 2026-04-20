from __future__ import annotations

import json
import logging
from typing import Iterator, Literal

import google.genai as genai
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.core.settings import settings
from app.rag import store as rag_store

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/ai", tags=["ai"])

_genai_client: genai.Client | None = None

SYSTEM_PROMPT = """You are Avocado, the personal AI assistant of Jaya Sabarish Reddy Remala (a Software Engineer).
Your role is to help recruiters and visitors understand Jaya's professional background accurately.

GUIDELINES:
- Refer to Jaya in third person ("He", "Jaya") — you represent him, you are not him
- Be direct and specific — cite exact numbers and metrics whenever the context contains them
- For broad questions ("tell me about Jaya"), lead with his most impressive achievements
- For technical questions, name specific technologies, frameworks, and measured outcomes
- Keep responses focused: 2–3 sentences for simple questions, structured paragraphs for detailed ones
- If information is not in the provided context, say: "I don't have that detail — reach Jaya directly at jr6421@nyu.edu"
- Never fabricate skills, experiences, or facts not present in the context
- When asked what makes Jaya special, always highlight: Qualcomm Edge AI Hackathon winner, 78% RAG latency reduction at 3K+ RPS, zero-data-loss Shell maritime infrastructure
- Do not repeat the context verbatim — synthesize it into a natural, helpful answer"""


def _get_client() -> genai.Client:
    global _genai_client
    if _genai_client is None:
        if not settings.google_api_key:
            raise HTTPException(status_code=503, detail="GOOGLE_API_KEY is not configured")
        _genai_client = genai.Client(api_key=settings.google_api_key)
    return _genai_client


def _build_rag_queries(req: ChatRequest) -> list[str]:
    """Generate multiple query angles from the current message + recent history.
    Multi-query retrieval dramatically improves recall for follow-up and vague questions.
    """
    queries = [req.message]

    # Add recent user turns as extra context for retrieval
    recent_user_msgs = [m.content for m in req.messages[-6:] if m.role == "user"][-2:]
    if recent_user_msgs:
        combined = " ".join(recent_user_msgs) + " " + req.message
        if combined.strip() != req.message.strip():
            queries.append(combined)

    # Add a keyword-stripped version for broad concept matching
    stripped = req.message.lower()
    if any(kw in stripped for kw in ["experience", "work", "job", "role", "company"]):
        queries.append("work experience roles companies")
    if any(kw in stripped for kw in ["project", "built", "created", "developed"]):
        queries.append("projects built SnapLog CodeCollab Multi-Agent GeneCart")
    if any(kw in stripped for kw in ["skill", "tech", "stack", "language", "know"]):
        queries.append("technical skills programming languages frameworks")
    if any(kw in stripped for kw in ["educat", "degree", "study", "university", "nyu", "school"]):
        queries.append("education degree NYU Tandon VIT")
    if any(kw in stripped for kw in ["award", "win", "hackathon", "qualcomm", "achiev"]):
        queries.append("Qualcomm hackathon award SnapLog achievement")
    if any(kw in stripped for kw in ["contact", "email", "reach", "hire", "linkedin"]):
        queries.append("contact email LinkedIn GitHub phone")
    if any(kw in stripped for kw in ["resume", "cv", "download", "pdf"]):
        queries.append("resume CV download link Google Drive")

    return queries


def _build_context(chunks: list[dict]) -> str:
    """Format retrieved chunks into a clean, structured context block."""
    if not chunks:
        return "No specific context retrieved."

    # Group by type for cleaner context
    by_type: dict[str, list[str]] = {}
    for c in chunks:
        t = c["type"]
        by_type.setdefault(t, []).append(c["text"])

    sections = []
    type_labels = {
        "profile": "Profile",
        "experience": "Work Experience",
        "education": "Education",
        "project": "Projects",
        "skills": "Skills",
        "faq": "Key Facts",
    }
    for t in ["faq", "profile", "experience", "project", "education", "skills"]:
        if t in by_type:
            label = type_labels.get(t, t.title())
            content = "\n".join(f"• {text}" for text in by_type[t])
            sections.append(f"[{label}]\n{content}")

    return "\n\n".join(sections)


def _build_chat_prompt(req: ChatRequest, context: str) -> str:
    history_text = ""
    for m in req.messages[-6:]:
        prefix = "User" if m.role == "user" else "Avocado"
        history_text += f"{prefix}: {m.content}\n"

    return (
        f"{SYSTEM_PROMPT}\n\n"
        f"--- CONTEXT ABOUT JAYA ---\n{context}\n--- END CONTEXT ---\n\n"
        f"Conversation history:\n{history_text}"
        f"User: {req.message}\nAvocado:"
    )


def _generate(system: str, prompt: str) -> str:
    client = _get_client()
    response = client.models.generate_content(
        model=settings.gemma_model,
        contents=f"{system}\n\n{prompt}" if system else prompt,
    )
    return response.text or ""


def _stream_tokens(full_prompt: str) -> Iterator[str]:
    client = _get_client()
    for chunk in client.models.generate_content_stream(
        model=settings.gemma_model,
        contents=full_prompt,
    ):
        if chunk.text:
            yield chunk.text


# ── Models ────────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = []
    message: str


class ChatResponse(BaseModel):
    reply: str
    sources: list[str]


# ── /ai/chat (non-streaming fallback) ────────────────────────────────────────

@router.post("/chat", response_model=ChatResponse)
def ai_chat(req: ChatRequest) -> ChatResponse:
    queries = _build_rag_queries(req)
    chunks = rag_store.query_multi(queries)
    context = _build_context(chunks)
    sources = [f"{c['type']}:{c['id']}" for c in chunks]
    prompt = _build_chat_prompt(req, context)
    reply = _generate("", prompt)
    return ChatResponse(reply=reply.strip(), sources=sources)


# ── /ai/chat/stream (SSE streaming) ──────────────────────────────────────────

@router.post("/chat/stream")
def ai_chat_stream(req: ChatRequest) -> StreamingResponse:
    queries = _build_rag_queries(req)
    chunks = rag_store.query_multi(queries)
    context = _build_context(chunks)
    sources = [f"{c['type']}:{c['id']}" for c in chunks]
    full_prompt = _build_chat_prompt(req, context)

    def event_stream():
        try:
            for token in _stream_tokens(full_prompt):
                yield f"data: {json.dumps({'token': token})}\n\n"
            yield f"data: {json.dumps({'done': True, 'sources': sources})}\n\n"
        except Exception as exc:
            logger.error("Streaming error: %s", exc)
            yield f"data: {json.dumps({'error': str(exc)})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── /ai/summarize ─────────────────────────────────────────────────────────────

class SummarizeRequest(BaseModel):
    text: str


@router.post("/summarize")
def ai_summarize(req: SummarizeRequest) -> dict:
    reply = _generate(
        "You are a concise writing assistant. Summarize clearly and briefly.",
        f"Summarize:\n{req.text}",
    )
    return {"result": reply.strip()}


# ── /ai/draft ─────────────────────────────────────────────────────────────────

class DraftRequest(BaseModel):
    prompt: str


@router.post("/draft")
def ai_draft(req: DraftRequest) -> dict:
    reply = _generate("You are a writing assistant. Write clear, engaging prose.", req.prompt)
    return {"result": reply.strip()}


# ── /ai/rewrite ───────────────────────────────────────────────────────────────

class RewriteRequest(BaseModel):
    text: str
    instruction: str = "Improve clarity and conciseness"


@router.post("/rewrite")
def ai_rewrite(req: RewriteRequest) -> dict:
    reply = _generate(
        "You are an expert editor. Rewrite the text according to the instruction.",
        f"Instruction: {req.instruction}\n\nText:\n{req.text}",
    )
    return {"result": reply.strip()}
