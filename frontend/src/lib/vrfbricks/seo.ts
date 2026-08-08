import type { Metadata } from "next";
import { BUSINESS, BRICKS, FOUNDED_YEAR, IS_STANDARD, NEEDS_CONFIRMATION } from "@/data/vrfbricks/business";
import { FAQ } from "@/data/vrfbricks/copy";

/**
 * VRF Bricks SEO — canonical URLs, per-page metadata and JSON-LD.
 *
 * The original site had no <title>, no meta description, no OG tags and no
 * structured data at all. For a local materials supplier that is the whole
 * demand channel: "fly ash bricks Kavali" is how a customer 20 km away finds
 * a yard. LocalBusiness structured data is what puts the address, hours and
 * phone number into the search result itself.
 *
 * As with gradeVITian, the app is served on BOTH vrfbricks.jayaremala.com and
 * jayaremala.com/vrfbricks/…, so every page must declare the subdomain as its
 * canonical URL or the two copies split ranking signals.
 */

export const VRF_URL = "https://vrfbricks.jayaremala.com";

/** Under ~60 chars so Google shows it whole. Brand, then the head keywords. */
export const VRF_TITLE = "VRF Bricks, Fly Ash Cement Bricks in Kavali, Nellore";
/** Under ~155 chars so the SERP snippet is not cut mid-sentence. */
export const VRF_DESC =
  `Solid fly ash cement bricks pressed and cured in Kavali, Nellore district since ${FOUNDED_YEAR}. Three sizes, delivery across the district. Ask for a price on WhatsApp.`;

export const VRF_OG_CARD = {
  url: `${VRF_URL}/vrfbricks/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Venkata Ramana Fly Ash Cement Bricks, Kavali, Nellore District",
} as const;

/** Absolute, trailing-slash URL for a route — matches deployed URLs + sitemap. */
export function vrfUrl(path: string): string {
  const clean = path.replace(/^\/vrfbricks/, "").replace(/\/+$/, "");
  return clean === "" ? `${VRF_URL}/` : `${VRF_URL}${clean}/`;
}

interface PageSeo {
  /** Route path as it appears in the app, e.g. "/vrfbricks/bricks". */
  path: string;
  /** Title WITHOUT the brand suffix — the layout template appends it. */
  title: string;
  description: string;
  keywords?: string[];
  noindex?: boolean;
}

export function vrfMetadata({ path, title, description, keywords, noindex }: PageSeo): Metadata {
  const url = vrfUrl(path);
  const ogTitle = `${title}, VRF Bricks`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "VRF Bricks",
      url,
      title: ogTitle,
      description,
      locale: "en_IN",
      images: [VRF_OG_CARD],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [VRF_OG_CARD.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ── JSON-LD ───────────────────────────────────────────────────────────────────

/**
 * The important one. LocalBusiness tells Google this is a real place with an
 * address, hours and a phone number — which is what earns the map pack and the
 * knowledge panel for "fly ash bricks near me".
 *
 * Only verified facts go in. Anything still in NEEDS_CONFIRMATION is omitted
 * rather than guessed, because structured data that contradicts reality is
 * worse than none.
 */
export function localBusinessLd() {
  const { address, hours } = BUSINESS;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${VRF_URL}/#business`,
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    slogan: BUSINESS.tagline,
    description: VRF_DESC,
    url: vrfUrl("/"),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: String(FOUNDED_YEAR),
    founder: { "@type": "Person", name: BUSINESS.proprietor },
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    // No `geo`. The coordinates previously published here were accurate only
    // to Kavali town centre, and a LocalBusiness that asserts a precise point
    // it does not know drops the map pin in the wrong place. Google geocodes
    // the postal address perfectly well; once the yard has a Google Business
    // Profile the real coordinates come from there. See NEEDS_CONFIRMATION.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
        ],
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${BUSINESS.district} District, ${address.region}`,
    },
    knowsLanguage: ["te", "en"],
    ...(NEEDS_CONFIRMATION.googleBusinessProfile.confirmed &&
      NEEDS_CONFIRMATION.googleBusinessProfile.value && {
        sameAs: [NEEDS_CONFIRMATION.googleBusinessProfile.value],
      }),
    makesOffer: BRICKS.map((b) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: b.name.en,
        category: "Fly ash cement brick",
        material: "Fly ash, cement, stone dust, gypsum",
        depth: { "@type": "QuantitativeValue", value: b.inches.w, unitCode: "INH" },
        width: { "@type": "QuantitativeValue", value: b.inches.l, unitCode: "INH" },
        height: { "@type": "QuantitativeValue", value: b.inches.h, unitCode: "INH" },
      },
      availability: b.madeToOrder
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
      priceCurrency: "INR",
      // No price published — quotes are per enquiry. Omitting `price` entirely
      // is correct here; a placeholder would be a false claim.
    })),
  };
}

/** WebSite entity, so the brand name resolves cleanly. */
export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${VRF_URL}/#website`,
    name: BUSINESS.shortName,
    alternateName: BUSINESS.name,
    url: vrfUrl("/"),
    inLanguage: ["en-IN", "te-IN"],
    publisher: { "@id": `${VRF_URL}/#business` },
  };
}

/** Breadcrumb trail: VRF Bricks › <page>. */
export function breadcrumbLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BUSINESS.shortName, item: vrfUrl("/") },
      { "@type": "ListItem", position: 2, name, item: vrfUrl(path) },
    ],
  };
}

/**
 * FAQPage structured data for a given page.
 *
 * Reads the SAME array that <VRFFaq> renders, filtered by the same page key,
 * so the schema can never describe questions the visitor cannot see. Google
 * requires the answer to be visible on the page it is marked up on, and a
 * mismatch is what gets rich results suppressed rather than shown.
 *
 * English only: the prerendered HTML is English (Telugu applies on hydration),
 * so the marked-up text has to be the text a crawler actually finds.
 */
export function faqLdFor(page: "home" | "bricks" | "why" | "delivery") {
  const items = FAQ.filter((f) => f.pages.includes(page));
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q.en,
      acceptedAnswer: { "@type": "Answer", text: a.en },
    })),
  };
}

/** The IS standard, as a referenced specification on the Why Fly Ash page. */
export function standardLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `Fly ash bricks and ${IS_STANDARD.code}`,
    about: { "@type": "Thing", name: IS_STANDARD.title },
    url: vrfUrl("/why-fly-ash"),
    publisher: { "@id": `${VRF_URL}/#business` },
  };
}
