"use client";

import Tile from "./Tile";
import { profile } from "@/data/profile";
import { formatModel } from "@/lib/chat-model";

export type PersonaOption = { id: string; label: string; hint: string };
export type LandingPrompt = { label: string; full: string; category?: string };

type ChatLandingProps = {
  personas: PersonaOption[];
  persona: string | null;
  onChoosePersona: (id: string) => void;
  activePrompts: LandingPrompt[];
  onPrompt: (full: string) => void;
  backendStatus: "checking" | "ready" | "warming";
  activeModel: string | null;
  onBook: () => void;
  greeting: string;
};

const linkIcon = (d: string) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

/** Drawn at one stroke weight, matching the prompt and calendar icons in this
 *  file. These were ◎ ◈ ◉ ◇ — four Unicode shapes at four optical weights. */
export const INTERNAL_LINKS = [
  { href: "/experience", label: "Experience", icon: linkIcon("M2 7h20v14H2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2") },
  { href: "/projects", label: "Projects", icon: linkIcon("M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z") },
  { href: "/education", label: "Education", icon: linkIcon("M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5") },
  { href: "/blog", label: "Blog", icon: linkIcon("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z") },
];

/** Staggered entrance without inventing new motion — reuses .animate-fade-up. */
function delay(i: number) {
  return { animationDelay: `${i * 70}ms` } as const;
}

export default function ChatLanding({
  personas,
  persona,
  onChoosePersona,
  activePrompts,
  onPrompt,
  backendStatus,
  activeModel,
  onBook,
  greeting,
}: ChatLandingProps) {
  return (
    <div className="mx-auto w-full max-w-3xl lg:max-w-4xl px-1 pt-6 sm:pt-10 pb-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 animate-fade-up">
        <div className="relative mb-3">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl">🥑</div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-bg" />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg leading-tight">
          Ask me anything about Jaya
        </h1>
        <p className="mt-1.5 text-xs text-fg-subtle">{greeting}! I&apos;m Avocado, his AI assistant.</p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-fg-subtle">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              backendStatus === "warming" ? "bg-fg-faint animate-pulse" : "bg-accent"
            }`}
            aria-hidden
          />
          <span className="font-medium text-fg-muted">
            {backendStatus === "warming" ? "Waking up…" : "Online"}
          </span>
          <span aria-hidden>·</span>
          <span>{formatModel(activeModel, "Gemini 2.5 Flash")}</span>
          <span className="hidden sm:inline" aria-hidden>·</span>
          <span className="hidden font-mono sm:inline">
            Hybrid RAG → BM25 + vectors → RRF
          </span>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-3">
        {/* Try asking — persona-aware prompts (wide, tall) */}
        <Tile className="sm:col-span-2 p-4 sm:p-5 animate-fade-up" brackets>
          <div style={delay(3)} className="animate-fade-up">
            <p className="text-nano font-bold uppercase tracking-[0.18em] text-fg-faint">Try asking</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activePrompts.map((p) => (
                <button
                  key={p.full}
                  onClick={() => onPrompt(p.full)}
                  className="group/prompt flex items-center gap-2 rounded-chip border border-border/60 bg-surface/50 px-3 py-2.5 text-left transition-all duration-150 hover:border-accent/50 hover:bg-surface"
                >
                  <span className="text-accent/70 group-hover/prompt:text-accent transition-colors shrink-0" aria-hidden>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                  <span className="text-[13px] text-fg-muted group-hover/prompt:text-fg transition-colors leading-snug">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Tile>

        {/* Book a call */}
        <Tile
          onClick={onBook}
          sweep
          brackets
          ariaLabel="Book a call with Jaya"
          className="p-4 sm:p-5 flex flex-col justify-between min-h-[112px] animate-fade-up"
        >
          <div style={delay(2)} className="animate-fade-up flex h-full flex-col justify-between">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-accent">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            <div className="mt-3">
              <p className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">Book a call →</p>
              <p className="mt-0.5 text-[11px] text-fg-faint">See Jaya&apos;s open 30-min slots.</p>
            </div>
          </div>
        </Tile>

        {/* Persona — tailor answers (wide) */}
        <Tile className="sm:col-span-2 p-4 sm:p-5 animate-fade-up bg-transparent">
          <div style={delay(1)} className="animate-fade-up">
            <p className="text-nano font-bold uppercase tracking-[0.18em] text-fg-faint">
              {persona ? "Tailored for a" : "Tailor your answers · I'm a…"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {personas.map((p) => {
                const selected = persona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onChoosePersona(p.id)}
                    title={p.hint}
                    aria-pressed={selected}
                    className={`rounded-full border px-3.5 py-2 text-[12px] font-medium transition-all duration-150 ${
                      selected
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border bg-surface/60 text-fg-muted hover:border-accent/50 hover:text-accent"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-[11px] text-fg-faint">
              {persona
                ? `${personas.find((p) => p.id === persona)?.hint} · tap again to clear`
                : "Answers lead with what matters most to you."}
            </p>
          </div>
        </Tile>

        {/* Explore — quick links + resume/socials */}
        <Tile className="p-4 sm:p-5 animate-fade-up bg-transparent">
          <div style={delay(4)} className="animate-fade-up">
            <p className="text-nano font-bold uppercase tracking-[0.18em] text-fg-faint">Explore</p>
            <div className="mt-3 flex flex-col gap-1">
              {INTERNAL_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group/link flex items-center gap-2 rounded-chip px-2 py-1.5 text-[13px] text-fg-muted hover:bg-surface-raised hover:text-accent transition-colors"
                >
                  <span className="text-fg-faint group-hover/link:text-accent transition-colors" aria-hidden>{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
              {profile.resume && (
                <a href={profile.resume} target="_blank" rel="noopener noreferrer"
                  className="rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[10px] font-medium text-fg-muted hover:border-accent/50 hover:text-accent transition-colors">
                  Résumé ↗
                </a>
              )}
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[10px] font-medium text-fg-muted hover:border-accent/50 hover:text-accent transition-colors">
                GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[10px] font-medium text-fg-muted hover:border-accent/50 hover:text-accent transition-colors">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </Tile>

      </div>
    </div>
  );
}
