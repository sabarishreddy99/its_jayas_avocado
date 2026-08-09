import Link from "next/link";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { getAllPosts } from "@/lib/content/blog";
import TestimonialsCarousel from "@/components/portfolio/TestimonialsCarousel";
import ContactForm from "@/components/portfolio/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HeroName from "@/components/portfolio/HeroName";
import HeroStats from "@/components/portfolio/HeroStats";
import Parallax from "@/components/ui/Parallax";
import RagPipelineCard from "@/components/portfolio/RagPipelineCard";
import Chapter, { Inner } from "@/components/portfolio/Chapter";
import Opinions from "@/components/portfolio/Opinions";
import SkillsSection from "@/components/portfolio/SkillsSection";
import SkillsConstellation from "@/components/portfolio/SkillsConstellation";
import MobileNoBg from "@/components/ui/MobileNoBg";
import HeroDotGrid from "@/components/ui/HeroDotGrid";
import SiteVitals from "@/components/portfolio/SiteVitals";
import SpotlightSection from "@/components/portfolio/SpotlightSection";
import InstallPWA from "@/components/ui/InstallPWA";
import SparkleIcon from "@/components/ui/SparkleIcon";
import StillRunning from "@/components/portfolio/StillRunning";
import OriginStory from "@/components/portfolio/OriginStory";
import Signature from "@/components/portfolio/Signature";
import HopeMolecules from "@/components/portfolio/HopeMolecules";
import { experience } from "@/data/experience";

export const metadata = {
  title: "Jaya Sabarish Reddy Remala | Software Engineer",
  description:
    "Software Engineer specializing in Agentic AI, distributed systems, and production ML infrastructure. Qualcomm Edge AI Hackathon Winner. NYU Tandon CS. Previously at Shell, Wipro, NYU IT.",
  alternates: { canonical: "https://jayaremala.com/" },
  openGraph: {
    type: "website",
    url: "https://jayaremala.com/",
    title: "Jaya Sabarish Reddy Remala | Software Engineer",
    description:
      "Software Engineer specializing in Agentic AI, distributed systems, and production ML infrastructure. Qualcomm Edge AI Hackathon Winner. NYU Tandon CS.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaya Sabarish Reddy Remala",
  alternateName: "Jaya Remala",
  url: "https://jayaremala.com",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specializing in Agentic AI, distributed systems, and production ML infrastructure. Qualcomm Edge AI Hackathon Winner. NYU Tandon CS.",
  email: "jr6421@nyu.edu",
  sameAs: [
    "https://linkedin.com/in/jayasabarishreddyr",
    "https://github.com/sabarishreddy99",
    "https://jayaremala.com",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "New York University Tandon School of Engineering",
    url: "https://engineering.nyu.edu",
  },
  worksFor: {
    "@type": "Organization",
    name: "New York University",
  },
  knowsAbout: [
    "Agentic AI", "Distributed Systems", "Machine Learning", "RAG",
    "FastAPI", "LangGraph", "Edge AI", "LLM Inference", "Python",
  ],
  award: "Qualcomm Edge AI Hackathon Winner",
  address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
};

/** Wrap standalone numbers (optionally with unit suffix) in mono-bold spans */
function HighlightNumbers({ text }: { text: string }) {
  const parts = text.split(/(\d+(?:\.\d+)?(?:%|ms|GB|TB|MB|K\+?|M\+?|x|\+)?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="font-mono font-bold text-fg">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}


const EXPLORE_PAGES = [
  {
    href: "/experience",
    label: "Experience",
    desc: "Work history & roles",
    accent: "from-blue-500 to-cyan-500",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    href: "/education",
    label: "Education",
    desc: "Degrees & institutions",
    accent: "from-violet-500 to-purple-500",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projects",
    desc: "What I've shipped",
    accent: "from-emerald-500 to-teal-500",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    href: "/lab",
    label: "Lab",
    desc: "Building in public",
    accent: "from-rose-500 to-pink-500",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4m-6 0h6"/>
      </svg>
    ),
  },
  {
    href: "/blog",
    label: "Blog",
    desc: "Notes & deep dives",
    accent: "from-amber-500 to-yellow-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    href: "/gallery",
    label: "Gallery",
    desc: "Moments & visuals",
    accent: "from-indigo-500 to-blue-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>
      </svg>
    ),
  },
  {
    href: "/quotes",
    label: "Quotes",
    desc: "Lines that stuck",
    accent: "from-fuchsia-500 to-violet-500",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
      </svg>
    ),
  },
  {
    href: "/now",
    label: "Now",
    desc: "What I'm up to",
    accent: "from-cyan-500 to-sky-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
] as const;

/** Concise chip label — drop the qualifier after a dash or parenthesis
 *  ("NYU IT – High-Speed Research Network" → "NYU IT"). */
function shortCompany(name: string) {
  return name.split(/\s+[–-]\s+|\s+\(/)[0].trim();
}

/** Career path derived from the experience data — deduped by company,
 *  most-recent first. Auto-updates whenever experience.json changes. */
function careerPath() {
  const seen = new Set<string>();
  const path: { company: string; short: string; role: string; start: string; end: string }[] = [];
  for (const e of experience) {
    const company = e.company.trim();
    if (seen.has(company)) continue; // first hit wins → most recent role per company
    seen.add(company);
    path.push({ company, short: shortCompany(company), role: e.role, start: e.start, end: e.end });
  }
  return path;
}

/** Masked word-rise — the same reveal the gradeVITian hero uses. */
function RisingWords({ text, className = "", style, baseDelay = 0 }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
}) {
  return (
    <p className={className} style={style}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="gv-rise-mask">
          <span className="gv-rise-inner" style={{ animationDelay: `${baseDelay + i * 90}ms` }}>
            {word}
          </span>
          {i < text.split(" ").length - 1 && " "}
        </span>
      ))}
    </p>
  );
}

