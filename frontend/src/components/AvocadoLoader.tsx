"use client";

import { useEffect, useState } from "react";

const HINTS = [
  "Slicing open the avocado…",
  "Mashing in the freshest data…",
  "Toasting the context bread…",
  "Squeezing in a dash of relevance…",
  "Almost ripe…",
];

function AvocadoSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.28)}
      viewBox="0 0 80 102"
      aria-hidden
      focusable="false"
    >
      <path
        d="M40 3C21 3 8 22 8 47c0 27 14 52 32 52s32-25 32-52C72 22 59 3 40 3z"
        fill="#2d5a3d"
      />
      <path
        d="M40 14C27 14 18 28 18 47c0 20 10 43 22 43s22-23 22-43c0-19-9-33-22-33z"
        fill="#c8e054"
      />
      <ellipse cx="40" cy="65" rx="11" ry="15" fill="#7c4a1e" />
    </svg>
  );
}

export default function AvocadoLoader({ fullScreen = false }: { fullScreen?: boolean }) {
  const [hint, setHint] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHint((h) => (h + 1) % HINTS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 select-none ${
        fullScreen
          ? "fixed inset-0 z-50 bg-bg"
          : "min-h-[60vh]"
      }`}
    >
      {/* Glow ring behind the avocado */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-green-400/10 dark:bg-green-400/5 animate-ping [animation-duration:2s]" />
        <div className="absolute w-20 h-20 rounded-full bg-indigo-400/10 dark:bg-indigo-400/5 animate-pulse" />
        <div style={{ animation: "avo-float 2.8s ease-in-out infinite" }}>
          <AvocadoSVG size={72} />
        </div>
      </div>

      {/* Hint text */}
      <div className="flex flex-col items-center gap-2.5">
        <p
          key={hint}
          className="text-sm text-fg-subtle animate-in fade-in duration-400 tracking-wide"
        >
          {HINTS[hint]}
        </p>
        <span className="inline-flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}
