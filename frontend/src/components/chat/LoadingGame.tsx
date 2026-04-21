"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { icon: "🥑", text: "Slicing open the avocado…" },
  { icon: "🥄", text: "Mashing in Jaya's experience…" },
  { icon: "🍞", text: "Toasting the context bread…" },
  { icon: "🍋", text: "Squeezing in a dash of relevance…" },
  { icon: "🌿", text: "Layering on the freshest insights…" },
  { icon: "🧂", text: "Seasoning with precision…" },
  { icon: "✨", text: "Almost ready to serve…" },
];

export default function LoadingGame() {
  const [step, setStep] = useState(0);
  const [coldStart, setColdStart] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 1800);
    const coldTimer = setTimeout(() => setColdStart(true), 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(coldTimer);
    };
  }, []);

  return (
    <div className="space-y-2 animate-in fade-in duration-300">

      {coldStart && (
        <div className="animate-in fade-in duration-500 mx-10 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 flex items-start gap-2">
          <span className="text-sm shrink-0 mt-px">🥑</span>
          <div>
            <p className="text-[11px] font-semibold text-amber-700">Avocado is waking up…</p>
            <p className="text-[10px] text-amber-600 mt-0.5">
              First response takes ~20–30 s on cold start. Subsequent ones are instant.
            </p>
          </div>
        </div>
      )}

      {/* Centered pill — visually distinct from a message bubble */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-100 bg-indigo-50/60 px-4 py-2 shadow-sm">
          <span className="text-base leading-none animate-in zoom-in duration-200" key={step}>
            {STEPS[step].icon}
          </span>
          <span className="text-[12px] text-indigo-600 font-medium whitespace-nowrap">
            {STEPS[step].text}
          </span>
          <span className="flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] h-[3px] rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        </div>
      </div>

    </div>
  );
}
