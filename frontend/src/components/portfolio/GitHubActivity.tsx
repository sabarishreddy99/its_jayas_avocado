"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/**
 * Live GitHub activity — the "I am shipping right now" signal.
 *
 * Everything here is fetched from api.github.com in the visitor's browser at
 * view time. Nothing is hardcoded and nothing is a screenshot, which is the
 * whole point: a stale contribution image says "this page has not been touched
 * in a year", and that is the exact impression the section exists to prevent.
 *
 * Honesty constraints worth keeping if this is edited later:
 *  - The unauthenticated events API returns *public* activity only, capped at
 *    ~90 days and 300 events. The heading says "public commits · last 90 days"
 *    rather than "contributions" so the number is never read as a full-year
 *    contribution count it cannot possibly be.
 *  - Forks are excluded from the repo list and the language tally. A fork you
 *    never touched is not a contribution.
 *
 * Failure is silent by design. Unauthenticated GitHub allows 60 requests per
 * hour per IP; past that it answers 403. A portfolio that renders a broken
 * widget is worse than one that renders nothing, so any non-OK response, network
 * error, or empty result unmounts the whole section.
 */

const WEEKS = 13; // the events API reaches ~90 days, so 13 weeks is its real span
const CACHE_KEY = "itsjaya_gh_activity_v1";
const CACHE_TTL_MS = 30 * 60 * 1000;

type Repo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedLabel: string;
};

type Data = {
  handle: string;
  days: { count: number; label: string }[];
  totalCommits: number;
  activeDays: number;
  languages: string[];
  repos: Repo[];
};

/** "2 days ago" / "3 weeks ago" — computed after mount, never during render. */
function relative(iso: string, now: number) {
  const diff = now - new Date(iso).getTime();
  const day = 86_400_000;
  if (diff < day) return "today";
  if (diff < 2 * day) return "yesterday";
  if (diff < 7 * day) return `${Math.floor(diff / day)} days ago`;
  if (diff < 60 * day) {
    const w = Math.round(diff / (7 * day));
    return w <= 1 ? "1 week ago" : `${w} weeks ago`;
  }
  const m = Math.round(diff / (30 * day));
  return m <= 1 ? "1 month ago" : `${m} months ago`;
}

