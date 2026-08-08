/**
 * VRF Bricks — verified business facts.
 *
 * SINGLE SOURCE OF TRUTH. Every fact here was carried over from the original
 * vrfbricks.github.io site (archived at docs/vrfbricks-original/) or is a
 * property of fly-ash bricks as a product category.
 *
 * ── IMPORTANT ────────────────────────────────────────────────────────────────
 * Nothing in this file is invented. Anything that needs Govinda Reddy to
 * confirm is marked `NEEDS_CONFIRMATION` and is NOT rendered anywhere on the
 * site until it is filled in and the flag flipped. That is deliberate: a brick
 * yard's whole asset is being believed, so the site claims only what is true.
 */

export const FOUNDED_YEAR = 2014;

/**
 * The year this site was built, inlined as a literal by next.config.ts.
 *
 * Deliberately NOT `new Date().getFullYear()`. These values render inside
 * client components, and on a static export the HTML is produced once at build
 * time while the component re-runs in every visitor's browser. Reading the
 * clock on both sides means they disagree the moment the year turns over, and
 * React reports a hydration mismatch on the copyright line and the years
 * counter. A build-time literal is identical on both sides, and "as of the last
 * deploy" is the honest reading for a static site.
 */
export const BUILD_YEAR = Number(process.env.NEXT_PUBLIC_BUILD_YEAR) || FOUNDED_YEAR;

/** Years in business, fixed at build time so the copy never goes stale. */
export function yearsInBusiness(): number {
  return BUILD_YEAR - FOUNDED_YEAR;
}

export const BUSINESS = {
  /** Legal / display name, exactly as it appeared on the original site. */
  name: "Venkata Ramana Fly Ash Cement Bricks",
  shortName: "VRF Bricks",
  tagline: "Standard for Strength",
  proprietor: "Remala Govinda Reddy",

  phone: "+919912763863",
  phoneDisplay: "+91 99127 63863",
  /** wa.me wants the number bare — no +, no spaces. */
  whatsapp: "919912763863",
  email: "govindareddyremala@gmail.com",

  /**
   * The postal address, as confirmed by the owner.
   *
   * Supersedes what the original site printed, which had the wrong PIN (524201
   * rather than 524203) and a wayfinding landmark ("near Kolkata-Chennai
   * Highway Crossing") mixed into the street line. A wrong PIN on a
   * LocalBusiness record is not cosmetic: it is what Google geocodes against,
   * so it moves the pin and it can put the yard in the wrong delivery zone.
   *
   * `district` is deliberately NOT part of this address. Kavali sits in SPSR
   * Nellore district, which is true and useful for "brick supplier Nellore"
   * searches, so it is kept below as regional context and used for `areaServed`
   * and page copy. It is not printed as part of the postal address.
   */
  address: {
    street: "Thummalapenta Rd",
    locality: "Kavali",
    region: "Andhra Pradesh",
    postalCode: "524203",
    country: "IN",
  },

  /** The district Kavali sits in. Regional context for SEO, not postal address. */
  district: "Sri Potti Sriramulu Nellore",

  /**
   * Opening hours in ISO 24-hour form.
   *
   * These stay 24-hour because schema.org's `openingHoursSpecification`
   * requires it: the LocalBusiness JSON-LD in lib/vrfbricks/seo.ts feeds them
   * to Google verbatim, and "6 AM" there would simply be ignored.
   *
   * Everything a human reads goes through `fmtHour()` below, so the ISO values
   * are the single source and the am/pm display is derived from them.
   */
  hours: { opens: "06:00", closes: "21:00", days: "Monday – Sunday" },

} as const;

/**
 * The address on one line, exactly as the owner gives it.
 *
 * Used for the map link and the page description, so there is one canonical
 * spelling rather than several hand-assembled variants that can drift apart.
 */
export function formattedAddress(withName = true): string {
  const { street, locality, region, postalCode } = BUSINESS.address;
  return [
    withName ? BUSINESS.name : null,
    street,
    locality,
    `${region} ${postalCode}`,
    "India",
  ]
    .filter(Boolean)
    .join(", ");
}

/**
 * Format an ISO "HH:MM" as a 12-hour clock time for display.
 *
 * Written by hand rather than with `toLocaleTimeString` on purpose: that reads
 * the runtime's ICU data, which can differ between the Node process that
 * builds the HTML and the browser that hydrates it, and a mismatch there is a
 * hydration error. This is pure arithmetic, so both sides always agree.
 *
 * Telugu puts the part of day BEFORE the number ("ఉదయం 6", not "6 ఉదయం") and
 * picks the word by the actual hour rather than by a single am/pm split, which
 * is why 9pm reads రాత్రి (night) while 5pm would read సాయంత్రం (evening).
 *
 * Minutes are omitted on the hour: "6 AM" reads better than "6:00 AM" on a
 * shop's opening times, and the yard has never opened at half past anything.
 */
