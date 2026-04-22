# itsjaya — AI Portfolio

Live at **[sabarishreddy99.github.io/jayaremala](https://sabarishreddy99.github.io/jayaremala)**

Personal AI-assisted portfolio for **Jaya Sabarish Reddy Remala**. Two entry points: a full-screen RAG-powered AI chatbot (Avocado) and a classic portfolio with experience, projects, education, and a blog with engagement tracking.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                                 │
│                                                                             │
│  ┌────────────────────────┐        ┌────────────────────────────────────┐   │
│  │   Avocado Chatbot      │        │       Portfolio + Blog             │   │
│  │   /  and  /chat        │        │  /portfolio  /blog  /experience    │   │
│  │                        │        │  /education  /projects             │   │
│  │  ChatInterface (SSE)   │        │  BlogPostList  BlogEngagement      │   │
│  │  ChatMessage (md)      │        │  BlogIndexStats  BlogGuideDrawer   │   │
│  │  Model badge + stats   │        │  (live stats dashboard inside)     │   │
│  └───────────┬────────────┘        └─────────────┬──────────────────────┘   │
│              │                                   │                          │
└──────────────┼───────────────────────────────────┼──────────────────────────┘
               │ HTTPS / SSE                       │ HTTPS REST
               ▼                                   ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       FASTAPI BACKEND  (Railway)                             │
│                                                                              │
│   POST /ai/chat/stream   ──►  RAG Pipeline  ──►  Gemini SSE stream           │
│   POST /ai/chat          ──►  RAG Pipeline  ──►  Gemini sync                 │
│   POST /blog/{slug}/view ──►  SQLite — unique view per IP                   │
│   POST /blog/{slug}/clap ──►  SQLite — cumulative claps (max 50/user/post)  │
│   GET  /blog/{slug}/stats                                                    │
│   GET  /blog/stats/summary                                                   │
│   GET  /stats                 total_responses, unique_visitors               │
│   GET  /stats/overview        7d / 30d / 1y / all-time for all metrics      │
│   GET  /health                                                               │
│                                                                              │
│  ┌──────────────────────────┐    ┌────────────────────────────────────────┐  │
│  │      RAG Store           │    │              SQLite                    │  │
│  │  ChromaDB (persistent)   │    │   analytics.db  (Railway volume)       │  │
│  │  all-MiniLM-L6-v2 embed  │    │   ├─ interactions  (chat analytics)   │  │
│  │  BM25 (rank_bm25)        │    │   ├─ blog_views   (unique / IP / post) │  │
│  │  Cross-encoder reranker  │    │   └─ blog_claps   (≤50 / user / post) │  │
│  │  RRF merge               │    └────────────────────────────────────────┘  │
│  └──────────────────────────┘                                                │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  Knowledge Base  backend/data/knowledge/                               │  │
│  │  profile.json  experience.json  education.json  projects.json          │  │
│  │  skills.json   testimonials.json   blog.json (auto-generated)          │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
               │
               │ Google AI API
               ▼
┌───────────────────────────────────┐
│  Gemini (primary model)           │
│  + fallback chain on 503 / 429    │
│  capacity errors                  │
└───────────────────────────────────┘
```

---

## RAG Pipeline

Every `/ai/chat/stream` request runs a 4-stage hybrid retrieval pipeline before Gemini sees the message.

```
User message
     │
     ▼
┌────────────────────────────────────────────────┐
│  Stage 1 — QUERY EXPANSION                    │
│  Up to 4 targeted query variants:             │
│  • Verbatim user message                      │
│  • Name-anchored ("... Jaya Sabarish Reddy")  │
│  • Topic keyword (project / skills / award /  │
│    experience / contact / education)          │
│  • Recent conversation context (follow-ups)   │
└────────────────────┬───────────────────────────┘
                     │ 4 queries
         ┌───────────┴────────────┐
         ▼                        ▼
┌─────────────────┐    ┌──────────────────────────┐
│ Stage 2a DENSE  │    │ Stage 2b LEXICAL          │
│ ChromaDB query  │    │ BM25 (rank_bm25 Okapi)    │
│ all-MiniLM-L6   │    │ Catches exact keyword     │
│ HNSW cosine     │    │ matches: "3000 RPS",      │
│ Batched encode  │    │ "Qualcomm", "SnapLog",    │
│ ~1 forward pass │    │ company names, numbers    │
│ top-6 / query   │    │ top-15 results            │
└────────┬────────┘    └────────────┬─────────────┘
         └──────────┬───────────────┘
                    ▼
┌────────────────────────────────────────────────┐
│  Stage 3 — RECIPROCAL RANK FUSION              │
│  score(doc) = Σ 1 / (60 + rank_i)             │
│  k=60 from Cormack et al. 2009                 │
│  Merges dense + lexical → up to 20 candidates  │
└────────────────────┬───────────────────────────┘
                     ▼
┌────────────────────────────────────────────────┐
│  Stage 4 — CROSS-ENCODER RERANK                │
│  cross-encoder/ms-marco-MiniLM-L-6-v2          │
│  Scores (query, passage) pairs jointly         │
│  → top 5 final chunks                          │
│  Falls back to RRF order if model not ready    │
└────────────────────┬───────────────────────────┘
                     ▼
         Chunks injected into Gemini
         system prompt as context
                     │
                     ▼
         SSE tokens streamed to client
```

### Knowledge document types

| Type | Source | Strategy |
|---|---|---|
| `profile` | profile.json | 3 docs: overview, bio, contact |
| `experience` | experience.json | Overview + one doc per bullet per role |
| `education` | education.json | Overview + one doc per highlight per degree |
| `project` | projects.json | Overview + tech stack per project |
| `skills` | skills.json | One doc per category + one aggregated |
| `faq` | Hard-coded in ingest.py | Pre-answers common recruiter questions |
| `blog` | blog.json (auto-generated) | One doc per post (title + description + 2k body chars) |

### Hash-based re-ingest

On every deploy, `run_ingest()` computes SHA-256 of all JSON files and compares against the stored hash in `chroma_db/.ingest_hash`. Ingests only when changed — fast startup if nothing changed.

### Gemini fallback chain

On 503 (UNAVAILABLE) or 429 (RESOURCE_EXHAUSTED), the backend retries through the chain automatically:

```
GEMINI_MODEL           primary     (default: gemini-2.5-flash)
GEMINI_FALLBACK_MODELS fallbacks   (gemini-2.0-flash, gemini-2.0-flash-lite, gemini-flash-latest)
```

---

## Data Flow — Single Source of Truth

```
backend/data/knowledge/*.json   ← EDIT HERE ONLY
        │
        │  scripts/sync-knowledge.mjs
        │  (auto-runs via npm predev / prebuild)
        │
        ├──► frontend/src/data/knowledge/   (synced copies — do not edit directly)
        │    TypeScript files import from these with typed interfaces
        │
        └──► backend/data/knowledge/blog.json
             (generated from frontend/src/content/blog/*.mdx)
```

### CI/CD pipeline on every push to main

```
git push origin main
        │
        ▼  GitHub Actions
        │
        ├── npm install
        ├── npm run build
        │     └── prebuild: sync-knowledge.mjs
        │           ├── parses all MDX frontmatter + body
        │           └── writes blog.json
        │
        ├── commits synced files [skip ci]
        │     (prevents infinite workflow loop)
        │
        ├── uploads frontend/out/ → GitHub Pages
        │
        └── Railway detects new commit → redeploys backend
              └── FastAPI lifespan startup:
                    ├── analytics.init_db()   — CREATE TABLE IF NOT EXISTS
                    ├── blog_stats.init_db()  — CREATE TABLE IF NOT EXISTS
                    ├── run_ingest()          — hash check → skip or re-ingest
                    └── warmup()              — pre-loads embedding model + cross-encoder
```

---

## Analytics Architecture

All engagement data lives in a single SQLite file on a Railway persistent volume. IPs are SHA-256 hashed — never stored raw.

```
analytics.db
├── interactions
│   ├── ip_hash     TEXT       SHA-256 of visitor IP
│   └── created_at  TIMESTAMP
│       → unique_visitors, total_responses
│       → time-filtered: 7d / 30d / 1y / all-time
│
├── blog_views
│   ├── slug        TEXT
│   ├── ip_hash     TEXT
│   └── created_at  TIMESTAMP
│   UNIQUE(slug, ip_hash)   ← one view per IP per post (idempotent)
│
└── blog_claps
    ├── slug        TEXT
    ├── ip_hash     TEXT
    ├── count       INTEGER    cumulative, capped at 50 per user per post
    └── updated_at  TIMESTAMP
    UNIQUE(slug, ip_hash)
```

`GET /stats/overview` returns all metrics for all time periods in one call:

```json
{
  "site": {
    "week":  { "unique_visitors": N, "total_responses": N },
    "month": { "unique_visitors": N, "total_responses": N },
    "year":  { "unique_visitors": N, "total_responses": N },
    "all":   { "unique_visitors": N, "total_responses": N }
  },
  "blog": {
    "week":  { "total_views": N, "total_claps": N, "posts": [...] },
    "month": { ... },
    "year":  { ... },
    "all":   { "total_views": N, "total_claps": N, "posts": [...] }
  }
}
```

---

## Frontend Architecture

### Routing

| Route | Notes |
|---|---|
| `/` | Avocado — full-screen chatbot, no nav/footer |
| `/chat` | Same chatbot, accessible from portfolio nav |
| `/portfolio` | Hero with domain chips, featured projects, skills, testimonials, contact |
| `/experience` | Work history timeline |
| `/education` | Education cards |
| `/projects` | Project grid with source link pill tag buttons |
| `/blog` | Index sorted by `publishedAt` (immutable sort key) |
| `/blog/[slug]` | Post rendered in Source Serif 4 font |

All portfolio routes share a layout via the `(portfolio)` route group — adds no URL segment.

### Static export + basePath

Next.js outputs a fully static site (`output: "export"`) deployed to GitHub Pages. `basePath: "/jayaremala"` is applied in production — always use `<Link>` from `next/link` for internal navigation, never plain `<a>` tags.

### Blog engagement components

| Component | Responsibility |
|---|---|
| `BlogPostList` | Client component — owns summary fetch + renders post cards with per-post stats |
| `BlogIndexStats` | Client component — total claps + views in blog header |
| `BlogEngagement` | Client component on each post page — records view on mount, clap button with 1.5s debounce batching, max 50 claps/user/post, float-up animation |
| `BlogGuideDrawer` | Floating button above Avocado FAB on mobile — MDX reference + live stats dashboard (`/stats/overview`) with 7d/30d/1y/all-time period table + per-post breakdown |

### Chat interface

```
ChatInterface
  ├── POST /ai/chat/stream (SSE)
  │   ├── { token: "..." }                 streamed text chunks
  │   └── { done: true, model: "...", sources: [...] }
  ├── activeModel state  →  green pill badge after first response
  ├── stats state        →  fetches /stats on mount, shows response count + visitors
  └── ChatMessage        →  full block + inline markdown renderer
        (headings, bullets, numbered lists, bold, italic, code, links, dividers)
```

---

## Repository Layout

```
itsjaya/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                    Avocado chatbot
│   │   │   ├── (portfolio)/layout.tsx      Nav + Footer + mobile FAB
│   │   │   ├── (portfolio)/page.tsx        Portfolio home
│   │   │   ├── (portfolio)/blog/page.tsx   Blog index
│   │   │   └── (portfolio)/blog/[slug]/    Blog post
│   │   ├── components/
│   │   │   ├── chat/                       ChatInterface, ChatMessage, ChatInput
│   │   │   └── blog/                       BlogEngagement, BlogIndexStats,
│   │   │                                   BlogPostList, BlogGuideDrawer
│   │   ├── data/knowledge/                 Synced JSON copies (do not edit)
│   │   ├── data/*.ts                       Typed re-exports
│   │   ├── lib/blog.ts                     MDX loader, sorts by publishedAt
│   │   └── content/blog/*.mdx              Blog post source files
│   ├── public/blog/                        Blog images
│   └── next.config.ts                      output: export, basePath
│
├── backend/
│   ├── src/app/
│   │   ├── main.py                         FastAPI + lifespan
│   │   ├── core/settings.py                Pydantic settings
│   │   ├── routers/ai.py                   /ai/* endpoints + RAG orchestration
│   │   ├── routers/blog.py                 /blog/* engagement endpoints
│   │   ├── routers/stats.py                /stats  /stats/overview
│   │   ├── rag/store.py                    ChromaDB + BM25 + cross-encoder + RRF
│   │   ├── rag/ingest.py                   Hash-based re-ingest + document builders
│   │   └── db/analytics.py                 Chat analytics (period-aware)
│   │   └── db/blog_stats.py                Blog views + claps (period-aware)
│   └── data/knowledge/                     Single source of truth (edit here)
│
├── scripts/sync-knowledge.mjs              MDX → blog.json + JSON → frontend sync
├── infra/compose.yml                       Docker Compose
├── infra/docker/                           Dockerfiles
└── .github/workflows/deploy.yml           GH Actions CI/CD
```

---

## Local Development

```bash
# 1. Environment
cp .env.example .env
# Fill in: GOOGLE_API_KEY, NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# 2. Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --app-dir src --reload
# → http://localhost:8000  (auto-ingests knowledge base on first start)

# 3. Frontend (separate terminal)
cd frontend
npm install
npm run dev
# → Runs sync-knowledge.mjs first, then http://localhost:3000

# 4. Or with Docker Compose
docker compose -f infra/compose.yml up --build
```

```bash
# Sync backend JSON → frontend (after editing any knowledge/*.json)
node scripts/sync-knowledge.mjs

# Force full re-ingest of ChromaDB
cd backend/src && python -m app.rag.ingest

# Lint / test
cd frontend && npm run lint
cd backend  && ruff check src && pytest
```

---

## Environment Variables

### Frontend

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | Backend URL |
| `NEXT_PUBLIC_BLOG_FONT` | `Source_Serif_4` | Documents font choice (static import in layout.tsx) |

### Backend (set in Railway → Variables)

| Variable | Default | Purpose |
|---|---|---|
| `GOOGLE_API_KEY` | — | Required — Google AI API key |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Primary model |
| `GEMINI_FALLBACK_MODELS` | `gemini-2.0-flash,...` | Comma-separated fallbacks on 503/429 |
| `ANALYTICS_DB_PATH` | `./chroma_db/analytics.db` | Set to `/data/analytics.db` with Railway volume |
| `FRONTEND_ORIGIN` | `http://localhost:3000` | CORS allowed origin |

---

## Deployment

| Layer | Platform | Trigger |
|---|---|---|
| Frontend | GitHub Pages | Push to `main` → GH Actions builds + deploys |
| Backend API | Railway | Push to `main` → Railway auto-redeploys |
| Knowledge base | Railway (persistent volume) | Hash change on deploy → auto re-ingest |
| Analytics DB | Railway volume (`/data`) | Persists across redeploys (requires Railway Pro volume) |

The only action required for any update — portfolio data, new blog post, or code change — is `git push`.

---

Built by [Jaya Sabarish Reddy Remala](https://linkedin.com/in/jayasabarishreddyr) — NYU Tandon CS MS · Qualcomm Edge AI Hackathon Winner · formerly NYU IT, Shell PLC, Wipro.

→ [Resume](https://drive.google.com/drive/u/0/folders/1vm35z-6VQjtO9A8ZBgCvvSP_7_POPTrV) · [GitHub](https://github.com/sabarishreddy99) · [LinkedIn](https://linkedin.com/in/jayasabarishreddyr)
