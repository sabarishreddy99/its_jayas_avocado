import type { Metadata } from "next";

/**
 * gradeVITian SEO helpers — one place for canonical URLs, per-page metadata
 * (title/description/OG/Twitter/robots) and JSON-LD structured data.
 *
 * Why this matters: the app is served on BOTH gradevitian.jayaremala.com AND
 * jayaremala.com/gradevitian/…, so every page must declare a single canonical
 * URL (the subdomain) or the two copies split ranking signals.
 */

export const GV_URL = "https://gradevitian.jayaremala.com";
/**
 * Site title, kept under ~60 characters so Google shows it whole: brand first
 * (it's the query most visitors actually type), then the two head keywords.
 * The home page must apply it as `title.absolute` — a bare `title.default` on the
 * gradeVITian layout still gets wrapped by the ROOT layout's
 * "%s | Jaya Sabarish Reddy Remala" template, which pushes it past truncation.
 */
export const GV_TITLE = "gradeVITian, VIT GPA, CGPA & Attendance Calculator";
/** Under ~155 characters so the SERP snippet isn't cut mid-sentence. */
export const GV_DESC =
  "Free VIT GPA and CGPA calculators, grade predictor and attendance tracker on VIT's 10-point scale. Instant, mobile-first, no sign-up needed.";
/** Square logo — used as the Organization `logo` in JSON-LD, which wants a mark. */
export const GV_OG_IMAGE = `${GV_URL}/gradevitian/LOGO-512px.png`;
/**
 * The 1200x630 social card built by app/gradevitian/opengraph-image.tsx. Named
 * explicitly (rather than relying on the file convention to cascade) because a
 * child route that exports its own `openGraph` replaces the parent's resolved
 * one, images included — so every page has to name the card itself.
 * Extension-less by design; nginx sets the PNG content type for this exact path.
 */
export const GV_OG_CARD = {
  url: `${GV_URL}/gradevitian/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "gradeVITian, free VIT GPA, CGPA, grade and attendance calculators",
} as const;
export const GV_AUTHOR = { "@type": "Person", name: "Jaya Sabarish Reddy Remala", url: "https://jayaremala.com" } as const;

/** Absolute, trailing-slash URL for a route — matches the deployed URLs + sitemap. */
export function gvUrl(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? `${GV_URL}/` : `${GV_URL}${clean}/`;
}

interface PageSeo {
  /** Route path, e.g. "/gpa" (or "/" for home). */
  path: string;
  /** Page title WITHOUT the brand suffix — the layout template appends " — gradeVITian". */
  title: string;
  description: string;
  keywords?: string[];
  /** Set true for private/auth pages that should not be indexed. */
  noindex?: boolean;
}

/** Build a complete, canonical-correct Metadata object for a gradeVITian page. */
export function gvMetadata({ path, title, description, keywords, noindex }: PageSeo): Metadata {
  const url = gvUrl(path);
  const ogTitle = `${title}, gradeVITian`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "gradeVITian",
      url,
      title: ogTitle,
      description,
      images: [GV_OG_CARD],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [GV_OG_CARD.url] },
    ...(noindex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
  };
}

// ── JSON-LD builders ──────────────────────────────────────────────────────────

/** Breadcrumb trail: gradeVITian › <page>. */
export function breadcrumbLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "gradeVITian", item: gvUrl("/") },
      { "@type": "ListItem", position: 2, name, item: gvUrl(path) },
    ],
  };
}

/** A single free web tool (calculator/planner). */
export function toolLd({ path, name, description }: { path: string; name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: gvUrl(path),
    description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "gradeVITian", url: gvUrl("/") },
    author: GV_AUTHOR,
  };
}

/**
 * ItemList of the site's tools, rendered on the home page. Gives Google an explicit,
 * ordered map of the pages worth surfacing as sitelinks under the brand result.
 */
export function toolListLd(items: { path: string; name: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "gradeVITian tools",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      description: it.description,
      url: gvUrl(it.path),
    })),
  };
}

/** FAQPage — MUST mirror the visible FAQ on the page (see GVFaq). */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Site-level entity graph rendered on every page (WebSite + Organization). */
export function gvSiteLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "gradeVITian",
      alternateName: "gradeVITian, VIT GPA & CGPA calculators",
      url: gvUrl("/"),
      inLanguage: "en",
      // Sitelinks search box — the /?q= target is handled by GVSearch on the home,
      // which opens the search palette pre-filled with the query.
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${gvUrl("/")}?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "gradeVITian",
      url: gvUrl("/"),
      logo: GV_OG_IMAGE,
      founder: GV_AUTHOR,
      description:
        "Free GPA, CGPA, grade, attendance and academic-rules tools for VIT students, built by a VITian, used by 17K+ students a month.",
    },
  ];
}
