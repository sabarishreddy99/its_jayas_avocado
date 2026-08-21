"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroStat } from "@/data/profile";

const FALLBACK_STATS: HeroStat[] = [
  { value: 78,  suffix: "%",  label: "Latency Cut",      sub: "P99 RAG on 3K+ RPS" },
  { value: 3,   suffix: "K+", label: "Peak RPS",         sub: "99.9% uptime" },
  { value: 15,  suffix: "ms", label: "Edge Inference",   sub: "Snapdragon NPU" },
  { value: 115, suffix: "GB", label: "Daily Throughput", sub: "Zero data loss" },
];

export default function HeroStats({
  stats,
  cols = 4,
  startOnView = false,
}: {
  stats?: HeroStat[];
  cols?: 2 | 4;
  /** Count up when the band scrolls into view rather than on a blind timer.
   *  Use wherever the stats are no longer above the fold. */
  startOnView?: boolean;
}) {
  const STATS = (stats && stats.length > 0) ? stats : FALLBACK_STATS;
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const run = () => {
      const duration = 1100;
      const start = performance.now();

      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) ** 3; // ease-out cubic
        setCounts(STATS.map((s) => Math.round(s.value * eased)));
        if (t < 1) raf = requestAnimationFrame(tick);
        else setCounts(STATS.map((s) => s.value));
      }

      raf = requestAnimationFrame(tick);
    };

    if (!startOnView) {
      // Above the fold — delay slightly so the page paint settles
      const delay = setTimeout(run, 380);
      return () => {
        clearTimeout(delay);
        cancelAnimationFrame(raf);
      };
    }

    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(el);
        run();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOnView]);

  return (
    /* A ruled band, not four cards. The card version nested containers inside
       the chapter's own card, gated the `sub` line behind hover (unreachable on
       touch), and animated max-height to reveal it. Columns divided by hairlines
       read as what this actually is — a table of measurements — and every line
       is present at rest. */
    <div
      ref={rootRef}
      className={`grid border-y border-border divide-border ${
        cols === 2 ? "grid-cols-2 divide-x divide-y" : "grid-cols-4 divide-x"
      }`}
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="px-4 py-5 first:pl-0">
          <p className="font-mono leading-none tabular-nums">
            <span className="text-xl font-bold text-fg sm:text-2xl lg:text-[1.75rem]">
              {counts[i]}
            </span>
            <span className="text-sm font-bold text-fg-subtle sm:text-base">
              {stat.suffix}
            </span>
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest leading-tight text-fg-subtle">
            {stat.label}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-fg-subtle">
            {stat.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