function handleFrom(url: string) {
  const m = url.match(/github\.com\/([^/?#]+)/i);
  return m ? m[1] : null;
}

export default function GitHubActivity() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const handle = handleFrom(profile.github ?? "");
    if (!handle) return;

    const ac = new AbortController();

    (async () => {
      try {
        // Client-side nav shouldn't re-spend the visitor's 60/hr budget.
        // Read inside the async body so the cache hit never sets state
        // synchronously during the effect.
        try {
          const raw = sessionStorage.getItem(CACHE_KEY);
          if (raw) {
            const { at, payload } = JSON.parse(raw);
            if (Date.now() - at < CACHE_TTL_MS && payload?.handle === handle) {
              if (!ac.signal.aborted) setData(payload);
              return;
            }
          }
        } catch {
          /* private mode / disabled storage — just fetch */
        }

        const [evRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${handle}/events/public?per_page=100`, {
            signal: ac.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(`https://api.github.com/users/${handle}/repos?sort=pushed&per_page=100`, {
            signal: ac.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
        ]);
        if (!evRes.ok || !repoRes.ok) return; // rate-limited or missing → stay hidden

        const events = await evRes.json();
        const repoList = await repoRes.json();
        if (!Array.isArray(events) || !Array.isArray(repoList)) return;

        const now = Date.now();
        const day = 86_400_000;

        // ── commit grid ──────────────────────────────────────────────────
        // Bucket by local date so the grid lines up with the viewer's calendar.
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const span = WEEKS * 7;
        const counts = new Map<string, number>();

        for (const e of events) {
          if (e?.type !== "PushEvent" || !e?.created_at) continue;
          const d = new Date(e.created_at);
          d.setHours(0, 0, 0, 0);
          const key = d.toISOString().slice(0, 10);
          counts.set(key, (counts.get(key) ?? 0) + (e.payload?.size ?? 1));
        }

        const days: Data["days"] = [];
        for (let i = span - 1; i >= 0; i--) {
          const d = new Date(startOfToday.getTime() - i * day);
          const key = d.toISOString().slice(0, 10);
          const count = counts.get(key) ?? 0;
          days.push({
            count,
            label: `${count} commit${count === 1 ? "" : "s"} on ${d.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}`,
          });
        }

        const totalCommits = days.reduce((s, d) => s + d.count, 0);
        const activeDays = days.filter((d) => d.count > 0).length;

        // ── repos + languages ────────────────────────────────────────────
        const own = repoList.filter((r: { fork?: boolean; private?: boolean }) => !r.fork && !r.private);

        const langTally = new Map<string, number>();
        const sixMonths = now - 182 * day;
        for (const r of own) {
          if (!r.language) continue;
          if (new Date(r.pushed_at).getTime() < sixMonths) continue;
          langTally.set(r.language, (langTally.get(r.language) ?? 0) + 1);
        }
        const languages = [...langTally.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([l]) => l);

        const repos: Repo[] = own.slice(0, 3).map((r: Record<string, never> & {
          name: string; html_url: string; description: string | null;
          language: string | null; stargazers_count: number; pushed_at: string;
        }) => ({
          name: r.name,
          url: r.html_url,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          pushedLabel: relative(r.pushed_at, now),
        }));

        if (repos.length === 0 && totalCommits === 0) return; // nothing worth showing

        const payload: Data = { handle, days, totalCommits, activeDays, languages, repos };
        setData(payload);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: now, payload }));
        } catch {
          /* non-fatal */
        }
      } catch {
        /* aborted or offline — stay hidden */
      }
    })();

    return () => ac.abort();
  }, []);

  if (!data) return null;

  const peak = Math.max(1, ...data.days.map((d) => d.count));
  // Four steps rather than a continuous ramp: at this cell size a gradient is
  // indistinguishable, and discrete levels stay legible in both themes.
  const level = (n: number) => (n === 0 ? 0 : n >= peak * 0.66 ? 3 : n >= peak * 0.33 ? 2 : 1);
  const cellClass = [
    "bg-border/60",
    "bg-accent/30",
    "bg-accent/60",
    "bg-accent",
  ];

  // Column-major: 7 rows of WEEKS cells, oldest week on the left.
  const weeks: Data["days"][] = [];
  for (let w = 0; w < WEEKS; w++) weeks.push(data.days.slice(w * 7, w * 7 + 7));

  return (
    <div className="animate-fade-up">
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h3 className="shrink-0 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-fg-faint">
          Shipping right now
        </h3>
        <div className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
        <a
          href={`https://github.com/${data.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
        >
          @{data.handle}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden
            className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
        {/* ── commit grid ───────────────────────────────────────────── */}
        <div>
          <div className="flex gap-[3px] overflow-x-auto pb-1" role="img"
            aria-label={`${data.totalCommits} public commits across ${data.activeDays} active days in the last 90 days`}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((d, di) => (
                  <span
                    key={di}
                    title={d.label}
                    className={`block h-[9px] w-[9px] shrink-0 rounded-[2px] ${cellClass[level(d.count)]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.6875rem] leading-relaxed text-fg-faint">
            <span className="font-mono font-bold text-fg">{data.totalCommits}</span> public commits ·{" "}
            <span className="font-mono font-bold text-fg">{data.activeDays}</span> active days · last 90 days
          </p>
          {data.languages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {data.languages.map((l) => (
                <span key={l} className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-fg-subtle">
                  {l}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── most recently pushed ──────────────────────────────────── */}
        {data.repos.length > 0 && (
          <ul className="space-y-2">
            {data.repos.map((r) => (
              <li key={r.name}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-card border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong hover:bg-surface-raised"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-xs font-semibold text-fg transition-colors group-hover:text-accent">
                      {r.name}
                    </span>
                    {r.description && (
                      <span className="mt-1 line-clamp-1 block text-[0.6875rem] leading-relaxed text-fg-faint">
                        {r.description}
                      </span>
                    )}
                  </span>
                  <span className="flex shrink-0 items-center gap-2.5 text-[0.6875rem] text-fg-faint">
                    {r.stars > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {r.stars}
                      </span>
                    )}
                    {r.language && <span className="hidden sm:inline">{r.language}</span>}
                    <span className="whitespace-nowrap font-mono">{r.pushedLabel}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
