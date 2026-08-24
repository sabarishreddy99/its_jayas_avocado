"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      /* Hidden below sm. At 390px this sat alongside the chat FAB, so two floating
         buttons occluded body text at every scroll position — a pull-quote lost its
         last line to it. Phones already scroll to top from the status bar; the chat
         FAB is a product affordance and keeps its corner. */
      className={`fixed bottom-6 left-5 z-40 hidden h-9 w-9 rounded-full border border-border bg-surface shadow-sm sm:flex
                  items-center justify-center text-fg-faint hover:text-fg hover:border-fg-muted
                  transition-all duration-200
                  ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
}
