"use client";

import { useEffect, useState } from "react";
import { COPY } from "@/data/vrfbricks/copy";
import { BUSINESS } from "@/data/vrfbricks/business";
import { useLang } from "./VRFLang";
import { PhoneIcon, WhatsAppIcon } from "./VRFUi";
import { telLink, waSimple } from "./whatsapp";

/**
 * The floating contact control on phones and tablets.
 *
 * This replaces a full-bleed two-tone bar pinned across the bottom of the
 * screen, half of it in WhatsApp green. That read as an advertisement bolted
 * onto the page rather than part of it, which is the opposite of what a
 * supplier's site needs to convey: everything here is trying to say "this is a
 * real yard run by a named man", and a banner that looks like a lead-generation
 * widget undoes that in one glance.
 *
 * The replacement follows the pattern the portfolio already uses for its mobile
 * FAB: a small control floating bottom-right, glassy, hairline ring, soft
 * shadow, well clear of the content. It is a single rounded container rather
 * than two separate buttons so it reads as one deliberate object.
 *
 * Behaviour notes:
 *   - It appears only after the hero has scrolled away. Near the top of the
 *     page the hero's own Call and WhatsApp buttons are on screen, and stacking
 *     a floating copy on top of them is just clutter.
 *   - Desktop is excluded: the nav keeps a visible WhatsApp CTA and the phone
 *     number in its contact strip, and the nav returns the moment you scroll up.
 */
export default function VRFContactFab() {
  const { t } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 lg:hidden ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      } transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="flex items-center gap-1 rounded-full bg-surface/95 p-1 ring-1 ring-border backdrop-blur-[14px] [box-shadow:0_12px_36px_-10px_rgb(0_0_0/0.20),0_4px_12px_-4px_rgb(0_0_0/0.10)] dark:[box-shadow:0_12px_36px_-10px_rgb(0_0_0/0.6),0_4px_12px_-4px_rgb(0_0_0/0.4)]"
      >
        {/* Call. Quiet, because the number is also in the nav's contact strip,
            but present because plenty of this audience would rather ring. */}
        <a
          href={telLink}
          aria-label={`${t(COPY.common.callNow)}, ${BUSINESS.phoneDisplay}`}
          className="flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-raised"
        >
          <PhoneIcon className="h-[18px] w-[18px]" />
        </a>

        <span aria-hidden className="h-6 w-px bg-border" />

        {/* WhatsApp, the primary channel, so it carries the label. Ink rather
            than WhatsApp green: the glyph already says which app this opens,
            and the brand green at this size is what made the old bar look like
            an ad rather than part of the site. */}
        <a
          href={waSimple(t(COPY.quote.msgIntro))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center gap-2 rounded-full bg-fg pl-3.5 pr-4 text-[0.85rem] font-medium text-bg no-underline transition-opacity hover:opacity-80"
        >
          <WhatsAppIcon className="h-[17px] w-[17px]" />
          {t(COPY.common.getQuote)}
        </a>
      </div>
    </div>
  );
}
