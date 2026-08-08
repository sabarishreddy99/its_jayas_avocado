"use client";

import VRFLink from "@/components/vrfbricks/VRFLink";
import { NAV, COPY } from "@/data/vrfbricks/copy";
import { BUSINESS } from "@/data/vrfbricks/business";
import { useLang } from "@/components/vrfbricks/VRFLang";
import { Section, Eyebrow, CallButton, WhatsAppButton, SERIF } from "@/components/vrfbricks/VRFUi";
import { telLink, waSimple } from "@/components/vrfbricks/whatsapp";

/**
 * The VRF 404 body. Rendered both by Next's not-found convention in dev and,
 * in production, by nginx as this subdomain's `error_page 404` (see
 * infra/nginx/vrfbricks.conf) via the /404/ route that re-exports this.
 *
 * A dead end on a supplier's site should still end in a phone number, so the
 * recovery here is the full nav plus both ways to reach the yard.
 */
export default function VRFNotFound() {
  const { t } = useLang();

  return (
    <Section className="py-20 sm:py-28">
      <div className="max-w-2xl">
        <Eyebrow>404</Eyebrow>
        <h1
          className="text-[2.2rem] font-light leading-[1.05] text-fg sm:text-[3rem]"
          style={{ fontFamily: SERIF }}
        >
          {t(COPY.notFound.h1)}
        </h1>
        <p className="mt-5 text-[1.08rem] leading-relaxed text-fg-muted">
          {t(COPY.notFound.body)}
        </p>

        <nav className="mt-8 grid gap-px bg-border-subtle sm:grid-cols-2">
          {NAV.map((item) => (
            <VRFLink
              key={item.href}
              href={item.href}
              className="bg-surface px-5 py-4 text-[1rem] font-medium text-fg no-underline hover:text-accent"
            >
              {t(item.label)}
            </VRFLink>
          ))}
        </nav>

        <div className="mt-10 flex flex-wrap gap-3">
          <WhatsAppButton href={waSimple(t(COPY.quote.msgIntro))}>
            {t(COPY.common.getQuote)}
          </WhatsAppButton>
          <CallButton href={telLink}>{BUSINESS.phoneDisplay}</CallButton>
        </div>
      </div>
    </Section>
  );
}
