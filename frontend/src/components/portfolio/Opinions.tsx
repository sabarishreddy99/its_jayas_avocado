import type { Opinion, OpinionsBlock } from "@/data/profile";

/**
 * The stances chapter: what the work is for, and what it refuses to do.
 *
 * This is the hinge in the narrative — it turns the page from a record of what
 * got shipped into an argument about how it gets built. It is also the one
 * section written in the second person of a job interview, which is why the
 * evidence matters: every `line` in profile.json is quoted from something
 * already built (the origin story, the hope-molecules creed, the VRF Bricks
 * rebuild, the Tailorbird agent design), never authored as a slogan.
 *
 * The "won't do" column strikes the TERM only, never the explanation. Striking
 * a whole sentence costs more legibility than the tone is worth, and screen
 * readers handle long struck passages badly.
 */
function Column({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: Opinion[];
  tone: "for" | "against";
}) {
  const isFor = tone === "for";
  return (
    <div className="min-w-0">
      <div className="mb-6 flex items-center gap-2.5">
        <span
          aria-hidden
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            isFor ? "bg-accent" : "bg-fg-faint"
          }`}
        />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-fg-faint">
          {heading}
        </h3>
      </div>

      <ul className="space-y-6 sm:space-y-7">
        {items.map((o) => (
          <li key={o.term} className="min-w-0">
            <p
              className={`display-serif text-[1.35rem] leading-snug sm:text-[1.45rem] ${
                isFor ? "text-fg" : "text-fg-subtle opinion-against"
              }`}
            >
              {o.term}
            </p>
            <p className="voice-serif mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-fg-subtle">
              {o.line}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Opinions({ data }: { data: OpinionsBlock }) {
  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:gap-16">
      <Column heading={data.forLabel} items={data.for} tone="for" />

      {/* Hairline spine between the two registers. Horizontal on phone where
          the columns stack, vertical once they sit side by side. */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-6 left-0 right-0 h-px bg-border sm:-left-5 sm:top-0 sm:bottom-0 sm:right-auto sm:h-auto sm:w-px lg:-left-8"
        />
        <Column heading={data.againstLabel} items={data.against} tone="against" />
      </div>
    </div>
  );
}
