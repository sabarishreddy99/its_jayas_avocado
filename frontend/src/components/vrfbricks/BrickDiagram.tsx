import type { Brick } from "@/data/vrfbricks/business";
import { toMm } from "@/data/vrfbricks/business";

/**
 * A dimensioned axonometric drawing of a brick, generated from its real
 * measurements.
 *
 * Why a drawing and not a photograph: a buyer choosing between a 5.5-inch and
 * a 4-inch brick needs the proportion and the numbers, and no photograph of a
 * grey brick against grey ground conveys either. The geometry below is derived
 * from `brick.inches`, so the shape on screen is the shape in the yard — if
 * the sizes in business.ts ever change, every drawing follows.
 */

/** Pixels per inch. Sets the drawing's intrinsic size; CSS scales it after. */
const S = 20;
/** Depth foreshortening for the axonometric projection. */
const KX = 0.55;
const KY = 0.45;

const PAD = { left: 52, right: 30, top: 56, bottom: 52 };

/**
 * Round every coordinate before it reaches the DOM.
 *
 * The geometry is derived from irrational intermediates (a vector length, and
 * products with non-representable decimals like 0.55), and floating point does
 * not have to agree to the last bit between the engine that server-renders and
 * the engine that hydrates. When it disagreed, React saw `x1="39.33524419485475"`
 * from the server against `39.335244194854745` on the client and reported a
 * hydration mismatch.
 *
 * Two decimal places is already far finer than a sub-pixel at any sane zoom,
 * and it makes the emitted markup byte-identical everywhere. Rounding at the
 * point of emission rather than mid-calculation is deliberate: it keeps the
 * geometry exact right up to the DOM boundary.
 */
const r = (n: number) => Math.round(n * 100) / 100;

export default function BrickDiagram({
  brick,
  className = "",
}: {
  brick: Brick;
  className?: string;
}) {
  const { l, w, h } = brick.inches;

  const L = l * S;
  const H = h * S;
  const dx = w * S * KX;
  const dy = w * S * KY;

  const ox = PAD.left;
  const oy = PAD.top + dy;

  const vbW = r(ox + L + dx + PAD.right);
  const vbH = r(oy + H + PAD.bottom);

  // Front face corners
  const fTL = [ox, oy];
  const fTR = [ox + L, oy];
  const fBR = [ox + L, oy + H];
  const fBL = [ox, oy + H];
  // Back-top corners (pushed along the depth axis)
  const bTL = [ox + dx, oy - dy];
  const bTR = [ox + L + dx, oy - dy];
  const bBR = [ox + L + dx, oy - dy + H];

  const pts = (...p: number[][]) => p.map(([x, y]) => `${r(x)},${r(y)}`).join(" ");

  // Perpendicular offset for the depth dimension line, so it sits clear of the
  // top face rather than across it.
  //
  // sqrt rather than Math.hypot: hypot is NOT required to be correctly rounded
  // by the spec, so Node and the browser can disagree in the last bit and that
  // difference reaches the DOM as a hydration mismatch. sqrt IS correctly
  // rounded under IEEE 754, so it gives the same answer everywhere.
  const dLen = Math.sqrt(dx * dx + dy * dy);
  const px = (-dy / dLen) * 20;
  const py = (-dx / dLen) * 20;

  const label = `${brick.name.en}, ${l} by ${w} by ${h} inches`;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={className}
      role="img"
      aria-label={label}
      style={{ width: "100%", height: "auto" }}
    >
      {/* Faces. Three flat tones read as three planes without any gradient. */}
      <polygon points={pts(fTL, fTR, fBR, fBL)} fill="#9b9890" />
      <polygon points={pts(fTL, bTL, bTR, fTR)} fill="#c2bfb5" />
      <polygon points={pts(fTR, bTR, bBR, fBR)} fill="#77746c" />

      {/* Edges */}
      <g fill="none" stroke="#3d3a30" strokeWidth="1.6" strokeLinejoin="round">
        <polygon points={pts(fTL, fTR, fBR, fBL)} />
        <polygon points={pts(fTL, bTL, bTR, fTR)} />
        <polygon points={pts(fTR, bTR, bBR, fBR)} />
      </g>

      {/* Dimension lines. Terracotta so they read as annotation, not object. */}
      <g stroke="var(--accent)" strokeWidth="1.3" fill="none">
        {/* Length, below the front face */}
        <line x1={r(ox)} y1={r(oy + H + 22)} x2={r(ox + L)} y2={r(oy + H + 22)} />
        <line x1={r(ox)} y1={r(oy + H + 15)} x2={r(ox)} y2={r(oy + H + 29)} />
        <line x1={r(ox + L)} y1={r(oy + H + 15)} x2={r(ox + L)} y2={r(oy + H + 29)} />

        {/* Height, left of the front face */}
        <line x1={r(ox - 26)} y1={r(oy)} x2={r(ox - 26)} y2={r(oy + H)} />
        <line x1={r(ox - 33)} y1={r(oy)} x2={r(ox - 19)} y2={r(oy)} />
        <line x1={r(ox - 33)} y1={r(oy + H)} x2={r(ox - 19)} y2={r(oy + H)} />

        {/* Width, along the depth axis, offset clear of the top face */}
        <line x1={r(fTL[0] + px)} y1={r(fTL[1] + py)} x2={r(bTL[0] + px)} y2={r(bTL[1] + py)} />
        <line x1={r(fTL[0] + px * 0.6)} y1={r(fTL[1] + py * 0.6)} x2={r(fTL[0] + px * 1.5)} y2={r(fTL[1] + py * 1.5)} />
        <line x1={r(bTL[0] + px * 0.6)} y1={r(bTL[1] + py * 0.6)} x2={r(bTL[0] + px * 1.5)} y2={r(bTL[1] + py * 1.5)} />
      </g>

      {/* Numbers. Inches lead because that is the unit of the trade; mm follows
          for anyone reading this as a spec sheet. */}
      <g
        fill="var(--fg)"
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <text x={r(ox + L / 2)} y={r(oy + H + 42)}>
          {l}&Prime;
          <tspan fill="var(--fg-subtle)" fontWeight="500" fontSize="11">
            {"  "}
            {toMm(l)} mm
          </tspan>
        </text>

        <text
          x={r(ox - 38)}
          y={r(oy + H / 2)}
          transform={`rotate(-90 ${r(ox - 38)} ${r(oy + H / 2)})`}
        >
          {h}&Prime;
          <tspan fill="var(--fg-subtle)" fontWeight="500" fontSize="11">
            {"  "}
            {toMm(h)} mm
          </tspan>
        </text>

        <text x={r(fTL[0] + dx / 2 + px * 2.4)} y={r(fTL[1] - dy / 2 + py * 2.4 + 4)}>
          {w}&Prime;
          <tspan fill="var(--fg-subtle)" fontWeight="500" fontSize="11">
            {"  "}
            {toMm(w)} mm
          </tspan>
        </text>
      </g>
    </svg>
  );
}
