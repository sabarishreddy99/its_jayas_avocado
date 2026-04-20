# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Personal AI-assisted portfolio for Jaya Sabarish Reddy Remala. The landing page is a **RAG-powered recruiter chatbot** (Gemma 4 via Google AI API + ChromaDB). From there, visitors can navigate to a full portfolio (Experience, Education, Projects, Blog).

## Routing

| Route | Purpose |
|---|---|
| `/` | AI Chatbot landing page |
| `/portfolio` | Portfolio home — hero, featured projects, skills, contact |
| `/experience` | Work history timeline |
| `/education` | Education cards |
| `/projects` | Projects grid |
| `/blog` | Blog index (MDX) |
| `/blog/[slug]` | Blog post |

Portfolio routes (`/portfolio`, `/experience`, `/education`, `/projects`, `/blog`) live inside `frontend/src/app/(portfolio)/` route group, sharing a `Nav` + `Footer` layout.

## Commands

### Frontend (Next.js 16, React 19, Tailwind 4)

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

### Backend (FastAPI, Python 3.11+)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --app-dir src --reload   # http://localhost:8000
# On startup, auto-ingests knowledge base into ChromaDB
# To re-ingest manually:
python -m app.rag.ingest                      # (from backend/src/)
pytest
ruff check src
```

### Docker

```bash
cp .env.example .env   # fill in GOOGLE_API_KEY
docker compose -f infra/compose.yml up --build
```

## Architecture

### Frontend (`frontend/src/`)

- `app/page.tsx` — Chatbot landing (full-screen)
- `app/(portfolio)/layout.tsx` — Shared Nav + Footer for all portfolio routes
- `components/chat/` — `ChatInterface`, `ChatMessage`, `ChatInput` (all client components)
- `components/Nav.tsx` — Portfolio navigation (client component, uses `usePathname`)
- `components/Footer.tsx` — Footer with social links from `data/profile.ts`
- `data/` — Static TypeScript data: `profile.ts`, `experience.ts`, `education.ts`, `projects.ts`, `skills.ts`
- `lib/blog.ts` — MDX blog loader (`getAllPosts`, `getPostBySlug`, `getAllSlugs`)
- `lib/api/client.ts` — `apiPost<T>()` helper pointing to backend
- `content/blog/*.mdx` — Blog posts with frontmatter (`title`, `date`, `description`, `tags[]`)

### Backend (`backend/src/app/`)

- `main.py` — FastAPI app; auto-ingests RAG knowledge base at startup via lifespan
- `routers/ai.py` — All AI endpoints: `POST /ai/chat`, `/ai/summarize`, `/ai/draft`, `/ai/rewrite`
- `rag/store.py` — ChromaDB persistent client + `query()` function
- `rag/ingest.py` — Reads `backend/data/knowledge/*.json`, upserts into ChromaDB (idempotent)
- `core/settings.py` — Pydantic settings: `frontend_origin`, `google_api_key`, `gemma_model`

### RAG flow for `/ai/chat`

1. User message → embed with `all-MiniLM-L6-v2` (sentence-transformers)
2. Query ChromaDB for top-5 relevant chunks from knowledge base
3. Inject chunks as context into Gemma 4 system prompt
4. Return `{ reply, sources }`

### Knowledge base (`backend/data/knowledge/`)

JSON files mirroring the TypeScript data files. Update both when changing profile data:
- `profile.json`, `experience.json`, `education.json`, `projects.json`, `skills.json`

## Environment variables

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000   # frontend → backend
FRONTEND_ORIGIN=http://localhost:3000            # backend CORS
GOOGLE_API_KEY=                                  # required for AI endpoints
GEMMA_MODEL=gemma-4-31b-it                       # Gemma model via Google AI API
```

## Key conventions

- Backend module path is `backend/src`; uvicorn must use `--app-dir backend/src`
- Tailwind 4 config lives in `globals.css` via `@theme inline` (no `tailwind.config.js`)
- Blog MDX frontmatter shape: `title`, `date` (YYYY-MM-DD string), `description`, `tags[]`
- The `(portfolio)` route group adds no URL segment — `/experience` not `/(portfolio)/experience`
- ChromaDB persists to `backend/chroma_db/` (git-ignored)
