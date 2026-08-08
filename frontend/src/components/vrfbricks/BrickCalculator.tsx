"use client";

import { useState, useMemo, useId } from "react";
import { BRICKS } from "@/data/vrfbricks/business";
import { COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import { WhatsAppButton, SERIF } from "./VRFUi";
import { VRFLabel, VRFInput, VRFSelect, type VRFOption } from "./VRFField";
import { waLink } from "./whatsapp";

/**
 * "How many bricks do I need?", the question every buyer actually arrives with.
 *
 * The original site answered it nowhere, so a homeowner had to guess or ring up
 * and be told. Answering it here does two jobs: it is the single most useful
 * thing this site can do for a customer, and "brick calculator" is a real query
 * with real local intent.
 *
 * The result feeds straight into the WhatsApp message, so working out the
 * number and asking a price on it is one continuous action rather than two.
 */
export default function BrickCalculator() {
  const { t, lang } = useLang();
  const [area, setArea] = useState("");
  const [brickId, setBrickId] = useState(BRICKS[0].id);
  const uid = useId();

  const brick = BRICKS.find((b) => b.id === brickId) ?? BRICKS[0];

  const result = useMemo(() => {
    const sqft = parseFloat(area);
    if (!Number.isFinite(sqft) || sqft <= 0) return null;
    const count = Math.ceil((sqft / 100) * brick.per100SqFt);
    const trucks = brick.perTruck ? count / brick.perTruck : null;
    return { count, trucks };
  }, [area, brick]);

  const nf = new Intl.NumberFormat(lang === "te" ? "te-IN" : "en-IN");

  const options: VRFOption[] = BRICKS.map((b) => ({
    value: b.id,
    label: t(b.name),
    sub: `${b.inches.l} × ${b.inches.w} × ${b.inches.h} in · ${t(b.trade)}`,
  }));

  return (
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:gap-6 sm:p-8">
        <div>
          <VRFLabel htmlFor={`${uid}-area`}>{t(COPY.bricks.calcArea)}</VRFLabel>
          <VRFInput
            id={`${uid}-area`}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={area}
            onChange={setArea}
            placeholder="1000"
            unit={t(COPY.bricks.calcSqft)}
          />
        </div>

        <div>
          <VRFLabel htmlFor={`${uid}-brick`}>{t(COPY.quote.fBrick)}</VRFLabel>
          <VRFSelect
            id={`${uid}-brick`}
            value={brickId}
            onChange={setBrickId}
            options={options}
          />
        </div>
      </div>

      {/* Result. aria-live so a screen-reader user hears the number change. */}
      <div
        aria-live="polite"
        className={`border-t border-border px-6 py-6 transition-colors sm:px-8 ${
          result ? "bg-accent-light" : "bg-surface-sunken"
        }`}
      >
        {result ? (
          <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
            <div>
              <div
                className="text-[3rem] font-light leading-none tabular-nums text-accent sm:text-[3.6rem]"
                style={{ fontFamily: SERIF }}
              >
                {nf.format(result.count)}
              </div>
              <div className="mt-2 text-[0.85rem] font-medium text-fg-muted">
                {t(COPY.bricks.calcResult)}
              </div>
            </div>

            {result.trucks !== null && (
              <div>
                <div
                  className="text-[2rem] font-light leading-none tabular-nums text-fg"
                  style={{ fontFamily: SERIF }}
                >
                  {result.trucks < 1 ? "<1" : nf.format(Math.ceil(result.trucks))}
                </div>
                <div className="mt-2 text-[0.85rem] font-medium text-fg-muted">
                  {t(COPY.bricks.calcTrucks)}
                </div>
              </div>
            )}

            <WhatsAppButton
              className="w-full sm:ml-auto sm:w-auto"
              href={waLink({
                intro: t(COPY.quote.msgIntro),
                brick: `${brick.name.en} (${brick.inches.l}x${brick.inches.w}x${brick.inches.h} in)`,
                qty: `${result.count}`,
              })}
            >
              {t(COPY.common.getQuote)}
            </WhatsAppButton>
          </div>
        ) : (
          <p className="text-[0.9rem] text-fg-subtle">{t(COPY.bricks.calcLede)}</p>
        )}
      </div>

      <p className="border-t border-border px-6 py-4 text-[0.8rem] leading-relaxed text-fg-faint sm:px-8">
        {t(COPY.bricks.calcDisclaimer)}
      </p>
    </div>
  );
}