export function fmtHour(iso: string, lang: "en" | "te" = "en"): string {
  const [H, M] = iso.split(":").map(Number);
  const h12 = H % 12 === 0 ? 12 : H % 12;
  const mins = M ? `:${String(M).padStart(2, "0")}` : "";

  if (lang === "te") {
    const part =
      H < 4 ? "రాత్రి"        // small hours
      : H < 12 ? "ఉదయం"      // morning
      : H < 16 ? "మధ్యాహ్నం"  // afternoon
      : H < 19 ? "సాయంత్రం"  // evening
      : "రాత్రి";             // night
    return `${part} ${h12}${mins}`;
  }
  return `${h12}${mins} ${H >= 12 ? "PM" : "AM"}`;
}

/** The opening range as one string, e.g. "6 AM to 9 PM". */
export function fmtHours(lang: "en" | "te" = "en", sep = "–"): string {
  return `${fmtHour(BUSINESS.hours.opens, lang)} ${sep} ${fmtHour(BUSINESS.hours.closes, lang)}`;
}

/**
 * Products, exactly as specified on the original site.
 *
 * Dimensions are the source of truth in INCHES (that is how they are sold and
 * how a mason thinks); mm is derived for spec-sheet readers. Prices are
 * deliberately absent — quotes are given per enquiry so a stale number never
 * costs a sale or misleads a buyer. See docs/VRFBRICKS.md.
 */
export interface Brick {
  id: string;
  name: { en: string; te: string };
  /** The name masons actually use on site. */
  trade: { en: string; te: string };
  inches: { l: number; w: number; h: number };
  /** Bricks per truck load, from the original site. null = not published. */
  perTruck: number | null;
  /** Approximate bricks to build 100 sq ft of wall at this thickness. */
  per100SqFt: number;
  use: { en: string; te: string };
  madeToOrder: boolean;
}

const MM_PER_INCH = 25.4;
export const toMm = (inches: number) => Math.round(inches * MM_PER_INCH);
export const toCm = (inches: number) => +(inches * 2.54).toFixed(2);
export const toFt = (inches: number) => +(inches / 12).toFixed(3);

export const BRICKS: Brick[] = [
  {
    id: "type-1",
    name: { en: "Solid Brick, Type 1", te: "సాలిడ్ ఇటుక, టైప్ 1" },
    trade: { en: "The 9-inch wall brick", te: "9 అంగుళాల గోడ ఇటుక" },
    inches: { l: 11, w: 5.5, h: 7 },
    perTruck: 400,
    // 100 sq ft of wall / (11in x 7in face = 0.535 sq ft), +5% wastage
    per100SqFt: 196,
    use: {
      en: "Load-bearing outer walls, compound walls, and any wall carrying a slab above it.",
      te: "బరువు మోసే బయటి గోడలు, ప్రహరీ గోడలు, పైన స్లాబ్ ఉన్న ఏ గోడకైనా.",
    },
    madeToOrder: false,
  },
  {
    id: "type-2",
    name: { en: "Solid Brick, Type 2", te: "సాలిడ్ ఇటుక, టైప్ 2" },
    trade: { en: "The partition brick", te: "పార్టిషన్ ఇటుక" },
    inches: { l: 11, w: 4, h: 7 },
    perTruck: 500,
    per100SqFt: 196,
    use: {
      en: "Internal partition walls, bathroom and kitchen walls, and infill in framed structures.",
      te: "లోపలి పార్టిషన్ గోడలు, బాత్‌రూమ్ మరియు వంటగది గోడలు, ఫ్రేమ్ నిర్మాణాలలో ఇన్‌ఫిల్.",
    },
    madeToOrder: false,
  },
  {
    id: "mega",
    name: { en: "Mega Solid Brick", te: "మెగా సాలిడ్ ఇటుక" },
    trade: { en: "The tall brick", te: "పొడవైన ఇటుక" },
    inches: { l: 11, w: 5.5, h: 9 },
    perTruck: null,
    // 11in x 9in face = 0.6875 sq ft, +5% wastage
    per100SqFt: 153,
    use: {
      en: "Fewer courses over the same height, so faster walling and less mortar on tall runs.",
      te: "అదే ఎత్తుకు తక్కువ వరుసలు, వేగవంతమైన గోడ మరియు తక్కువ మోర్టార్.",
    },
    madeToOrder: true,
  },
];

/**
 * Delivery terms, from the original site.
 * "1–2 days from the date of request", charges vary by location.
 */
