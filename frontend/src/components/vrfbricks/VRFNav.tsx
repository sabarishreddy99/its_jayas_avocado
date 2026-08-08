"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import VRFLink from "./VRFLink";
import { useLang } from "./VRFLang";
import { WhatsAppIcon, PhoneIcon } from "./VRFUi";
import { telLink, waSimple } from "./whatsapp";
import { BUSINESS, fmtHours } from "@/data/vrfbricks/business";
import { COPY, LANGS } from "@/data/vrfbricks/copy";
import { VRF_NAV } from "@/lib/vrfbricks/nav";

/**
 * VRF Bricks navigation.
 *
 * Built on the same skeleton as the portfolio Nav and GVNav so the three sites
 * feel like one hand made them: sticky header that hides on scroll-down and
 * returns on scroll-up or idle, a gradient scrim for an air gap, a floating
 * "pill" that gains background, shadow and dot-grid once scrolled, a Playfair
 * wordmark, and a spotlight that glides between the active links.
 *
 * Two things are VRF's own, because this is a shop rather than a product:
 *   - a contact strip pinned above everything, since a phone number is the
 *     single most valuable element on a local supplier's site;
 *   - a language toggle, because half this audience reads Telugu.
 */

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    className={`ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    aria-hidden
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/** The brick mark: three faces at the real 11:7 ratio, in running bond. */
const BrickMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="1.5" y="5" width="9.5" height="6" rx="0.8" fill="currentColor" opacity="0.9" />
    <rect x="13" y="5" width="9.5" height="6" rx="0.8" fill="currentColor" opacity="0.55" />
    <rect x="7.25" y="13" width="9.5" height="6" rx="0.8" fill="currentColor" opacity="0.75" />
  </svg>
);

export default function VRFNav() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [langMenu, setLangMenu] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef(open);
  useEffect(() => { openRef.current = open; }, [open]);

  const langRef = useRef<HTMLDivElement>(null);

  /**
   * NAV hrefs are clean ("/bricks/"), but the path this runs at depends on the
   * mount point: "/bricks/" on the subdomain, "/vrfbricks/bricks/" under the
   * main domain. Strip the prefix before comparing.
   */
  const here = pathname.replace(/^\/vrfbricks/, "").replace(/\/$/, "") || "/";
  const isActive = (href: string) => {
    const target = href.replace(/\/$/, "") || "/";
    return target === "/" ? here === "/" : here === target || here.startsWith(`${target}/`);
  };

  // ── Gliding spotlight across the desktop links ──────────────────
  const triggerRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [spot, setSpot] = useState({ left: 0, width: 0, opacity: 0 });
  const activeIdx = VRF_NAV.findIndex((it) => isActive(it.href));

  useEffect(() => {
    const idx = hoverIdx ?? activeIdx;
    const el = idx >= 0 ? triggerRefs.current[idx] : null;
    if (el) setSpot({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    else setSpot((s) => ({ ...s, opacity: 0 }));
  }, [hoverIdx, activeIdx, pathname, lang]);

  // Re-measure after the font swap and on resize, since the Telugu labels are
  // a different width from the English ones.
  useEffect(() => {
    const remeasure = () => {
      const el = activeIdx >= 0 ? triggerRefs.current[activeIdx] : null;
      if (el) setSpot({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };
    const id = setTimeout(remeasure, 80);
    window.addEventListener("resize", remeasure);
    return () => { clearTimeout(id); window.removeEventListener("resize", remeasure); };
  }, [activeIdx, lang]);

  // Close the language menu on Escape or outside click
  useEffect(() => {
    if (!langMenu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLangMenu(false); };
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangMenu(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [langMenu]);

  // Close the drawer on navigation
  const [navPath, setNavPath] = useState(pathname);
  if (navPath !== pathname) {
    setNavPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      setScrolled(y > 48);

      if (y <= 10) {
        clearTimeout(hideTimer.current ?? undefined);
        clearTimeout(idleTimer.current ?? undefined);
        setNavVisible(true);
      } else if (delta > 6 && !openRef.current) {
        clearTimeout(idleTimer.current ?? undefined);
        clearTimeout(hideTimer.current ?? undefined);
        hideTimer.current = setTimeout(() => setNavVisible(false), 120);
      } else if (delta < -4) {
        clearTimeout(hideTimer.current ?? undefined);
        clearTimeout(idleTimer.current ?? undefined);
        setNavVisible(true);
      }
      clearTimeout(idleTimer.current ?? undefined);
      idleTimer.current = setTimeout(() => setNavVisible(true), 900);
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimer.current ?? undefined);
      clearTimeout(idleTimer.current ?? undefined);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 will-change-transform bg-bg ${
        navVisible
          ? "translate-y-0 transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          : "-translate-y-[110%] transition-transform duration-[220ms] ease-in"
      }`}
    >
      {/* Contact strip. The phone number is the most valuable element on a
          local supplier's site, so it sits above everything and is tappable. */}
      <div className="bg-fg text-bg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 sm:px-6">
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] opacity-75 sm:text-[11px]">
            {t(COPY.common.openDaily)} · {fmtHours(lang)}
          </p>
          <a
            href={telLink}
            className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-bg no-underline sm:text-xs"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Gradient scrim: an air gap between the nav and the page content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-16"
        style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)" }}
      />

      <div className="px-2 py-2 lg:px-4">
        {/* The nav pill */}
        <div
          className={`relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-[background-color,box-shadow] duration-400 ease-out sm:px-4 ${
            scrolled
              ? "bg-bg dark:bg-surface [box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.08),0_2px_8px_-2px_rgb(0_0_0/0.04)] dark:[box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.45),0_2px_8px_-2px_rgb(0_0_0/0.25)]"
              : "bg-transparent shadow-none"
          }`}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className={`hero-dot-grid absolute inset-0 transition-opacity duration-400 ${scrolled ? "opacity-[0.18]" : "opacity-0"}`} />
          </div>

          {/* Wordmark */}
          <VRFLink
            href="/"
            onClick={() => setOpen(false)}
            className="relative z-10 inline-flex min-w-0 items-center gap-2 text-fg no-underline transition-opacity hover:opacity-70"
          >
            <span className="shrink-0 text-accent"><BrickMark /></span>
            <span className="min-w-0">
              <span
                className="block truncate text-lg font-normal leading-none tracking-widest sm:text-xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                VRF <span className="text-accent">Bricks</span>
              </span>
              <span className="mt-0.5 hidden truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-fg-faint sm:block">
                {t(COPY.home.tagline)}
              </span>
            </span>
          </VRFLink>

          {/* Desktop nav */}
          <nav className="relative z-10 hidden items-center gap-1 lg:flex">
            <div className="relative flex items-center gap-1" onMouseLeave={() => setHoverIdx(null)}>
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-md bg-surface-raised ring-1 ring-border"
                style={{
                  left: spot.left,
                  width: spot.width,
                  opacity: spot.opacity,
                  transition:
                    "left 0.42s cubic-bezier(0.22,1,0.36,1), width 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
                }}
              />
              {VRF_NAV.map((item, i) => (
                <VRFLink
                  key={item.href}
                  href={item.href}
                  ref={(el: HTMLAnchorElement | null) => { triggerRefs.current[i] = el; }}
                  onMouseEnter={() => setHoverIdx(i)}
                  className={`relative z-10 inline-flex items-center whitespace-nowrap px-3 py-1.5 text-sm no-underline transition-colors duration-200 ${
                    isActive(item.href)
                      ? "font-semibold text-fg"
                      : hoverIdx === i
                      ? "text-fg"
                      : "text-fg-subtle"
                  }`}
                >
                  {t(item.label)}
                </VRFLink>
              ))}
            </div>

            {/* Language menu, styled as the portfolio's dropdowns */}
            <div ref={langRef} className="relative ml-1">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={langMenu}
                onClick={() => setLangMenu((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-fg-subtle transition-colors hover:border-fg-muted hover:text-fg"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
                </svg>
                {LANGS.find((l) => l.id === lang)?.short}
                <Chevron open={langMenu} />
              </button>

              <div
                role="menu"
                className={`absolute right-0 top-full mt-2 w-40 origin-top rounded-xl bg-surface/95 p-1.5 ring-1 ring-border backdrop-blur-[14px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] [box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.12),0_2px_8px_-2px_rgb(0_0_0/0.06)] dark:[box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.5),0_2px_8px_-2px_rgb(0_0_0/0.3)] ${
                  langMenu
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
                }`}
              >
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === l.id}
                    onClick={() => { setLang(l.id); setLangMenu(false); }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                      lang === l.id
                        ? "bg-surface-raised font-semibold text-fg"
                        : "text-fg-muted hover:bg-surface-raised hover:text-fg"
                    }`}
                  >
                    {l.label}
                    {lang === l.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <ThemeToggle />

            <a
              href={waSimple(t(COPY.quote.msgIntro))}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1.5 inline-flex items-center gap-1.5 rounded-full bg-fg px-5 py-1.5 text-sm font-medium text-bg no-underline transition-opacity duration-200 hover:opacity-75"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              {t(COPY.common.getQuote)}
            </a>
          </nav>

          {/* Mobile / tablet controls */}
          <div className="relative z-10 flex items-center gap-1 lg:hidden">
            <a
              href={waSimple(t(COPY.quote.msgIntro))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-fg px-4 text-xs font-medium text-bg no-underline sm:text-sm"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t(COPY.common.getQuote)}</span>
            </a>
            <ThemeToggle />
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-raised hover:text-fg"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="vrf-drawer"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer, same glass treatment as the portfolio's */}
        {open && (
          <div
            id="vrf-drawer"
            className="mt-1.5 overflow-hidden rounded-2xl bg-surface/92 backdrop-blur-[14px] lg:hidden [box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.10),_0_2px_8px_-2px_rgb(0_0_0/0.06)] dark:[box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.45),_0_2px_8px_-2px_rgb(0_0_0/0.25)]"
          >
            <nav className="flex flex-col px-2 py-2">
              {VRF_NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <VRFLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-start gap-3 rounded-xl px-3 py-2.5 no-underline transition-colors ${
                      active ? "bg-surface-raised" : "hover:bg-surface-raised"
                    }`}
                  >
                    <span className={`mt-0.5 shrink-0 ${active ? "text-accent" : "text-fg-faint"}`}>
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-sm leading-tight ${active ? "font-semibold text-fg" : "font-medium text-fg-muted"}`}>
                        {t(item.label)}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-tight text-fg-faint">
                        {t(item.desc)}
                      </span>
                    </span>
                  </VRFLink>
                );
              })}

              {/* Language, as a segmented control so both scripts stay visible */}
              <div className="mt-2 border-t border-border/60 pt-2">
                <p className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-faint">
                  Language / భాష
                </p>
                <div className="flex gap-1.5 px-3 pb-1">
                  {LANGS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLang(l.id)}
                      aria-pressed={lang === l.id}
                      className={`flex-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                        lang === l.id
                          ? "bg-fg text-bg"
                          : "bg-surface-raised text-fg-muted hover:text-fg"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 border-t border-border/60 pt-2">
                <a
                  href={telLink}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-fg-muted no-underline transition-colors hover:bg-surface-raised hover:text-fg"
                >
                  <PhoneIcon className="h-[18px] w-[18px] shrink-0 text-fg-faint" />
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
