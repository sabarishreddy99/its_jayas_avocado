import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The /atlas page body — a guided read of how this repository is organised.
 *
 * Server component by design: this is reference prose and tables, so it ships
 * zero JavaScript. The only interactive affordance is native <details>, which
 * needs no client bundle (the same trick GVFaq uses for its accordion).
 *
 * The numbers quoted here (file counts, line counts) are a snapshot, not a live
 * read. They are prose, deliberately: wiring a build-time filesystem scan in
 * would make every deploy churn this page for no reader benefit.
 */

/* ── small local primitives ──────────────────────────────────────────────── */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-14 sm:mb-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-2">
        {eyebrow}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm text-fg-muted leading-relaxed max-w-2xl mb-5">{children}</p>
  );
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-surface mb-5">
      <table className="w-full min-w-[36rem] text-left border-collapse">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                className={`text-[10px] font-semibold uppercase tracking-[0.13em] text-fg-faint bg-surface-sunken px-4 py-2.5 border-b border-border whitespace-nowrap ${
                  i === 0 ? "" : "font-normal"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <tr className="border-b border-border last:border-0 align-top">
      <td className="px-4 py-3 font-mono text-[12.5px] text-fg whitespace-nowrap">{k}</td>
      <td className="px-4 py-3 text-[13.5px] text-fg-muted leading-relaxed">{children}</td>
    </tr>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.9em] text-fg bg-surface-sunken rounded-chip px-1.5 py-0.5">
      {children}
    </code>
  );
}

function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-card border border-border border-l-2 border-l-accent bg-surface px-4 py-3.5 mb-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-accent mb-1.5">
        {label}
      </p>
      <p className="text-[13.5px] text-fg-muted leading-relaxed">{children}</p>
    </div>
  );
}

function Pipeline({ steps }: { steps: { label: string; title: string; sub: string }[] }) {
  return (
    <ol className="grid gap-px bg-border rounded-card overflow-hidden border border-border mb-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s) => (
        <li key={s.title} className="bg-surface px-4 py-3.5">
          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-accent mb-1">
            {s.label}
          </span>
          <span className="block text-[13.5px] font-semibold text-fg mb-0.5">{s.title}</span>
          <span className="block text-[12.5px] text-fg-subtle leading-snug">{s.sub}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── page body ───────────────────────────────────────────────────────────── */

const TOPOLOGY = `GitHub Pages   ──serves──▶  jayaremala.com          ┐
                                                    │  same out/ folder,
nginx @ Lightsail ─┬─▶ gradevitian.jayaremala.com    │  built once by CI
                   └─▶ vrfbricks.jayaremala.com      ┘
                   │
                   └─▶ api.jayaremala.com ──▶ Docker :8000 (FastAPI)
                                                │
                                   /data volume ├── chroma_db/   (vectors)
                                                ├── analytics.db
                                                ├── content.db
                                                └── gradevitian.db`;

const TREE = `frontend/src/
├── app/          routes — (portfolio) group, chat, admin,
│                 gradevitian, vrfbricks
├── components/
│   ├── ui/         generic primitives — no product content
│   ├── portfolio/  chat/  blog/  lab/  system/  admin/
│   └── gradevitian/  vrfbricks/
├── lib/          api/ content/ portfolio/ admin/ + per-site
├── data/         knowledge/ (generated) + typed *.ts re-exports
└── content/      blog/*.mdx  lab/*.mdx`;

export default function CodebaseAtlas() {
  return (
    <div className="text-fg">
      {/* ── stat strip ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap rounded-card border border-border bg-surface overflow-hidden w-fit max-w-full mb-14">
        {[
          ["470", "files"],
          ["8.5k", "py lines"],
          ["46k", "ts/tsx lines"],
          ["3", "surfaces"],
          ["1", "source of truth"],
        ].map(([n, l]) => (
          <div key={l} className="px-5 py-3 border-r border-border last:border-0 min-w-[6.5rem]">
            <span className="block font-mono text-lg font-bold tracking-tight tabular-nums text-fg">
              {n}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.1em] text-fg-faint mt-0.5">
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* ── full reference ───────────────────────────────────────────── */}
      {/* A standalone static file in public/, not a route — so this is a plain
          <a>. next/link would try to client-side navigate to a page that the
          router does not know about. */}
      <a
        href="/atlas/full.html"
        className="group flex items-start gap-3 rounded-card border border-border bg-surface px-4 py-3.5 mb-14 hover:border-border-strong hover:bg-surface-raised transition-colors no-underline"
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="mt-0.5 shrink-0 text-accent"
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-fg mb-0.5">
            Read the full reference
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </span>
          <span className="block text-[13px] text-fg-muted leading-relaxed">
            The complete file-by-file atlas — every module, every route, and every component
            inventoried with line counts. Opens as a standalone document.
          </span>
        </span>
      </a>

      {/* ── 1 · surfaces ─────────────────────────────────────────────── */}
      <Section id="surfaces" eyebrow="Orientation" title="Three sites, one build">
        <Lead>
          This started as a portfolio and grew two products. All three ship from a single Next.js
          static export; one FastAPI container serves everything dynamic across all of them.
        </Lead>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          {[
            {
              name: "Portfolio + Avocado",
              domain: "jayaremala.com",
              body: (
                <>
                  Career pages, blog, lab logs, gallery — plus <strong className="text-fg">Avocado</strong>,
                  a RAG chatbot at <Mono>/chat</Mono> answering from the knowledge base.
                </>
              ),
            },
            {
              name: "gradeVITian",
              domain: "gradevitian.jayaremala.com",
              body: (
                <>
                  Student tools for VIT: GPA/CGPA calculators, attendance and grade predictors, a
                  semester planner, accounts and badges, and Q&amp;A over the academic regulations.
                </>
              ),
            },
            {
              name: "VRF Bricks",
              domain: "vrfbricks.jayaremala.com",
              body: (
                <>
                  A working fly-ash brick yard in Kavali. Bilingual English/Telugu, WhatsApp-first
                  conversion, and a brick-quantity calculator the old site never had.
                </>
              ),
            },
          ].map((s) => (
            <div key={s.name} className="rounded-card border border-border border-t-2 border-t-accent bg-surface px-4 py-4">
              <h3 className="text-[15px] font-semibold text-fg mb-0.5">{s.name}</h3>
              <p className="font-mono text-[11.5px] text-fg-faint mb-2.5 break-all">{s.domain}</p>
              <p className="text-[13px] text-fg-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-card border border-border bg-surface mb-5">
          <pre className="font-mono text-[11.5px] leading-relaxed text-fg-muted px-4 py-4 min-w-max">
            {TOPOLOGY}
          </pre>
        </div>

        <p className="text-sm text-fg-muted leading-relaxed max-w-2xl">
          There is <strong className="text-fg">no Node server in production</strong>. Next.js runs
          with <Mono>output: &quot;export&quot;</Mono>, so every page is pre-rendered HTML. Anything
          live — chat, analytics, logins, saved calculators — is a client-side fetch to the API box.
        </p>
      </Section>

      {/* ── 2 · pipelines ────────────────────────────────────────────── */}
      <Section id="pipelines" eyebrow="Mechanism" title="The two pipelines that explain the layout">
        <Lead>
          Almost every &ldquo;why is this file here?&rdquo; question resolves into one of these.
          Learn them and the folder structure stops being surprising.
        </Lead>

        <h3 className="text-[15px] font-semibold text-fg mb-3">
          Knowledge sync — how content reaches all three sites
        </h3>
        <Pipeline
          steps={[
            {
              label: "Source",
              title: "backend/data/knowledge/",
              sub: "Hand-edited JSON: profile, experience, projects, skills, testimonials, apps, gallery, quotes.",
            },
            {
              label: "+ MDX",
              title: "frontend/src/content/",
              sub: "Blog and lab posts, written by hand with frontmatter.",
            },
            {
              label: "Run",
              title: "sync-knowledge.mjs",
              sub: "MDX → blog.json / lab.json, then copies all knowledge JSON into the frontend.",
            },
            {
              label: "Out A",
              title: "Typed frontend data",
              sub: "Read at build time through the thin data/*.ts wrappers.",
            },
            {
              label: "Out B",
              title: "Chroma vectors",
              sub: "Backend re-ingests at startup when the JSON hash changed — this is what Avocado retrieves.",
            },
          ]}
        />
        <Note label="One source of truth">
          <Mono>frontend/src/data/knowledge/</Mono> is overwritten on every build, and so are{" "}
          <Mono>blog.json</Mono> and <Mono>lab.json</Mono>. The editable originals are the backend
          JSON and the MDX files. The sync runs automatically from the{" "}
          <Mono>predev</Mono>/<Mono>prebuild</Mono> hooks, so it is never a step you have to remember.
        </Note>

        <h3 className="text-[15px] font-semibold text-fg mb-3 mt-8">Deploy — what ships where</h3>
        <Pipeline
          steps={[
            {
              label: "Trigger",
              title: "push to main",
              sub: "A paths-filter job decides which halves of the repo actually deploy.",
            },
            {
              label: "Frontend",
              title: "static export",
              sub: "Uploaded to GitHub Pages and rsynced to Lightsail for the two subdomains.",
            },
            {
              label: "Frontend",
              title: "sync back",
              sub: "Regenerated JSON is committed to main with [skip ci] so it cannot retrigger itself.",
            },
            {
              label: "Backend",
              title: "image → GHCR",
              sub: "Docker build and push to the registry.",
            },
            {
              label: "Backend",
              title: "blue-green swap",
              sub: "The new container is health-checked on a spare port before it takes over :8000.",
            },
          ]}
        />
      </Section>

      {/* ── 3 · backend ──────────────────────────────────────────────── */}
      <Section id="backend" eyebrow="Service" title="The backend, by package">
        <Lead>
          One FastAPI app behind <Mono>api.jayaremala.com</Mono>. It serves the chatbot, every
          surface&apos;s analytics, the gradeVITian product API, the content CMS, and a public MCP
          server — from a single container.
        </Lead>

        <Table head={["Package", "Responsibility"]}>
          <Row k="rag/">
            The retrieval engine. <Mono>store.py</Mono> runs ChromaDB with fastembed ONNX embeddings
            (no PyTorch), a BM25 index, and Reciprocal Rank Fusion over both.{" "}
            <Mono>ingest.py</Mono> builds the corpus and is hash-gated, so it only rebuilds when the
            knowledge JSON actually changed. <Mono>graph.py</Mono> pulls in adjacent skill and role
            documents, so an answer about a project also knows the stack it was built on.
          </Row>
          <Row k="routers/ai.py">
            The heart of Avocado, and the largest module. Streaming chat over SSE, an agentic
            tool-calling mode, HyDE query expansion, prompt assembly, and the provider fallback loop
            that walks Gemini → Groq → OpenRouter when a free tier returns 429.
          </Row>
          <Row k="routers/gradevitian.py">
            The whole student product: signup and login, password reset, saved calculations,
            per-calculator persisted state, badges, referrals, moderated comments, and rulebook Q&amp;A.
          </Row>
          <Row k="agent/tools.py">
            One read-only tool registry, shared by Agent mode <em>and</em> the public MCP server — so
            both expose exactly the same surface, and <Mono>mcp_server.py</Mono> is only 49 lines.
          </Row>
          <Row k="db/">
            Three SQLite stores on a persistent volume: analytics, admin-authored content, and
            gradeVITian accounts. Visitor IPs are SHA-256 hashed and never stored raw.
          </Row>
          <Row k="core/">
            Settings, rate limiting, and gradeVITian auth — the last written against the standard
            library only, with no PyJWT or bcrypt dependency. Also a dependency-free comment
            moderator that normalises obfuscation before escalating anything borderline to a model.
          </Row>
          <Row k="integrations/">
            Google Calendar (real free/busy, so booking answers are honest), Gmail, Drive résumé
            sync, and the weekly digest. All share one OAuth token lifecycle.
          </Row>
          <Row k="obs/trace.py">
            Forty lines of per-request stage timing. Everything the{" "}
            <Link href="/system" className="text-accent hover:text-accent-hover underline underline-offset-2">
              /system
            </Link>{" "}
            dashboard draws comes from here.
          </Row>
        </Table>
      </Section>

      {/* ── 4 · frontend ─────────────────────────────────────────────── */}
      <Section id="frontend" eyebrow="Client" title="The frontend, by feature vertical">
        <Lead>
          One app, three products. The organising principle is the feature vertical: everything
          belonging to one product lives together, and only genuinely content-free code sits in a
          shared bucket.
        </Lead>

        <div className="overflow-x-auto rounded-card border border-border bg-surface mb-5">
          <pre className="font-mono text-[11.5px] leading-relaxed text-fg-muted px-4 py-4 min-w-max">
            {TREE}
          </pre>
        </div>

        <Note label="The placement rule">
          If a component renders product-specific content it goes in that product&apos;s folder. It
          belongs in <Mono>components/ui/</Mono> only if it is content-free <em>and</em> at least two
          verticals could use it.
        </Note>

        <Table head={["Area", "What lives there"]}>
          <Row k="app/(portfolio)/">
            The route group. Parentheses mean it adds <strong className="text-fg">no URL segment</strong>,
            so <Mono>(portfolio)/page.tsx</Mono> is <Mono>/</Mono> — there is no{" "}
            <Mono>/portfolio</Mono> route. Everything inside shares one nav and footer.
          </Row>
          <Row k="app/globals.css">
            The entire design system, including the Tailwind 4 configuration under{" "}
            <Mono>@theme inline</Mono>. There is no <Mono>tailwind.config.js</Mono> — v4 does not
            read one.
          </Row>
          <Row k="components/chat/">
            Avocado&apos;s client. <Mono>ChatInterface</Mono> orchestrates SSE consumption, session
            persistence, agent-mode switching, and the model badge that updates when a fallback
            fires. <Mono>AnswerTrace</Mono> and <Mono>AgentSteps</Mono> are the transparency layer:
            which chunks were retrieved, which tools ran.
          </Row>
          <Row k="components/gradevitian/">
            Forty-plus components, and none of them hold arithmetic — every formula is a pure
            function in <Mono>lib/gradevitian/calc.ts</Mono>, ported from the original site&apos;s
            client-side JS so it stays testable and shared.
          </Row>
          <Row k="components/vrfbricks/">
            The brick yard. The enquiry form is a WhatsApp message composer rather than a form
            submission, because WhatsApp is how that market actually buys.{" "}
            <Mono>BrickDiagram</Mono> is generated from the brick&apos;s real measurements — a
            derived drawing, not an illustration.
          </Row>
          <Row k="lib/*/use*Base.ts">
            Both subdomains are served at two mount points from the same build. These hooks return{" "}
            <Mono>&quot;&quot;</Mono> on the subdomain and the segment prefix on the main domain, and{" "}
            <Mono>GVLink</Mono>/<Mono>VRFLink</Mono> apply it. Fourteen lines each, and entirely
            load-bearing.
          </Row>
          <Row k="lib/portfolio/site-nav.tsx">
            One list of pages that the nav, the footer, the sitemap and the command palette all
            derive from — so a new page appears in every one of them at once.
          </Row>
        </Table>
      </Section>

      {/* ── 5 · conventions ──────────────────────────────────────────── */}
      <Section id="conventions" eyebrow="Reference" title="Conventions that fail quietly">
        <Lead>
          The decisions worth knowing before a first change — chosen because getting them wrong
          produces no error, just wrong output.
        </Lead>

        <Table head={["Convention", "What happens otherwise"]}>
          <Row k="Edit the backend JSON">
            Changes to the frontend&apos;s copy are wiped by the next build, with no warning.
          </Row>
          <Row k="Run from backend/">
            Starting from <Mono>backend/src/</Mono> creates a second, empty vector store at a
            different relative path. Nothing errors; the chatbot simply knows nothing.
          </Row>
          <Row k="Keep the paths-filter current">
            It decides what deploys. A missing entry means the change ships nothing and CI still
            reports success.
          </Row>
          <Row k="Link via GVLink / VRFLink">
            A raw <Mono>next/link</Mono> works on whichever mount point you tested and breaks on the
            other one.
          </Row>
          <Row k="Sort posts by publishedAt">
            <Mono>date</Mono> is an editable display string. Fixing a typo in it would silently
            reorder the index; <Mono>publishedAt</Mono> is set once and never touched.
          </Row>
          <Row k="No new Date() in client code">
            On a static export the HTML is rendered once at build but the component reruns in every
            browser — so a year-rollover produces a hydration mismatch for every visitor. The build
            year is inlined as an environment literal instead.
          </Row>
          <Row k="Pin fastmcp deliberately">
            A patch release added Host allow-list enforcement; an implicit bump between local and CI
            once took the deployed MCP server down. It is now pinned to a narrow range on purpose.
          </Row>
          <Row k="Ship a 404/ route per subdomain">
            A static export never emits a segment&apos;s <Mono>not-found.tsx</Mono> as a real file,
            so each site needs a literal route for nginx to point <Mono>error_page</Mono> at.
          </Row>
          <Row k="Never invent VRF Bricks facts">
            It is a real business. Unverified details live in a{" "}
            <Mono>NEEDS_CONFIRMATION</Mono> block where rendering skips them, rather than being
            guessed into the page.
          </Row>
        </Table>

        <p className="text-sm text-fg-muted leading-relaxed max-w-2xl">
          The full source is on{" "}
          <a
            href="https://github.com/sabarishreddy99/jayaremala"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover underline underline-offset-2"
          >
            GitHub
          </a>
          , and{" "}
          <Link href="/lab/itsjaya" className="text-accent hover:text-accent-hover underline underline-offset-2">
            the lab entry
          </Link>{" "}
          covers why each layer was built the way it was.
        </p>
      </Section>
    </div>
  );
}
