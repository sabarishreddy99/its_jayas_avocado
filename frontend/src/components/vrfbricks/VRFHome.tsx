"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS, BRICKS, FOUNDED_YEAR, yearsInBusiness, fmtHour } from "@/data/vrfbricks/business";
import { COPY, PROCESS } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import VRFLink from "./VRFLink";
import BrickDiagram from "./BrickDiagram";
import VRFPhoto, { PHOTOS } from "./VRFPhoto";
import VRFTestimonials from "./VRFTestimonials";
import VRFFaq from "./VRFFaq";
import {
  Section, Inner, Chapter, Headline, Eyebrow, WhatsAppButton, CallButton, TextLink,
  PinIcon, ClockIcon, TruckIcon, CheckIcon, ShieldIcon, SERIF,
} from "./VRFUi";
import { waSimple, telLink, directionsLink } from "./whatsapp";

/**
 * The home page, told in acts.
 *
 * Structure mirrors the portfolio and gradeVITian: numbered chapter markers,
 * Cormorant headlines, ScrollReveal on entry, one idea per act. The order is
 * chosen for a buyer who has never heard of this yard and has to decide whether
 * to trust it with the walls of their house:
 *
 *   01 The Yard          who we are, and the one real photograph
 *   02 How We Make It    the process, because "pressed not fired" is the story
 *   03 The Bricks        what you can actually buy
 *   04 Quality           how a batch is kept good
 *   05 Trust             what we promise, what we will not claim, safe handling
 *   06 Our Customers     what people say (honest empty state until real quotes)
 *   07 Answers           the questions asked on the phone every day
 *   08 Come and See      address, hours, and the two ways to reach us
 */
