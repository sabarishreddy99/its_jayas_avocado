"use client";

import { TESTIMONIALS } from "@/data/vrfbricks/testimonials";
import { COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import { Section, Chapter, Headline, WhatsAppButton, ShieldIcon } from "./VRFUi";
import { waSimple } from "./whatsapp";

/**
 * What customers say.
 *
 * Renders real testimonials when there are any, and an honest empty state when
 * there are none. It is currently the empty state, because no verified quotes
 * exist yet: see data/vrfbricks/testimonials.ts, which explains at length why
 * that array must never be filled with invented ones.
 *
 * The empty state is not an apology. Saying "we would rather show you nothing
 * than show you something invented, here is a real customer's phone number
 * instead" is a stronger trust signal than a wall of anonymous five-star
 * quotes, and it is the only version of this section that is true.
 */
export default function VRFTestimonials({ chapter }: { chapter?: string }) {
  const { t } = useLang();
  const has = TESTIMONIALS.length > 0;

  return (
    <Section className="py-20 sm:py-28" bond={!has}>
      {chapter && <Chapter index={chapter} label={t(COPY.chapters.people)} />}

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <Headline>{t(COPY.testimonials.title)}</Headline>
        <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-fg-muted">
          {has ? t(COPY.testimonials.lede) : ""}
        </p>
      </div>

      {has ? (
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li
              key={`${item.name}-${item.date}`}
              className="flex flex-col rounded-2xl bg-surface ring-1 ring-border p-7"
            >
              <blockquote className="flex-1">
                <p className="text-[1.05rem] leading-[1.7] text-fg-muted">
                  &ldquo;{t(item.quote)}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-6 border-t border-border-subtle pt-4">
                <p className="font-semibold text-fg">{item.name}</p>
                <p className="mt-0.5 text-[0.85rem] text-fg-subtle">
                  {item.place}
                  {item.role ? `, ${t(item.role)}` : ""}
                </p>
                {item.built && (
                  <p className="mt-1 text-[0.8rem] text-fg-faint">
                    {t(COPY.testimonials.built)}: {t(item.built)}
                  </p>
                )}
              </footer>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-surface ring-1 ring-border p-8 text-center sm:p-10">
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent-light text-accent">
            <ShieldIcon className="h-6 w-6" />
          </span>
          <h3
            className="text-[1.3rem] font-light leading-snug text-fg sm:text-[1.6rem]"
            style={{ fontFamily: "var(--font-cormorant), var(--font-vrf-telugu), Georgia, serif" }}
          >
            {t(COPY.testimonials.emptyTitle)}
          </h3>
          <p className="mt-4 text-[1rem] leading-[1.75] text-fg-muted">
            {t(COPY.testimonials.emptyBody)}
          </p>
          <div className="mt-7 flex justify-center">
            <WhatsAppButton href={waSimple(t(COPY.quote.msgRef))}>
              {t(COPY.testimonials.askForRefs)}
            </WhatsAppButton>
          </div>
        </div>
      )}

      {/* The collection prompt. This is how the array above eventually fills. */}
      <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 border-t border-border-subtle pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-fg">{t(COPY.testimonials.leaveTitle)}</p>
          <p className="mt-1 max-w-md text-[0.92rem] leading-relaxed text-fg-subtle">
            {t(COPY.testimonials.leaveBody)}
          </p>
        </div>
        <a
          href={waSimple(t(COPY.quote.msgReview))}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[0.9rem] font-bold text-accent no-underline hover:text-accent-hover"
        >
          {t(COPY.testimonials.leaveCta)} &rarr;
        </a>
      </div>
    </Section>
  );
}
