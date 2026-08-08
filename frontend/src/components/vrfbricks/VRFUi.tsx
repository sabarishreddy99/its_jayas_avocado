import VRFLink from "./VRFLink";

/**
 * Shared primitives for VRF Bricks.
 *
 * These deliberately mirror the editorial vocabulary the portfolio and
 * gradeVITian already use: an <Inner> width container, a <Chapter> marker
 * (number, label, hairlines), and a Cormorant <Headline>. Same rhythm, same
 * tokens, same dark mode. Only the accent differs, so the page reads as part
 * of one family of sites while still belonging to the brick yard.
 *
 * Icons are inline SVG rather than an icon font. The original site pulled
 * FontAwesome, jQuery, sweetalert and anime.js off four different CDNs to draw
 * a phone glyph and a truck, which on a 3G connection in Kavali is most of the
 * page weight, for decoration.
 */

/** Editorial display face, the same Cormorant Garamond gradeVITian rises in. */
export const SERIF = "var(--font-cormorant), var(--font-vrf-telugu), Georgia, serif";

// ── Icons ────────────────────────────────────────────────────────────────────

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.35-1.4a9.83 9.83 0 0 0 4.58 1.17h.01c5.44 0 9.86-4.42 9.86-9.86 0-2.64-1.03-5.12-2.89-6.98A9.8 9.8 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.8 2.4 8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19z" />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function TruckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className} aria-hidden="true">
      <path d="M1 3h13v13H1z" />
      <path d="M14 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="17.5" cy="18.5" r="2.5" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ── Buttons ──────────────────────────────────────────────────────────────────

/**
 * Pill geometry, matching the portfolio's `rounded-full bg-fg text-bg` CTAs.
 * min-h-11 keeps every button at or above the 44px touch target on phones.
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.92rem] font-medium leading-none no-underline transition-all duration-200";

/** The WhatsApp action. Keeps WhatsApp green in both themes on purpose. */
export function WhatsAppButton({
  href, children, className = "",
}: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} vrf-btn-wa ${className}`}
    >
      <WhatsAppIcon className="h-[1.15em] w-[1.15em]" />
      {children}
    </a>
  );
}

/** The call action: the portfolio's primary pill, ink on background. */
export function CallButton({
  href, children, className = "",
}: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={`${base} bg-fg text-bg hover:opacity-75 ${className}`}>
      <PhoneIcon className="h-[1.05em] w-[1.05em]" />
      {children}
    </a>
  );
}


/** Internal navigation, a quiet text link with a moving arrow. */
export function TextLink({
  href, children, className = "",
}: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <VRFLink
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-accent no-underline hover:text-accent-hover ${className}`}
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </VRFLink>
  );
}

// ── Layout ───────────────────────────────────────────────────────────────────

/** Shared width container, matching the portfolio's and gradeVITian's <Inner>. */
export function Inner({
  children, className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>
  );
}

export function Section({
  children, className = "", bond = false, id,
}: {
  children: React.ReactNode;
  className?: string;
  /** Lay the stretcher-bond motif behind this section. */
  bond?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {bond && (
        <div aria-hidden="true" className="vrf-bond pointer-events-none absolute inset-0" />
      )}
      <Inner className="relative">{children}</Inner>
    </section>
  );
}

/**
 * A chapter marker: number, label, hairlines. The same device that gives the
 * portfolio and gradeVITian their slow, told-in-acts rhythm.
 */
export function Chapter({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-3.5">
      <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
      <span className="text-nano font-semibold uppercase tracking-[0.3em] text-fg-subtle">
        <span className="text-accent">{index}</span>
        <span className="mx-2 text-border-strong">/</span>
        {label}
      </span>
      <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
    </div>
  );
}

/** Cormorant serif headline, used for every act. */
export function Headline({
  children, className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[2rem] font-light leading-[1.1] tracking-[-0.01em] text-fg sm:text-[2.7rem] ${className}`}
      style={{ fontFamily: SERIF }}
    >
      {children}
    </h2>
  );
}

/** Small uppercase label above a heading, marked with a brick face. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2.5 text-nano font-bold uppercase tracking-[0.22em] text-accent">
      <span className="vrf-chip" aria-hidden="true" />
      {children}
    </p>
  );
}
