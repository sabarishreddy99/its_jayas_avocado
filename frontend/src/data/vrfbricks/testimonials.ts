import type { T } from "./copy";

/**
 * What customers say.
 *
 * ── READ BEFORE ADDING ANYTHING ──────────────────────────────────────────────
 *
 * This array is EMPTY on purpose, and it must stay empty until Govinda Reddy
 * collects real quotes from real customers who have agreed to be named.
 *
 * Do not write placeholder testimonials. Do not adapt one from another brick
 * supplier's website. Do not let an AI assistant generate "realistic sounding"
 * ones to fill the layout. A fabricated review is a fabricated record: it is
 * the single fastest way to destroy the trust this entire site is built to
 * earn, it is illegal in most jurisdictions as a deceptive trade practice, and
 * on a business where the proprietor's own name is above the door it is not a
 * small thing.
 *
 * While this array is empty, <VRFTestimonials> renders an honest empty state
 * that says so and offers the visitor a customer reference by phone instead.
 * That is a better trust signal than any invented quote, and it costs nothing
 * to be true.
 *
 * ── HOW TO COLLECT THEM ──────────────────────────────────────────────────────
 *
 * The site already has a "Send your experience" WhatsApp button pointed at the
 * yard. When a customer replies:
 *   1. Ask permission to publish their words, their name and their village.
 *   2. Keep their wording. Do not tidy it into marketing English.
 *   3. Add an entry below. Telugu speakers usually write in Telugu: put their
 *      actual words in `te` and a faithful translation in `en`.
 *   4. `date` is when they said it, not when you added it.
 *
 * Four honest, specific, slightly awkward quotes from named local people will
 * out-convert forty polished anonymous ones.
 */

export interface Testimonial {
  /** Full name, as they want it shown. */
  name: string;
  /** Village or town. This is what makes it credible to a local buyer. */
  place: string;
  /** Optional: "Contractor", "Mason", "Homeowner". */
  role?: T;
  /** What they built, e.g. "Two-storey house, 2023". */
  built?: T;
  /** Their words. Keep their phrasing. */
  quote: T;
  /** ISO date (YYYY-MM-DD) of when they said it. */
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [];