export const DELIVERY = {
  leadTimeDays: [1, 2] as const,
  chargesVaryByLocation: true,
  selfPickupAvailable: true,
} as const;

/**
 * IS 12894:2002 — Pulverized Fuel Ash-Lime Bricks. These are the published
 * requirements of the STANDARD, presented as what the product category is
 * measured against. They are NOT a claim that this yard has been tested and
 * certified — see NEEDS_CONFIRMATION below.
 */
export const IS_STANDARD = {
  code: "IS 12894:2002",
  title: "Pulverized Fuel Ash-Lime Bricks: Specification",
  classes: [
    { grade: "Class 7.5", strengthMPa: 7.5, note: "Common for non-load-bearing" },
    { grade: "Class 10", strengthMPa: 10, note: "Common for load-bearing" },
  ],
  maxWaterAbsorptionPct: 20,
  efflorescence: "Not more than 'moderate' up to Class 12.5",
} as const;

/**
 * ── NEEDS_CONFIRMATION ───────────────────────────────────────────────────────
 * Ask Govinda Reddy for each of these, then fill it in and set `confirmed:true`.
 * Any block whose `confirmed` is false is skipped at render time, so the site
 * never shows an unverified claim.
 *
 * Deliberately NOT `as const`: the flags must stay `boolean` rather than the
 * literal `false`, or every guard reading them becomes statically dead and the
 * conditional-render sites stop type-checking the moment one is flipped.
 */
interface Pending<V> {
  confirmed: boolean;
  value: V | null;
}

export const NEEDS_CONFIRMATION: {
  pricing: Pending<Record<string, number>>;
  capacity: Pending<string>;
  gstin: Pending<string>;
  testReport: Pending<{ class: string; lab: string; date: string; url?: string }>;
  flyAshSource: Pending<string>;
  deliveryRadiusKm: Pending<number>;
  projects: Pending<{ name: string; where: string }[]>;
  googleBusinessProfile: Pending<string>;
  geo: Pending<{ lat: number; lng: number }>;
} = {
  /** Current price per piece for each brick. Quotes are per-enquiry for now. */
  pricing: { confirmed: false, value: null },
  /** Bricks produced per day / per month. A real capacity number builds trust. */
  capacity: { confirmed: false, value: null },
  /** GSTIN, if registered. Contractors and builders ask for this first. */
  gstin: { confirmed: false, value: null },
  /** Has a batch ever been lab-tested to IS 12894? If so, class + lab + date. */
  testReport: { confirmed: false, value: null },
  /** Where the fly ash is sourced from. Named source = a real trust signal. */
  flyAshSource: { confirmed: false, value: null },
  /** Delivery radius in km, and the towns covered. */
  deliveryRadiusKm: { confirmed: false, value: null },
  /** Named completed projects / repeat customers who agree to be listed. */
  projects: { confirmed: false, value: null },
  /** Google Business Profile URL, once created. Biggest single local-SEO win. */
  googleBusinessProfile: { confirmed: false, value: null },
  /**
   * Exact yard coordinates. The previous value was Kavali town centre, which is
   * close enough to look right and wrong enough to misdirect a truck, so it was
   * removed from both the LocalBusiness JSON-LD and the directions link.
   * Easiest way to capture it: stand in the yard, long-press your location in
   * Google Maps, and read off the pin. Creating the Google Business Profile
   * also produces it.
   */
  geo: { confirmed: false, value: null },
};

/**
 * The map shown on the Visit page.
 *
 * Replaces the Google MyMaps file the original site embedded. That was a
 * hand-drawn map saved in 2020, it carried a pin nobody has checked since, and
 * because it was a fixed `mid=` it could not follow a corrected address. It was
 * pointing at the wrong place.
 *
 * This is derived instead, so the map cannot drift away from the address again:
 *
 *   - Once the exact yard coordinates are confirmed, the embed centres on that
 *     point and the pin is exactly at the gate.
 *   - Until then it searches the postal address, so the map lands on the right
 *     street in the right town, and it resolves to the business itself the
 *     moment the yard has a Google Business Profile.
 *
 * Uses the keyless `output=embed` form on purpose: the Maps Embed API needs a
 * billed key, and this site has no server and no secrets to hold one.
 */
export function mapEmbedUrl(): string {
  const geo = NEEDS_CONFIRMATION.geo;
  const q =
    geo.confirmed && geo.value
      ? `${geo.value.lat},${geo.value.lng}`
      : formattedAddress();
  // z=15 shows the yard in the context of the road that leads to it, which is
  // what a driver needs; a tighter zoom loses the approach.
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed&hl=en`;
}
