"use client";

import { COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import { PhoneIcon, WhatsAppIcon } from "./VRFUi";
import { telLink, waSimple } from "./whatsapp";

/**
 * A fixed two-button bar at the bottom of the viewport on phones.
 *
 * Most of this site's traffic is a contractor or a homeowner on a phone, and
 * the only two things they ever need to do are call or message. Keeping both
 * one thumb-reach away at all times beats making them scroll back to a CTA.
 *
 * Hidden from `sm:` up, where the header CTA is always visible anyway.
 */
export default function VRFStickyBar() {
  const { t } = useLang();

  return (
    <>
      {/* Spacer so the fixed bar never covers the last line of the footer.
          Stated as one explicit height rather than leaning on padding collapse:
          the bar is ~3.25rem tall, plus whatever the device reserves below it. */}
      <div
        aria-hidden="true"
        className="sm:hidden"
        style={{ height: "calc(3.5rem + env(safe-area-inset-bottom))" }}
      />

      <div
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t sm:hidden"
        style={{
          borderColor: "var(--border-strong)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <a
          href={telLink}
          className="flex items-center justify-center gap-2 bg-fg py-3.5 text-[0.92rem] font-bold text-bg no-underline"
        >
          <PhoneIcon className="h-[1.05em] w-[1.05em]" />
          {t(COPY.common.callNow)}
        </a>
        <a
          href={waSimple(t(COPY.quote.msgIntro))}
          target="_blank"
          rel="noopener noreferrer"
          className="vrf-btn-wa flex items-center justify-center gap-2 py-3.5 text-[0.92rem] font-bold text-white no-underline"
        >
          <WhatsAppIcon className="h-[1.1em] w-[1.1em]" />
          {t(COPY.common.whatsapp)}
        </a>
      </div>
    </>
  );
}
