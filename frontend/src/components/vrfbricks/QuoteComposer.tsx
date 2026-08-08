"use client";

import { useState, useId } from "react";
import { BRICKS, BUSINESS } from "@/data/vrfbricks/business";
import { COPY } from "@/data/vrfbricks/copy";
import { useLang } from "./VRFLang";
import { WhatsAppButton, CallButton } from "./VRFUi";
import { VRFLabel, VRFInput, VRFSelect, type VRFOption } from "./VRFField";
import { waLink, telLink } from "./whatsapp";

/**
 * The enquiry form: a WhatsApp message composer, not a form submission.
 *
 * Nothing is posted anywhere. The fields assemble a message and the button is a
 * wa.me link, so the buyer sees exactly what they are sending and keeps a copy
 * in their own chat history, the message lands on the phone Govinda Reddy
 * already carries, and this static site needs no backend, no database and no
 * privacy policy covering stored personal data.
 *
 * Every field is optional. A buyer who types only "5000" still produces a
 * useful message, which is the point: the old Google Form rejected the whole
 * submission if any one required field was blank.
 */
export default function QuoteComposer() {
  const { t } = useLang();
  const uid = useId();

  const [name, setName] = useState("");
  const [brick, setBrick] = useState("");
  const [qty, setQty] = useState("");
  const [place, setPlace] = useState("");
  const [need, setNeed] = useState("");
  const [notes, setNotes] = useState("");

  const href = waLink({
    intro: t(COPY.quote.msgIntro),
    name, brick, qty, place, need, notes,
  });

  const brickOptions: VRFOption[] = [
    { value: "", label: t(COPY.quote.notSure) },
    ...BRICKS.map((b) => ({
      value: `${b.name.en} (${b.inches.l}x${b.inches.w}x${b.inches.h} in)`,
      label: t(b.name),
      sub: `${b.inches.l} × ${b.inches.w} × ${b.inches.h} in · ${t(b.trade)}`,
    })),
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:gap-6 sm:p-8">
        {/* The two fields that actually decide a quote come first. */}
        <div>
          <VRFLabel htmlFor={`${uid}-brick`}>{t(COPY.quote.fBrick)}</VRFLabel>
          <VRFSelect
            id={`${uid}-brick`}
            value={brick}
            onChange={setBrick}
            options={brickOptions}
            placeholder={t(COPY.quote.notSure)}
          />
        </div>

        <div>
          <VRFLabel htmlFor={`${uid}-qty`}>{t(COPY.quote.fQty)}</VRFLabel>
          <VRFInput
            id={`${uid}-qty`}
            type="number"
            inputMode="numeric"
            min="0"
            value={qty}
            onChange={setQty}
            placeholder="5000"
          />
        </div>

        <div>
          <VRFLabel htmlFor={`${uid}-place`}>{t(COPY.quote.fPlace)}</VRFLabel>
          <VRFInput
            id={`${uid}-place`}
            value={place}
            onChange={setPlace}
            placeholder={BUSINESS.address.locality}
          />
        </div>

        <div>
          <VRFLabel htmlFor={`${uid}-need`}>{t(COPY.quote.fNeed)}</VRFLabel>
          <VRFInput id={`${uid}-need`} value={need} onChange={setNeed} />
        </div>

        <div>
          <VRFLabel htmlFor={`${uid}-name`}>{t(COPY.quote.fName)}</VRFLabel>
          <VRFInput id={`${uid}-name`} value={name} onChange={setName} autoComplete="name" />
        </div>

        <div>
          <VRFLabel htmlFor={`${uid}-notes`}>{t(COPY.quote.fNotes)}</VRFLabel>
          <VRFInput id={`${uid}-notes`} value={notes} onChange={setNotes} />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-surface-sunken px-6 py-6 sm:flex-row sm:items-center sm:px-8">
        <WhatsAppButton href={href} className="w-full sm:w-auto">
          {t(COPY.quote.send)}
        </WhatsAppButton>
        <span className="text-center text-sm text-fg-subtle sm:text-left">
          {t(COPY.quote.orCall)}
        </span>
        <CallButton href={telLink} className="w-full sm:w-auto">
          {BUSINESS.phoneDisplay}
        </CallButton>
      </div>
    </div>
  );
}
