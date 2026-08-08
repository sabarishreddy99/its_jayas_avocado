"use client";

import { useState } from "react";
import { FAQ, COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import { Section, Chapter, Headline } from "./VRFUi";

/**
 * The visible FAQ.
 *
 * This exists for a correctness reason as much as a UX one: Google's FAQPage
 * structured data requires the answer to be visible on the page it is marked
 * up on. The pages were emitting FAQ schema without rendering the questions,
 * which is exactly the mismatch that gets rich results suppressed. Both the
 * schema and this component now read the same array in copy.ts, filtered by
 * page, so they cannot drift apart.
 *
 * Native <details> rather than a JS accordion: it is keyboard accessible for
 * free, it is findable by the browser's own in-page search even while closed,
 * and it costs no JavaScript.
 */
export default function VRFFaq({
  page,
  chapter,
}: {
  page: "home" | "bricks" | "why" | "delivery";
  chapter?: string;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  const items = FAQ.filter((f) => f.pages.includes(page));

  if (items.length === 0) return null;

  return (
    <Section className="py-20 sm:py-28">
      {chapter && <Chapter index={chapter} label={t(COPY.chapters.answers)} />}

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <Headline>{t(COPY.faq.title)}</Headline>
        <p className="mt-4 text-[1.02rem] text-fg-muted">{t(COPY.faq.lede)}</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border-subtle border-y border-border-subtle">
        {items.map((item) => {
          const id = item.q.en;
          return (
            <details
              key={id}
              open={open === id}
              onToggle={(e) => setOpen(e.currentTarget.open ? id : null)}
              className="group"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.05rem] font-semibold leading-snug text-fg">
                  {t(item.q)}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" className="h-5 w-5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[0.98rem] leading-[1.75] text-fg-muted">
                {t(item.a)}
              </p>
            </details>
          );
        })}
      </div>
    </Section>
  );
}