export default function PortfolioHome() {
  const featured = projects.filter((p) => p.featured);
  const latestPost = getAllPosts()[0] ?? null;
  const hero = profile.hero;
  const hope = profile.hopeMolecules;
  const shipped = profile.shipped ?? [];
  const gradevitianNote = projects.find((p) => p.title === "gradeVITian")?.note;

  return (
    <div className="w-full">
      <MobileNoBg />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero — full-viewport, scrolls away naturally ──────────── */}
      {/* svh rather than dvh: on mobile Safari a dvh hero resizes as the URL
          bar hides, which reflows the whole first screen mid-scroll. svh is
          the stable small-viewport height. */}
      <section
        id="hero"
        className="chapter relative flex flex-col overflow-x-clip hero-section-bg sm:min-h-[calc(100svh-var(--nav-h))]"
      >

        <Parallax speed={0.18} className="pointer-events-none absolute inset-0">
          <div aria-hidden className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-accent/[0.05] via-transparent to-transparent" />
          <HeroDotGrid />
        </Parallax>

        <div className="relative z-[1] flex-1 flex flex-col">

          <Inner className="pt-8 sm:pt-12 md:pt-14 lg:pt-16">
            {/* Single column. The belief panel that used to sit on the right
                now owns chapter 01, where it can be read at every width
                instead of being hidden below lg. */}
            <div className="max-w-[62ch]">
            <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 min-w-0">

              {/* 1 · Status */}
              {(() => {
                const avail = profile.availability;
                const isOpen = avail?.open ?? true;
                const label = avail?.label ?? "Open to opportunities";
                const parts = avail
                  ? [...(avail.types ?? []), ...(avail.locations ?? [])]
                  : [profile.location];
                const chipText = parts.length > 0 ? `${label} · ${parts.join(" · ")}` : label;
                return (
                  <div className="animate-fade-up flex items-center gap-2" style={{ animationDelay: "0ms" }}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${isOpen ? "bg-green-500 animate-pulse" : "bg-zinc-400 dark:bg-zinc-500"}`} />
                    <span className="text-[11px] font-medium tracking-wide text-fg-faint/80">{chipText}</span>
                  </div>
                );
              })()}

              {/* 2 · Headline — a person, not a metric.
                  Garamond via .display-serif rather than the grotesque
                  --font-display: at this size the serif is the whole voice of
                  the page, and it is also the one face that survives every
                  theme (midnight swaps --font-display to Roboto). */}
              <RisingWords
                text={hero?.headline ?? profile.bio.split(". ")[0] + "."}
                className="display-serif display-xl max-w-[24ch] text-fg"
                baseDelay={120}
              />

              {/* 3 · The story — Garamond, the one voice the UI can't produce */}
              <div className="animate-fade-up flex flex-col gap-3" style={{ animationDelay: "200ms" }}>
                {hero?.lead && (
                  <p
                    className="voice-serif text-fg-muted max-w-[54ch]"
                    style={{ fontSize: "clamp(1.0625rem, 1.6vw, 1.35rem)", lineHeight: 1.62 }}
                  >
                    {hero.lead}
                  </p>
                )}
                {hero?.sub && (
                  <p className="text-sm leading-relaxed text-fg-subtle max-w-[58ch]">
                    {hero.sub}
                  </p>
                )}
              </div>

              {/* 4 · Two CTAs + social */}
              <div className="animate-fade-up flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3" style={{ animationDelay: "300ms" }}>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                    <Link
                      href="/chat"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-fg text-bg px-7 py-3 text-sm font-medium hover:opacity-75 transition-opacity duration-200"
                    >
                      <SparkleIcon size={14} className="shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />
                      Ask Avocado
                    </Link>
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg transition-colors duration-200"
                    >
                      Schedule a Call
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                    </a>
                  </div>
                  {hero?.avocadoNote && (
                    <p className="text-[11px] text-fg-faint max-w-[42ch]">{hero.avocadoNote}</p>
                  )}
                </div>

                <span className="w-px h-5 bg-border shrink-0 hidden sm:inline-block" aria-hidden />

                <div className="flex items-center gap-1 -ml-2 sm:ml-0">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full text-fg-faint hover:text-accent hover:bg-surface-raised transition-colors">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full text-fg-faint hover:text-fg hover:bg-surface-raised transition-colors">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                  {profile.resume && (
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center text-[11px] font-medium text-fg-faint hover:text-fg bg-surface dark:bg-surface-raised border border-border/60 dark:border-border-strong rounded-chip px-3 py-2.5 sm:py-1.5 hover:border-fg-muted transition-all">
                      Resume ↗
                    </a>
                  )}
                </div>
              </div>

              {/* 5 · Latest post — the one micro-CTA that serves the story */}
              {latestPost && (
                <div className="animate-fade-up flex flex-wrap items-center gap-2" style={{ animationDelay: "380ms" }}>
                  <Link href={`/blog/${latestPost.slug}`} className="group inline-flex items-center gap-2 rounded-sm border border-border/60 dark:border-border-strong bg-surface dark:bg-surface-raised px-3.5 py-1.5 hover:border-border-strong transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-fg-faint shrink-0">Latest</span>
                    <span className="w-px h-3 bg-border shrink-0" />
                    <span className="text-[11px] text-fg-subtle group-hover:text-accent transition-colors line-clamp-1 max-w-[55vw] sm:max-w-xs">
                      {latestPost.title}
                    </span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-fg-faint group-hover:text-accent shrink-0 transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>
            </div>
          </Inner>

          <div className="hidden sm:block sm:flex-1 sm:min-h-[5vh]" />

          {/* ── Bottom — meta row, oversized name, signature ── */}
          <div className="flex flex-col gap-2 sm:gap-3 mt-9 sm:mt-0">
            <Inner>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-x-8 gap-y-2 border-t border-border pt-3 sm:pt-4">
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-fg-muted">
                  {["Software Engineer", "AI Infrastructure", "Distributed Systems"].map((role, i, arr) => (
                    <span key={role} className="flex items-center gap-2.5">
                      {role}
                      {i < arr.length - 1 && <span className="text-accent" aria-hidden>/</span>}
                    </span>
                  ))}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-fg-muted">
                  <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors break-all">{profile.email}</a>
                  <span className="text-fg-subtle">{profile.location}</span>
                </div>
              </div>
            </Inner>

            <HeroName name={profile.name} />

            <Inner className="pt-2 pb-8 sm:pb-9 md:pb-11">
              <Signature text={hero?.signature ?? "Do hard things!"} delay={900} />
            </Inner>
          </div>
        </div>
      </section>

      {/* ── 01 · The creed ────────────────────────────────────────────
          Opens the story rather than decorating the hero. This is the claim
          the rest of the page is evidence for, so it goes first and it goes
          in full at every viewport. */}
      {hope && (
        <Chapter
          n="01"
          label={hope.eyebrow ?? "What I optimize for"}
          deck="The reason the rest of this page exists."
          id="creed"
          nextHref="#why"
          nextLabel="Where it started"
        >
          <HopeMolecules data={hope} variant="chapter" />
        </Chapter>
      )}

      {/* ── 02 · Why I build ──────────────────────────────────────── */}
      {profile.why && (
        <Chapter
          n="02"
          label={profile.why.label}
          deck="Where this started, and why it still decides what I pick up."
          id="why"
          nextHref="#still-running"
          nextLabel="What's still up"
        >
          <OriginStory why={profile.why} />
        </Chapter>
      )}

      {/* ── 03 · Still running ── the signature moment ────────────── */}
      {shipped.length > 0 && (
        <Chapter
          n="03"
          label={profile.shippedLabel ?? "Still running"}
          deck="Things I shipped that are still in production. The counters are live."
          id="still-running"
          nextHref="#gradevitian"
          nextLabel="The oldest one"
        >
          <StillRunning items={shipped} note={profile.shippedNote} />
          <div className="mt-10 pt-8 border-t border-border">
            <SiteVitals />
          </div>
        </Chapter>
      )}

      {/* ── 04 · gradeVITian ──────────────────────────────────────── */}
      <Chapter
        n="04"
        label="gradeVITian"
        deck="Built as an undergrad, still on call. Six years live and five graduating classes later."
        id="gradevitian"
        nextHref="#opinions"
        nextLabel="Where I stand"
      >
        <SpotlightSection hideEyebrow />

        {/* The thank-you letter to the VIT community. It has been sitting in
            projects.json unrendered, and it is the most human paragraph in
            the whole dataset. */}
        {gradevitianNote && (
          <ScrollReveal>
            <div className="mt-10 border-t border-border pt-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-fg-faint">
                Postscript, 2026
              </p>
              <p className="voice-serif hanging-quote max-w-[62ch] border-l border-border-strong pl-5 text-[15px] leading-[1.75] text-fg-muted">
                {gradevitianNote}
              </p>
            </div>
          </ScrollReveal>
        )}
      </Chapter>

      {/* ── 05 · Where I stand ────────────────────────────────────────
          The hinge: the page turns here from a record of what shipped into
          an argument about how it gets built. */}
      {profile.opinions && (
        <Chapter
          n="05"
          label={profile.opinions.label}
          deck={profile.opinions.deck}
          id="opinions"
          nextHref="#projects"
          nextLabel="The work itself"
        >
          <Opinions data={profile.opinions} />
        </Chapter>
      )}

      {/* ── 06 · The work ─────────────────────────────────────────── */}
      {featured.length > 0 && (
        <Chapter
          n="06"
          label="The work"
          deck="Production systems, and the numbers they hold up under."
          id="projects"
          nextHref="#skills"
          nextLabel="How I work"
        >
          {/* The bio, now that the story has paid for it */}
          <ScrollReveal>
            <p className="text-lg sm:text-xl font-light leading-[1.75] text-fg-muted max-w-2xl">
              <HighlightNumbers text={profile.bio} />
            </p>
          </ScrollReveal>

          {/* The same career in resume voice. The bio above is how he
              talks; this is what a recruiter is scanning for, and it was
              already written and sitting unused in profile.json. */}
          {profile.summary && (
            <ScrollReveal delay={80}>
              <div className="mt-7 border-l border-border pl-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-fg-faint">
                  The resume version
                </p>
                <p className="max-w-[62ch] text-sm leading-relaxed text-fg-subtle">
                  <HighlightNumbers text={profile.summary} />
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* The metrics — evidence, not an introduction */}
          {profile.heroStats && profile.heroStats.length > 0 && (
            <div className="mt-10">
              {profile.heroStatsLabel && (
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fg-faint mb-4">
                  {profile.heroStatsLabel}
                </p>
              )}
              {/* 4-up crushes the labels below ~900px, so 2x2 until there is
                  room. The switch is at lg, not md: at 768–1023 the four
                  labels still do not fit, which is exactly the tablet band
                  this layout used to ignore. */}
              <div className="hidden lg:block">
                <HeroStats stats={profile.heroStats} startOnView />
              </div>
              <div className="lg:hidden">
                <HeroStats stats={profile.heroStats} cols={2} startOnView />
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-fg-faint shrink-0">Featured Projects</h3>
            <Link href="/projects" className="text-xs font-medium text-accent hover:text-accent-hover">
              All projects →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {featured.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80} className="flex" direction="scale">
                {p.title.startsWith("jayaremala") ? (
                  <RagPipelineCard
                    title={p.title}
                    description={p.description}
                    tags={p.tags}
                    award={p.award}
                    note={p.note}
                    sourceLinks={p.sourceLinks}
                  />
                ) : (
                  <div className="group relative flex-1 rounded-card border border-border bg-surface p-6 space-y-3 hover:border-border-strong card-lift overflow-hidden">
                    <div className={`absolute inset-x-0 top-0 h-px ${p.award ? "bg-gradient-to-r from-amber-500 to-orange-400" : "bg-fg/20"} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                    <svg className="absolute top-2.5 left-2.5 text-border/50 group-hover:text-accent/40 transition-colors duration-200 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M9 1 L1 1 L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg className="absolute bottom-2.5 right-2.5 text-border/50 group-hover:text-accent/40 transition-colors duration-200 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M1 9 L9 9 L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-fg text-sm leading-snug group-hover:text-accent transition-colors">{p.title}</h4>
                      {p.award && (
                        <span className="text-[10px] font-semibold rounded-sm bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-[-1px] mr-1" aria-hidden><path d="M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0zM6 6H3v2a3 3 0 0 0 3 3M18 6h3v2a3 3 0 0 0-3 3" /></svg>{p.award}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-5 text-fg-subtle">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-fg-subtle tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.note && (
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900 rounded-sm px-2.5 py-1.5 leading-relaxed">
                        {p.note}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.sourceLinks && p.sourceLinks.length > 0
                        ? p.sourceLinks.map((link) => (
                            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold text-accent hover:border-accent/50 transition-colors">
                              {link.label}
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                            </a>
                          ))
                        : null}
                    </div>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </Chapter>
      )}

      {/* ── 07 · How I work ───────────────────────────────────────── */}
      <Chapter
        n="07"
        label="How I work"
        /* profile.currently is literally a "what I'm into right now"
           sentence, which is what a deck is. It replaces a hardcoded
           string and was previously rendered nowhere. */
        deck={profile.currently ? `Currently pointed at ${profile.currently}` : "The stack I reach for, and where I am pointing it next."}
        id="skills"
        nextHref="#testimonials"
        nextLabel="What colleagues say"
      >
        <ScrollReveal>
          <div className="hanging-quote border-l border-border-strong pl-4 max-w-2xl mb-10">
            <p className="voice-serif text-fg-muted" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
              {profile.obsession}
            </p>
          </div>
        </ScrollReveal>

        <SkillsSection skills={skills} featuredProjects={featured} />

        {/* Where he's been, and where he's headed */}
        <div className="mt-12 pt-10 border-t border-border grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            {/* The label said "Previously" over a row of industries, which
                reads as companies. Name the companies (profile.previous was
                populated and rendered nowhere) and label the chips honestly. */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-faint mb-3">Previously</p>
            {profile.previous && (
              <p className="mb-3 font-mono text-[11px] leading-relaxed text-fg-muted">
                {profile.previous}
              </p>
            )}
            <p className="mb-2 text-[10px] uppercase tracking-widest text-fg-faint/70">Domains</p>
            <div className="flex flex-wrap gap-2">
              {profile.prev_domain.split(",").map((d) => (
                <span key={d} className="rounded-md border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-fg-subtle">
                  {d.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-faint mb-3">Excited in</p>
            <div className="flex flex-wrap gap-2">
              {profile.interested_domain.split(",").map((d) => (
                <span key={d} className="rounded-md border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-fg-subtle">
                  {d.trim()}
                </span>
              ))}
              <span className="rounded-md border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-fg-faint italic">&amp; more</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-faint mb-3">Career path</p>
            <div className="flex flex-col">
              {careerPath().map((c, i, arr) => (
                <div key={c.company} className="flex items-start gap-2.5">
                  <div className="flex flex-col items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${i === 0 ? "bg-accent" : "bg-border-strong"}`} />
                    {i < arr.length - 1 && (
                      <div className="w-px h-6 bg-gradient-to-b from-border-strong/60 to-transparent mt-0.5" />
                    )}
                  </div>
                  <div className="relative group/co pb-4">
                    <span
                      tabIndex={0}
                      aria-label={`${c.short}: ${c.role}, ${c.start} – ${c.end}`}
                      className={`text-xs rounded-chip outline-offset-2 cursor-help ${i === 0 ? "text-fg font-medium" : "text-fg-subtle"}`}>
                      {c.short}
                    </span>
                    <div className="absolute left-0 top-full mt-1 z-10 hidden group-hover/co:block group-focus-within/co:block bg-surface border border-border rounded-chip px-3 py-2 shadow-md whitespace-nowrap pointer-events-none">
                      <p className="text-[11px] font-semibold text-fg">{c.role}</p>
                      <p className="text-[10px] text-fg-subtle">{c.company}</p>
                      <p className="text-[10px] text-fg-faint font-mono tabular-nums">{c.start} – {c.end}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive skills ↔ projects constellation. No longer desktop-only:
            the component now scrolls horizontally below lg instead of being
            withheld from every phone and tablet visitor. */}
        <div className="mt-12 pt-10 border-t border-border">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-fg-faint shrink-0">Skills in Action</h3>
            <div className="flex-1 h-px bg-border" aria-hidden />
            <span className="shrink-0 text-[10px] text-fg-faint lg:hidden">scroll →</span>
          </div>
          <SkillsConstellation />
        </div>
      </Chapter>

      {/* ── 08 · Kind words ───────────────────────────────────────── */}
      {/* rail={false}: the carousel is already a full-width composition and
          reads badly squeezed into the body column beside a rail. */}
      <Chapter
        n="08"
        label="Kind words"
        deck="What the people I actually worked with said, unprompted."
        id="testimonials"
        rail={false}
        nextHref="#contact"
        nextLabel="Let's connect"
      >
        <TestimonialsCarousel />
      </Chapter>

      {/* ── 09 · Connect ──────────────────────────────────────────── */}
      <Chapter
        n="09"
        label="Connect"
        deck="Open to full-time roles, remote or hybrid. This is the fastest way to reach me."
        id="contact"
        rail={false}
        className="pb-16 sm:pb-24"
      >
        <ContactForm />

        {/* Site index — the real navigation, demoted but never removed */}
        <div className="mt-14 pt-8 border-t border-border md:mt-16 md:pt-10">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-fg-faint shrink-0">Quick Explore</p>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
            {EXPLORE_PAGES.map(({ href, label, desc, accent, icon }) => (
              <Link
                key={href}
                href={href}
                className="group relative flex min-h-[104px] flex-col gap-2.5 p-4 rounded-card border border-border bg-surface hover:bg-surface-raised hover:border-border-strong transition-all overflow-hidden"
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                <span className="text-fg-faint group-hover:text-accent transition-colors">{icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-fg leading-tight">{label}</p>
                  <p className="text-[10px] text-fg-faint leading-tight mt-0.5">{desc}</p>
                </div>
                <svg className="self-end text-fg-faint/40 group-hover:text-accent transition-colors" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex"><InstallPWA variant="chip" /></span>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-fg-faint hover:text-accent transition-colors px-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 animate-pulse group-hover:animate-none text-accent">
                <path d="M4 17l6-6-6-6"/><path d="M12 19h8"/>
              </svg>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">Want your LLM to read my work?</span>
            </a>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
