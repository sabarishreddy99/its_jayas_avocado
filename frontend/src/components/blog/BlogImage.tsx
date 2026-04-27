"use client";

import { useState, useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  caption?: string;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function BlogImage({ src, alt, caption }: Props) {
  const fullSrc = src.startsWith("http") ? src : `${BASE}${src}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <figure className="not-prose my-6 flex flex-col items-center">
        <div
          className="rounded-2xl border border-border bg-surface-raised p-3 shadow-sm cursor-zoom-in transition-all duration-200 hover:shadow-md hover:border-border-strong max-w-sm w-full"
          onClick={() => setOpen(true)}
          title="Click to enlarge"
        >
          <div style={{ lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fullSrc} alt={alt} className="w-full h-auto block rounded-xl" />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2.5 text-center text-[11px] text-fg-faint italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fullSrc}
              alt={alt}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            {caption && (
              <p className="mt-3 text-center text-xs text-zinc-300 italic">{caption}</p>
            )}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-surface text-fg-muted shadow-md flex items-center justify-center text-lg leading-none hover:bg-surface-raised transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
