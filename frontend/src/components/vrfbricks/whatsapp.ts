import { BUSINESS, formattedAddress } from "@/data/vrfbricks/business";

/**
 * WhatsApp is the primary conversion path on this site.
 *
 * In the construction materials trade in coastal Andhra, an enquiry is a
 * WhatsApp message with a brick type, a quantity and a village name — not a
 * web form. The original site posted into a Google Form behind a hidden
 * iframe, which gave the buyer no confirmation and the proprietor no record he
 * controlled. wa.me lands the message directly on his phone, works offline
 * once composed, and leaves the buyer holding a copy of what they sent.
 */

export interface QuoteFields {
  name?: string;
  brick?: string;
  qty?: string;
  place?: string;
  need?: string;
  notes?: string;
  /** Opening line, already in the visitor's language. */
  intro: string;
}

/**
 * Build a wa.me deep link. Only fields the visitor actually filled in are
 * included, so a half-filled form still produces a clean, readable message
 * rather than a list of blank labels.
 */
export function waLink(fields: QuoteFields): string {
  const lines: string[] = [fields.intro, ""];

  const add = (label: string, value?: string) => {
    const v = value?.trim();
    if (v) lines.push(`${label}: ${v}`);
  };

  add("Brick", fields.brick);
  add("Quantity", fields.qty);
  add("Location", fields.place);
  add("Needed by", fields.need);
  add("Name", fields.name);
  add("Notes", fields.notes);

  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    lines.join("\n").trim(),
  )}`;
}

/** A bare WhatsApp link with just an opening line — for header/footer CTAs. */
export function waSimple(intro: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(intro)}`;
}

export const telLink = `tel:${BUSINESS.phone}`;

/**
 * Google Maps directions to the yard.
 *
 * Sends the ADDRESS as the destination rather than a latitude/longitude pair.
 * The coordinates previously used here were only accurate to Kavali town
 * centre, so "Get directions" could route a customer with a loaded truck to
 * roughly the right town and the wrong end of it. An address string lets Maps
 * resolve the business itself where it is listed, and geocode the street
 * otherwise, which is both more accurate today and self-correcting once the
 * yard has a Google Business Profile.
 */
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  formattedAddress(),
)}`;
