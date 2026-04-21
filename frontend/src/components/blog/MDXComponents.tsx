import type { MDXComponents } from "mdx/types";
import BlogImageClient from "./BlogImage";

/* ── Callout ─────────────────────────────────────────── */
type CalloutVariant = "info" | "tip" | "warning" | "quote";

const CALLOUT_STYLES: Record<CalloutVariant, { border: string; bg: string; icon: string; label: string; text: string }> = {
  info:    { border: "border-blue-200",  bg: "bg-blue-50",   icon: "ℹ",  label: "text-blue-700",  text: "text-blue-800" },
  tip:     { border: "border-green-200", bg: "bg-green-50",  icon: "✦",  label: "text-green-700", text: "text-green-800" },
  warning: { border: "border-amber-200", bg: "bg-amber-50",  icon: "⚠",  label: "text-amber-700", text: "text-amber-900" },
  quote:   { border: "border-indigo-200",bg: "bg-indigo-50", icon: "❝",  label: "text-indigo-600",text: "text-indigo-900" },
};

export function Callout({ type = "info", title, children }: { type?: CalloutVariant; title?: string; children: React.ReactNode }) {
  const s = CALLOUT_STYLES[type];
  return (
    <div className={`not-prose my-6 rounded-xl border ${s.border} ${s.bg} px-5 py-4`}>
      <div className={`flex items-center gap-2 mb-1.5 text-sm font-semibold ${s.label}`}>
        <span>{s.icon}</span>
        <span>{title ?? type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>
      <div className={`text-sm leading-relaxed ${s.text}`}>{children}</div>
    </div>
  );
}

/* ── BlogImage — delegates to client component for lightbox ── */
export function BlogImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <BlogImageClient src={src} alt={alt} caption={caption} />;
}

/* ── Divider ─────────────────────────────────────────── */
export function Divider() {
  return (
    <div className="not-prose my-8 flex items-center gap-3">
      <div className="flex-1 h-px bg-zinc-200" />
      <span className="text-zinc-300 text-xs">✦</span>
      <div className="flex-1 h-px bg-zinc-200" />
    </div>
  );
}

/* ── MDX component overrides ─────────────────────────── */
export const mdxComponents: MDXComponents = {
  // Images: auto-wrap with caption if title provided
  img: ({ src, alt, title }) => (
    <BlogImageClient src={src as string} alt={alt ?? ""} caption={title} />
  ),

  // Styled inline code
  code: ({ children }) => (
    <code className="bg-zinc-100 border border-zinc-200 rounded px-1.5 py-0.5 text-[0.83em] font-mono text-fuchsia-700">
      {children}
    </code>
  ),

  // Headings with anchor links
  h2: ({ children, id }) => (
    <h2 id={id} className="group relative">
      {children}
      {id && (
        <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-40 text-zinc-400 no-underline text-sm" aria-hidden>
          #
        </a>
      )}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="group relative">
      {children}
      {id && (
        <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-40 text-zinc-400 no-underline text-sm" aria-hidden>
          #
        </a>
      )}
    </h3>
  ),

  // Expose custom components directly usable in MDX
  Callout,
  BlogImage,
  Divider,
};
