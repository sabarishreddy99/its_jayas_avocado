"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Lang, T } from "@/data/vrfbricks/copy";

/**
 * Language state for the VRF Bricks site.
 *
 * English is the server-rendered default because that is what search traffic
 * lands on and what Google indexes. A returning Telugu reader gets their
 * choice back from localStorage on mount.
 *
 * The site is a static export, so there is no server-side cookie read — the
 * first paint is always English and Telugu is applied on hydration. That is a
 * deliberate trade: correct, stable HTML for crawlers over a flash-free swap
 * for one group of visitors.
 */

const STORAGE_KEY = "vrf-lang";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Resolve a bilingual pair to the active language. */
  t: (pair: T) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function VRFLangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // Deferred off the synchronous effect body, same as lib/gradevitian/useGvBase:
    // restoring a saved preference is a one-shot read from an external store, and
    // setting state inline here is the cascading-render pattern the lint rule
    // (rightly) rejects. A microtask's delay is invisible.
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "te" || saved === "en") setLangState(saved);
      } catch {
        /* private mode — keep the default */
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep <html lang> honest for screen readers and for Google's language
  // detection. The root layout ships lang="en"; this corrects it in place.
  useEffect(() => {
    document.documentElement.lang = lang === "te" ? "te" : "en";
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((pair: T) => pair[lang], [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside <VRFLangProvider>");
  return ctx;
}

