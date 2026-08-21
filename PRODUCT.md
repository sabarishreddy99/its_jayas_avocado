# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — hiring managers and recruiters.** Someone screening Jaya for a
software engineering role, usually under time pressure, deciding whether this
is worth a call. They arrive from a résumé link, LinkedIn, or a search, skim,
and either book or leave.

**Secondary, deliberately served — engineering peers.** Someone who arrived
from a blog post, the `/lab` build logs, or the public MCP server and wants to
see how the systems actually work. `/lab`, `/system`, `/mcp`, and Agent mode
exist for this reader.

The order is confirmed: the hiring skim comes first, but serving it must not
flatten the depth peers come for. Both audiences read the same pages.

Scope note: this record covers the **portfolio + Avocado** only. gradeVITian
(VIT students) and VRF Bricks (brick buyers in Kavali) ship from the same repo
but are separate products with separate users; they are documented in
`docs/GRADEVITIAN.md` and `docs/VRFBRICKS.md` and are intentionally not
averaged into this record.

## Product Purpose

`jayaremala.com` is Jaya Sabarish Reddy Remala's personal portfolio, with an
AI assistant (Avocado) answering for it from the same knowledge base that
renders the pages. It exists to convert a screening visit into a conversation.

**Success is a booked call or an inbound reply** — the Google Calendar booking
link, email, or LinkedIn. Comprehension and credibility are means to that end,
not the scoreboard. Every element on the page is judged by whether it moves
someone toward contact.

## Positioning

The portfolio *is* a working demonstration of the thing it claims competence
in. A neighboring portfolio cannot truthfully copy:

- **Avocado** — a RAG chatbot grounded in the same JSON that renders the site,
  so the assistant and the pages can never disagree.
- **A public read-only MCP server** at `/mcp/` — a recruiter can plug their own
  Claude or Cursor into this portfolio and query it from their own tooling.
- **Agent mode** — the model picks and calls read-only tools per turn, and a
  book-a-call flow surfaces real Google Calendar openings inside the chat.
- **A live `/system` dashboard** exposing real per-request traces, model
  fallback state, and analytics — not a screenshot of observability.
- **The still-running claim** — two products shipped in 2020 are still in
  production and still maintained, evidenced rather than asserted.

## Operating Context

- Content has one source of truth: `backend/data/knowledge/*.json`, synced into
  the frontend by a codegen script. Blog and lab posts are MDX compiled into
  that same JSON.
- Jaya authors content through a token-gated `/admin` panel: blog/lab/quotes
  write live to SQLite, file-based sections stage edits into a single batched
  GitHub commit.
- Production is a static export — GitHub Pages serves the apex domain, nginx on
  a Lightsail box serves the two subdomains, and a FastAPI service behind
  `api.jayaremala.com` serves everything dynamic.
- Visitors reach the site on both desktop and phone; a mobile FAB links to
  `/chat` from every portfolio page.

## Capabilities and Constraints

- **Static export (`output: "export"`).** No server components with runtime
  data, no Node runtime in production. Anything live is a client-side call to
  `api.jayaremala.com`. `new Date()` in a client component is a hydration
  hazard — the build year is injected via env.
- **The backend can be slow, cold, or rate-limited** (10 req/min on the chat
  stream). Degraded and empty states are real, frequent states, not edge cases.
- **Free-tier model chain** — Gemini → Groq → OpenRouter, with the answering
  model surfaced to the visitor as a badge. Which model answered is public.
- **Theme system** — light and dark via `next-themes`, plus a `data-theme
  ="midnight"` variant that changes both palette and heading face.
- **Committed type stack** — Inter (display/h1), Geist Sans + Geist Mono,
  Source Serif 4 (long-form), EB Garamond, Cormorant, Caveat, and Roboto under
  midnight. These are in the build already.
- **Tailwind 4**, tokens declared in `src/app/globals.css` via `@theme inline`.
  There is no `tailwind.config.js`.
- Frontend is Next.js 16 / React 19 / TypeScript; backend is FastAPI on Python
  3.11+ with ChromaDB and SQLite.
- **Undecided:** no target WCAG conformance level has been set (see below).

## Brand Commitments

- **Voice:** first person, plain, specific. Concrete numbers over adjectives,
  no hype vocabulary. The site signs off "Do hard things!"
- **Avocado** is the assistant's name and has its own mark; it is not a generic
  "AI chat" affordance.
- **The origin story is load-bearing and factual.** In 2020 Jaya built a
  one-page site for his father's brick business in Kavali, Nellore district; it
  brought in real customers during COVID. The homepage narrative, the
  `/vrfbricks` site, and the "why I build" section all descend from it. It is
  true and must not be embellished.
- **"Hope molecules"** is the stated value frame for why building matters, and
  appears as its own homepage section.
- **Opinions are held on the page** — a for/against list where every line is
  tied to something already shipped, never a slogan.
- **No stock photography standing in for the real thing.** Stated as an
  explicit position on the homepage and enforced on the VRF Bricks site; it
  binds the portfolio too.

## Evidence on Hand

Real, in `backend/data/knowledge/`:

- **5 testimonials**, all sourced from LinkedIn, from colleagues at Shell,
  Wipro, and Amazon — named, with designation and profile link.
- **8 projects**, several with source links and awards; **3 live apps**;
  **22 gallery images** of real events and milestones; **12 quotes**.
- **Hero metrics from real work** — 78% P99 RAG latency cut at 3K+ RPS, 15ms
  edge inference on Snapdragon NPUs, 115GB/day maritime telemetry at Shell with
  zero data loss.
- **Qualcomm Edge AI Hackathon win.**
- **Live product proof** — gradeVITian serving ~17,000 people a month since
  Aug 2020, VRF Bricks since Jun 2020, both still up.
- **Live analytics** — blog views and claps, visitor counts, chat totals, and
  `/system` traces are real queryable numbers, not decorative figures.
- Résumé (Google Drive) and booking link (Google Calendar) are live URLs in
  `profile.json`.

**Absences future work must not fabricate:** there is no press coverage, no
named-client case studies beyond listed employers, no pricing, no customer
logos, and no usage numbers for anything other than gradeVITian. Do not invent
metrics, quotes, or company relationships to fill a layout.

## Product Principles

1. **The skim converts; the depth confirms.** A recruiter must reach the claim
   and the booking link without digging. A peer must be able to go four levels
   down and find real build logs. Neither is served by compromising the other.
2. **Every claim points at something still running.** Preference for evidence
   that can be clicked, queried, or visited over evidence that is described.
3. **Real numbers or nothing.** If a figure isn't in the knowledge base or the
   live API, it does not go on the page.
4. **Degradation is a designed state.** Cold backend, rate limit, model
   fallback, and empty analytics are common — they get designed treatment, not
   a spinner and a shrug.
5. **One source of truth.** Content originates in `backend/data/knowledge/`;
   any surface that hardcodes copy is a bug waiting to drift.

## Accessibility & Inclusion

- **`prefers-reduced-motion` is a hard requirement**, not a nicety. The
  homepage is a motion-heavy long-scroll narrative, and reduced-motion handling
  is already implemented across the CSS and 12 components. Any new motion must
  carry it.
- A 16px minimum font-size is enforced on mobile specifically to prevent Safari
  zoom on input focus.
- Long-form reading respects a user-set `--blog-font-size` preference.
- **Open:** no formal conformance target (e.g. WCAG 2.2 AA) has been decided.
  Future work should treat the above as the floor, not the ceiling.
