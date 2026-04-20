# AI-assisted Portfolio + Blog

Minimal, editorial portfolio and personal blog with AI-assisted writing and project Q&A.

## Tech stack
- **Frontend**: Next.js (App Router) + Tailwind CSS
- **Backend**: FastAPI (Python)
- **Dev**: Docker Compose (optional), or run frontend/backend separately

## Local development

1) Copy env files

```bash
cp .env.example .env
```

2) Start services (once Docker files are added)

```bash
docker compose -f infra/compose.yml up --build
```

## Project structure
- `frontend/`: Next.js web app
- `backend/`: FastAPI service (AI endpoints)
- `infra/`: docker + compose for local dev
- `scripts/`: helper scripts

