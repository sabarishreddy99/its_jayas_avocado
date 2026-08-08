"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { BRICKS, toMm, toCm, toFt } from "@/data/vrfbricks/business";
import { COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import BrickDiagram from "./BrickDiagram";
import BrickCalculator from "./BrickCalculator";
import VRFFaq from "./VRFFaq";
import VRFPhoto, { PHOTOS } from "./VRFPhoto";
import { Section, Inner, Chapter, Headline, Eyebrow, WhatsAppButton, SERIF } from "./VRFUi";
import { waLink } from "./whatsapp";

export default function VRFBricksPage() {
  const { t, lang } = useLang();
  const nf = new Intl.NumberFormat(lang === "te" ? "te-IN" : "en-IN");

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
              {t(COPY.bricks.h1)}
            </h1>
            <p className="mt-6 text-[1.08rem] leading-[1.75] text-fg-muted">{t(COPY.bricks.lede)}</p>
          </div>
        </Inner>
      </section>

      <ScrollReveal>
        <VRFPhoto
          photo={PHOTOS.stacks}
          className="mb-16"
          alt="Thousands of solid grey cement bricks stood in rows across an open yard."
          caption={{
            en: "Solid cement bricks stood in rows. Illustrative photograph.",
            te: "వరుసలుగా నిలబెట్టిన సాలిడ్ సిమెంట్ ఇటుకలు. ఉదాహరణ చిత్రం.",
          }}
        />
      </ScrollReveal>

      {/* One block per brick: drawing on one side, numbers on the other. */}
      <Section className="pb-16 sm:pb-24">
        <div className="space-y-6">
          {BRICKS.map((b) => {
            const rows = [
              { label: t(COPY.bricks.length), inches: b.inches.l },
              { label: t(COPY.bricks.width), inches: b.inches.w },
              { label: t(COPY.bricks.height), inches: b.inches.h },
            ];

            return (
              <ScrollReveal key={b.id}>
                <article
                  id={b.id}
                  className="grid gap-8 rounded-2xl bg-surface ring-1 ring-border p-6 sm:p-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div className="lg:col-span-5">
                    <div className="rounded-xl bg-surface-sunken p-5">
                      <BrickDiagram brick={b} />
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2
                          className="text-[1.6rem] font-light leading-tight text-fg sm:text-[1.9rem]"
                          style={{ fontFamily: SERIF }}
                        >
                          {t(b.name)}
                        </h2>
                        <p className="mt-1 text-nano font-bold uppercase tracking-[0.16em] text-accent">
                          {t(b.trade)}
                        </p>
                      </div>
                      {b.madeToOrder && (
                        <span className="rounded-full bg-accent-light px-3 py-1.5 text-nano font-bold uppercase tracking-[0.12em] text-accent">
                          {t(COPY.bricks.madeToOrder)}
                        </span>
                      )}
                    </div>

                    {/* Dimensions in every unit a buyer might think in. The trade
                        talks in inches, drawings are in mm, and older masons still
                        quote feet. Giving all three removes a conversion step. */}
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full min-w-[380px] border-collapse text-[0.93rem]">
                        <caption className="sr-only">
                          {t(COPY.bricks.dimensions)}, {t(b.name)}
                        </caption>
                        <thead>
                          <tr className="text-fg-subtle">
                            <th scope="col" className="pb-2 text-left text-nano font-bold uppercase tracking-[0.13em]">
                              {t(COPY.bricks.dimensions)}
                            </th>
                            {["in", "mm", "cm", "ft"].map((u) => (
                              <th key={u} scope="col" className="pb-2 text-right text-nano font-bold uppercase tracking-[0.13em]">
                                {u}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r) => (
                            <tr key={r.label} className="border-t border-border-subtle">
                              <th scope="row" className="py-2.5 text-left font-medium text-fg">
                                {r.label}
                              </th>
                              <td className="py-2.5 text-right font-semibold tabular-nums text-fg">
                                {r.inches}
                              </td>
                              <td className="py-2.5 text-right tabular-nums text-fg-muted">
                                {toMm(r.inches)}
                              </td>
                              <td className="py-2.5 text-right tabular-nums text-fg-muted">
                                {toCm(r.inches)}
                              </td>
                              <td className="py-2.5 text-right tabular-nums text-fg-muted">
                                {toFt(r.inches)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h3 className="text-nano font-bold uppercase tracking-[0.14em] text-fg-subtle">
                          {t(COPY.bricks.bestFor)}
                        </h3>
                        <p className="mt-1.5 text-[0.95rem] leading-[1.7] text-fg-muted">
                          {t(b.use)}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-nano font-bold uppercase tracking-[0.14em] text-fg-subtle">
                          {b.perTruck ? t(COPY.bricks.perTruck) : t(COPY.bricks.madeToOrder)}
                        </h3>
                        <p className="mt-1.5 text-[0.95rem] leading-[1.7] text-fg-muted">
                          {b.perTruck ? (
                            <>
                              <span
                                className="text-[1.6rem] font-light tabular-nums text-fg"
                                style={{ fontFamily: SERIF }}
                              >
                                {nf.format(b.perTruck)}
                              </span>{" "}
                              {t(COPY.bricks.bricksUnit)}
                            </>
                          ) : (
                            t(COPY.bricks.madeToOrderNote)
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7">
                      <WhatsAppButton
                        href={waLink({
                          intro: t(COPY.quote.msgIntro),
                          brick: `${b.name.en} (${b.inches.l}x${b.inches.w}x${b.inches.h} in)`,
                        })}
                      >
                        {t(COPY.common.getQuote)}
                      </WhatsAppButton>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Why there is no price list. Said plainly rather than left as a gap
            the visitor has to wonder about. */}
        <ScrollReveal>
          <div className="mt-8 rounded-2xl border-l-2 border-accent bg-accent-light p-6">
            <p className="text-[1rem] leading-[1.75] text-fg-muted">{t(COPY.bricks.priceNote)}</p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      <Section bond className="py-16 sm:py-24" id="calculator">
        <Chapter index="01" label={t(COPY.chapters.product)} />
        <ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Headline>{t(COPY.bricks.calcTitle)}</Headline>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-fg-muted">
              {t(COPY.bricks.calcLede)}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <BrickCalculator />
          </div>
        </ScrollReveal>
      </Section>

      <VRFFaq page="bricks" chapter="02" />
    </>
  );
}