export default function VRFHome() {
  const { t, lang } = useLang();
  const years = yearsInBusiness();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────
          The stretcher bond sits behind the type, masked to a soft ellipse, in
          the same role HeroDotGrid plays on the portfolio: a quiet texture that
          says what kind of place this is before a word is read. */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="vrf-bond pointer-events-none absolute inset-0" />
        <Inner className="relative py-16 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>{t(COPY.home.eyebrow)}</Eyebrow>
            <h1
              className="text-[2.6rem] font-light leading-[1.02] tracking-[-0.015em] text-fg sm:text-[3.8rem] lg:text-[4.4rem]"
              style={{ fontFamily: SERIF }}
            >
              {t(COPY.home.h1)}
            </h1>
            <p className="mt-5 text-[0.95rem] font-bold uppercase tracking-[0.24em] text-accent">
              {t(COPY.home.tagline)}
            </p>
            <p className="mt-7 max-w-2xl text-[1.1rem] leading-[1.75] text-fg-muted sm:text-[1.18rem]">
              {t(COPY.home.lede)}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <WhatsAppButton href={waSimple(t(COPY.quote.msgIntro))}>
                {t(COPY.common.getQuoteLong)}
              </WhatsAppButton>
              <CallButton href={telLink}>{BUSINESS.phoneDisplay}</CallButton>
            </div>

            {/* Facts, not adjectives. Every number here is verifiable. */}
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              {[
                { k: `${t(COPY.common.since)} ${FOUNDED_YEAR}`, v: `${years}`, s: t(COPY.common.years) },
                { k: t(COPY.home.bricksTitle), v: `${BRICKS.length}`, s: t(COPY.bricks.bricksUnit) },
                { k: t(COPY.common.openDaily), v: fmtHour(BUSINESS.hours.opens, lang), s: `${t(COPY.common.to)} ${fmtHour(BUSINESS.hours.closes, lang)}` },
              ].map((stat) => (
                // A <dl> group must be dt-then-dd in the DOM; the value reads
                // better on top, so the order is flipped visually only.
                <div key={stat.k} className="flex flex-col-reverse">
                  <dt className="mt-2 text-nano font-bold uppercase tracking-[0.18em] text-fg-subtle">
                    {stat.k}
                  </dt>
                  <dd className="flex items-baseline gap-1.5">
                    <span className="text-[2.4rem] font-light leading-none text-fg" style={{ fontFamily: SERIF }}>
                      {stat.v}
                    </span>
                    <span className="text-[0.85rem] text-fg-subtle">{stat.s}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Inner>
      </section>

      {/* ── 01 The Yard ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        {/* The one real photograph of this business, shown at its true 1152x464
            proportions and never scaled beyond its own resolution. */}
        <VRFPhoto
          photo={PHOTOS.yard}
          size="wide"
          priority
          alt="Rows of freshly pressed bricks curing in the open at the VRF Bricks yard in Kavali, with the pan mixer and a loaded tipper truck behind them."
          caption={COPY.home.yardCaption}
        />
      </ScrollReveal>

      <Section className="py-20 sm:py-28">
        <Chapter index="01" label={t(COPY.chapters.yard)} />
        <ScrollReveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Headline>{t(COPY.home.storyTitle)}</Headline>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[1.1rem] leading-[1.8] text-fg-muted">{t(COPY.home.storyBody)}</p>
              <div className="vrf-joint my-8" aria-hidden="true" />
              <TextLink href="/why-fly-ash/">{t(COPY.why.h1)}</TextLink>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-border-subtle sm:grid-cols-2">
          {COPY.home.why.map((w, i) => (
            <ScrollReveal key={w.title.en} delay={i * 70} className="bg-bg">
              <div className="h-full bg-surface p-7 sm:p-8">
                <span className="text-nano font-bold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.2rem] font-semibold leading-snug text-fg">
                  {t(w.title)}
                </h3>
                <p className="mt-3 text-[0.97rem] leading-[1.7] text-fg-muted">{t(w.body)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── 02 How We Make It ────────────────────────────────────────────── */}
      <Section bond className="py-20 sm:py-28">
        <Chapter index="02" label={t(COPY.chapters.make)} />
        <ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Headline>{t(COPY.home.processTitle)}</Headline>
          </div>
        </ScrollReveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 80}>
              <li className="h-full rounded-2xl bg-surface ring-1 ring-border p-6">
                <span
                  className="block text-[2.6rem] font-light leading-none text-border-strong"
                  style={{ fontFamily: SERIF }}
                >
                  {step.n}
                </span>
                <h3 className="mt-3 text-[1.1rem] font-semibold text-fg">{t(step.title)}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-[1.7] text-fg-muted">{t(step.body)}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      <ScrollReveal>
        <VRFPhoto
          photo={PHOTOS.curing}
          className="mt-16"
          alt="Rows of newly made bricks stacked in the open air to cure at a brickworks in India."
          caption={{
            en: "Curing in the open air. Illustrative photograph of an Indian brickworks, not our yard.",
            te: "బహిరంగ ప్రదేశంలో క్యూరింగ్. భారతీయ ఇటుక తయారీ కేంద్రం యొక్క ఉదాహరణ చిత్రం, మా ప్రాంగణం కాదు.",
          }}
        />
      </ScrollReveal>

      {/* ── 03 The Bricks ────────────────────────────────────────────────── */}
      <Section className="py-20 sm:py-28">
        <Chapter index="03" label={t(COPY.chapters.product)} />
        <ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Headline>{t(COPY.home.bricksTitle)}</Headline>
            <p className="mt-4 text-[1.02rem] text-fg-muted">{t(COPY.home.bricksLede)}</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BRICKS.map((b, i) => (
            <ScrollReveal key={b.id} delay={i * 80}>
              <VRFLink
                href="/bricks/"
                className="flex h-full flex-col rounded-2xl bg-surface ring-1 ring-border p-6 no-underline transition-colors hover:border-accent"
              >
                <div className="mb-5 rounded-xl bg-surface-sunken p-4">
                  <BrickDiagram brick={b} />
                </div>
                <h3 className="text-[1.12rem] font-semibold leading-snug text-fg">{t(b.name)}</h3>
                <p className="mt-1 text-nano font-bold uppercase tracking-[0.14em] text-accent">
                  {t(b.trade)}
                </p>
                <p className="mt-3 flex-1 text-[0.93rem] leading-[1.7] text-fg-muted">{t(b.use)}</p>
                {b.madeToOrder && (
                  <p className="mt-4 inline-flex w-fit rounded-full bg-accent-light px-2.5 py-1 text-nano font-bold uppercase tracking-[0.12em] text-accent">
                    {t(COPY.bricks.madeToOrder)}
                  </p>
                )}
              </VRFLink>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <TextLink href="/bricks/">{t(COPY.home.seeAllBricks)}</TextLink>
        </div>
      </Section>

      {/* ── 04 Quality ───────────────────────────────────────────────────── */}
      <Section bond className="py-20 sm:py-28">
        <Chapter index="04" label={t(COPY.chapters.quality)} />
        <ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Headline>{t(COPY.quality.title)}</Headline>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-fg-muted">
              {t(COPY.quality.lede)}
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {COPY.quality.points.map((p, i) => (
            <ScrollReveal key={p.title.en} delay={i * 70}>
              <div className="flex h-full gap-4 rounded-2xl bg-surface ring-1 ring-border p-6">
                <span className="mt-0.5 shrink-0 text-accent">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.08rem] font-semibold leading-snug text-fg">
                    {t(p.title)}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.7] text-fg-muted">{t(p.body)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── 05 Trust and safety ──────────────────────────────────────────── */}
      <Section className="py-20 sm:py-28">
        <Chapter index="05" label={t(COPY.chapters.trust)} />
        <ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Headline>{t(COPY.trust.title)}</Headline>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-fg-muted">{t(COPY.trust.lede)}</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* What you can hold us to */}
          <ScrollReveal>
            <div className="h-full rounded-2xl border-l-2 border-accent bg-surface p-7">
              <h3 className="text-nano font-bold uppercase tracking-[0.18em] text-accent">
                {t(COPY.trust.doTitle)}
              </h3>
              <ul className="mt-5 space-y-4">
                {COPY.trust.promises.map((p) => (
                  <li key={p.en} className="flex gap-3">
                    <span className="mt-1 shrink-0 text-accent">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-[0.97rem] leading-[1.7] text-fg-muted">{t(p)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* What we will not pretend. A supplier who volunteers their limits
              is the one worth believing on everything else. */}
          <ScrollReveal delay={90}>
            <div className="h-full rounded-2xl border border-dashed border-border p-7">
              <h3 className="text-nano font-bold uppercase tracking-[0.18em] text-fg-subtle">
                {t(COPY.trust.dont)}
              </h3>
              <ul className="mt-5 space-y-4">
                {COPY.trust.disclaimers.map((d) => (
                  <li key={d.en} className="text-[0.97rem] leading-[1.7] text-fg-muted">
                    {t(d)}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Safe handling */}
        <ScrollReveal>
          <div className="mt-14">
            <div className="flex items-center gap-3">
              <span className="text-accent">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <h3 className="text-[1.25rem] font-semibold text-fg">{t(COPY.trust.safetyTitle)}</h3>
            </div>
            <div className="mt-6 grid gap-px bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
              {COPY.trust.safety.map((s) => (
                <div key={s.title.en} className="bg-surface p-6">
                  <h4 className="text-[0.98rem] font-semibold leading-snug text-fg">
                    {t(s.title)}
                  </h4>
                  <p className="mt-2 text-[0.9rem] leading-[1.65] text-fg-muted">{t(s.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── 06 Our Customers ─────────────────────────────────────────────── */}
      <VRFTestimonials chapter="06" />

      {/* ── 07 Answers ───────────────────────────────────────────────────── */}
      <VRFFaq page="home" chapter="07" />

      {/* ── 08 Come and See ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <VRFPhoto
          photo={PHOTOS.mason}
          alt="A mason in a hard hat holding a trowel, bedding bricks into mortar along a string line on a sunlit site in India."
          caption={{
            en: "Illustrative photograph of masonry work in India, not our yard.",
            te: "భారతదేశంలో ఇటుక పని యొక్క ఉదాహరణ చిత్రం, మా ప్రాంగణం కాదు.",
          }}
        />
      </ScrollReveal>

      <Section className="py-20 sm:py-28">
        <Chapter index="08" label={t(COPY.chapters.visit)} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-7">
            <Headline>{t(COPY.home.trustTitle)}</Headline>
            <p className="mt-5 text-[1.06rem] leading-[1.8] text-fg-muted">
              {t(COPY.home.trustBody)}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <WhatsAppButton href={waSimple(t(COPY.quote.msgIntro))}>
                {t(COPY.common.getQuote)}
              </WhatsAppButton>
              <CallButton href={telLink}>{t(COPY.common.callNow)}</CallButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90} className="lg:col-span-5">
            <aside className="rounded-2xl bg-surface ring-1 ring-border p-7">
              <dl className="space-y-6 text-[0.95rem]">
                <div className="flex gap-3.5">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold text-fg">{t(COPY.visit.addressTitle)}</dt>
                    <dd className="mt-1 leading-relaxed text-fg-muted">
                      {BUSINESS.address.street}
                      <br />
                      {BUSINESS.address.locality}
                      <br />
                      {BUSINESS.address.region} {BUSINESS.address.postalCode}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold text-fg">{t(COPY.visit.hoursTitle)}</dt>
                    <dd className="mt-1 text-fg-muted">
                      {BUSINESS.hours.days}
                      <br />
                      {fmtHour(BUSINESS.hours.opens, lang)} {t(COPY.common.to)} {fmtHour(BUSINESS.hours.closes, lang)}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <TruckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold text-fg">{t(COPY.delivery.h1)}</dt>
                    <dd className="mt-1 leading-relaxed text-fg-muted">{t(COPY.delivery.lede)}</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-border-subtle pt-5">
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9rem] font-bold text-accent no-underline hover:text-accent-hover"
                >
                  {t(COPY.common.directions)} &rarr;
                </a>
                <TextLink href="/visit/">{t(COPY.visit.h1)}</TextLink>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
