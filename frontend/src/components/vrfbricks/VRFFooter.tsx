"use client";

import VRFLink from "./VRFLink";
import { BUSINESS, FOUNDED_YEAR, BUILD_YEAR, yearsInBusiness, fmtHours } from "@/data/vrfbricks/business";
import { NAV, COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import { PhoneIcon, PinIcon, ClockIcon, WhatsAppIcon, SERIF } from "./VRFUi";
import { telLink, waSimple, directionsLink } from "./whatsapp";

export default function VRFFooter() {
  const { t, lang } = useLang();
  const { address } = BUSINESS;

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="lg:col-span-2">
            <p
              className="text-[1.5rem] font-light leading-tight text-fg"
              style={{ fontFamily: SERIF }}
            >
              {BUSINESS.name}
            </p>
            <p className="mt-2 text-nano font-bold uppercase tracking-[0.2em] text-accent">
              {t(COPY.home.tagline)}
            </p>
            <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-fg-muted">
              {t(COPY.common.proprietor)}:{" "}
              <span className="font-semibold text-fg">{BUSINESS.proprietor}</span>
              <br />
              {t(COPY.common.since)} {FOUNDED_YEAR} · {yearsInBusiness()} {t(COPY.common.years)}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waSimple(t(COPY.quote.msgIntro))}
                target="_blank"
                rel="noopener noreferrer"
                className="vrf-btn-wa inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.88rem] font-medium no-underline"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t(COPY.common.whatsapp)}
              </a>
              <a
                href={telLink}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.88rem] font-medium text-fg no-underline ring-1 ring-border transition-colors hover:bg-surface-raised hover:ring-fg-muted"
              >
                <PhoneIcon className="h-4 w-4" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Where */}
          <div>
            <h2 className="mb-4 text-nano font-bold uppercase tracking-[0.2em] text-fg">
              {t(COPY.visit.addressTitle)}
            </h2>
            <address className="space-y-3 text-[0.87rem] not-italic leading-relaxed text-fg-muted">
              <span className="flex gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {address.street}
                  <br />
                  {address.locality}
                  <br />
                  {address.region} {address.postalCode}
                </span>
              </span>
              <span className="flex gap-2.5">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {BUSINESS.hours.days}
                  <br />
                  {fmtHours(lang)}
                </span>
              </span>
            </address>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[0.85rem] font-bold text-accent no-underline hover:text-accent-hover"
            >
              {t(COPY.common.directions)} &rarr;
            </a>
          </div>

          {/* Pages */}
          <div>
            <h2 className="mb-4 text-nano font-bold uppercase tracking-[0.2em] text-fg">
              {BUSINESS.shortName}
            </h2>
            <ul className="space-y-2.5 text-[0.87rem]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <VRFLink
                    href={item.href}
                    className="text-fg-muted no-underline hover:text-accent"
                  >
                    {t(item.label)}
                  </VRFLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border-subtle pt-6 text-[0.78rem] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {BUILD_YEAR} {BUSINESS.name}. {t(COPY.footer.rights)}
          </p>
          <p>
            {t(COPY.footer.builtBy)}{" "}
            <a
              href="https://jayaremala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent no-underline hover:text-accent-hover"
            >
              Jaya Sabarish Reddy Remala
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
