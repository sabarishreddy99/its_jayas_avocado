"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { BUSINESS, FOUNDED_YEAR, yearsInBusiness, fmtHours, mapEmbedUrl } from "@/data/vrfbricks/business";
import { COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import QuoteComposer from "./QuoteComposer";
import VRFTestimonials from "./VRFTestimonials";
import {
  Section, Inner, Chapter, Headline, Eyebrow, PinIcon, ClockIcon, PhoneIcon, SERIF,
} from "./VRFUi";
import { directionsLink, telLink } from "./whatsapp";

export default function VRFVisitPage() {
  const { t, lang } = useLang();
  const { address, hours } = BUSINESS;

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="vrf-bond pointer-events-none absolute inset-0" />
        <Inner className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Eyebrow>{t(COPY.home.eyebrow)}</Eyebrow>
            <h1
              className="text-[2.3rem] font-light leading-[1.05] tracking-[-0.015em] text-fg sm:text-[3.2rem]"
              style={{ fontFamily: SERIF }}
            >
              {t(COPY.visit.h1)}
            </h1>
            <p className="mt-6 text-[1.12rem] leading-[1.75] text-fg-muted">{t(COPY.visit.lede)}</p>
          </div>
        </Inner>
      </section>

      {/* ── Details and map ────────────────────────────────────────────── */}
      <Section className="py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5">
            <div className="h-full rounded-2xl bg-surface ring-1 ring-border p-7">
              <dl className="space-y-7 text-[0.98rem]">
                <div className="flex gap-3.5">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold text-fg">{t(COPY.visit.addressTitle)}</dt>
                    <dd className="mt-1.5 leading-relaxed text-fg-muted">
                      <address className="not-italic">
                        {address.street}
                        <br />
                        {address.locality}
                        <br />
                        {address.region} {address.postalCode}
                      </address>
                      <a
                        href={directionsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-block font-bold text-accent no-underline hover:text-accent-hover"
                      >
                        {t(COPY.common.directions)} &rarr;
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold text-fg">{t(COPY.visit.hoursTitle)}</dt>
                    <dd className="mt-1.5 text-fg-muted">
                      {hours.days}
                      <br />
                      <span
                        className="text-[1.5rem] font-light text-fg"
                        style={{ fontFamily: SERIF }}
                      >
                        {fmtHours(lang)}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold text-fg">{t(COPY.common.proprietor)}</dt>
                    <dd className="mt-1.5 text-fg-muted">
                      {BUSINESS.proprietor}
                      <br />
                      <a
                        href={telLink}
                        className="text-[1.1rem] font-bold text-accent no-underline hover:text-accent-hover"
                      >
                        {BUSINESS.phoneDisplay}
                      </a>
                      <br />
                      <span className="text-[0.88rem] text-fg-subtle">
                        {t(COPY.common.since)} {FOUNDED_YEAR} · {yearsInBusiness()}{" "}
                        {t(COPY.common.years)}
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          {/* The map is lazy-loaded: it is a third-party iframe and it must not
              block the address above it, which is the thing people came for. */}
          <ScrollReveal delay={90} className="lg:col-span-7">
            <h2 className="sr-only">{t(COPY.visit.mapTitle)}</h2>
            <iframe
              src={mapEmbedUrl()}
              title={t(COPY.visit.mapTitle)}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full rounded-2xl ring-1 ring-border lg:h-full lg:min-h-[430px]"
            />
          </ScrollReveal>
        </div>
      </Section>

      {/* ── Enquiry ────────────────────────────────────────────────────── */}
      <Section bond className="py-16 sm:py-24">
        <Chapter index="01" label={t(COPY.chapters.visit)} />
        <ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Headline>{t(COPY.quote.title)}</Headline>
            <p className="mt-4 text-[1.04rem] leading-relaxed text-fg-muted">
              {t(COPY.visit.contactBody)}
            </p>
            <p className="mt-3 text-[0.9rem] text-fg-subtle">{t(COPY.quote.lede)}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <QuoteComposer />
          </div>
        </ScrollReveal>
      </Section>

      <VRFTestimonials chapter="02" />
    </>
  );
}
