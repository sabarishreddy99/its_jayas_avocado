import { ImageResponse } from "next/og";
import { FOUNDED_YEAR, fmtHours } from "@/data/vrfbricks/business";

/**
 * The 1200x630 social card every VRF Bricks page inherits.
 *
 * The original site had no OG tags at all, so a WhatsApp forward — which is
 * how this business is actually shared, one contractor to another — rendered
 * as a bare grey link with no name, no place and no picture. That is the
 * single most common way anyone will ever encounter this site, so the card
 * leads with the two facts that matter in a forward: what it is, and where.
 *
 * English only: satori would need a network-fetched Telugu font to render the
 * script, and the build must stay offline-safe.
 */
export const dynamic = "force-static";
export const alt = "Venkata Ramana Fly Ash Cement Bricks, Kavali, Nellore District";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#17160f";
const ACCENT = "#a8481f";
const LIME = "#f4f1ea";

/** A course of the stretcher bond, drawn at the real 11:7 brick face ratio. */
function Course({ offset, y }: { offset: number; y: number }) {
  const W = 132;
  const H = Math.round(W / 1.571);
  return (
    <div style={{ display: "flex", position: "absolute", left: offset - W, top: y }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: W,
            height: H,
            marginRight: 5,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        />
      ))}
    </div>
  );
}

export default function Image() {
  const H = Math.round(132 / 1.571);
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* The wall, running bond, behind everything */}
        {Array.from({ length: 9 }).map((_, r) => (
          <Course key={r} y={r * (H + 5)} offset={r % 2 === 0 ? 0 : 68} />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(100deg, rgba(23,22,15,0.97) 34%, rgba(23,22,15,0.62) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: ACCENT }} />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              background: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            VRF
          </div>
          <span style={{ color: LIME, fontSize: 27, fontWeight: 700, letterSpacing: "0.12em" }}>
            STANDARD FOR STRENGTH
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#fff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 880,
            }}
          >
            Venkata Ramana Fly Ash Cement Bricks
          </span>
          <span style={{ color: "#b8b2a0", fontSize: 29, marginTop: 22, maxWidth: 780 }}>
            Solid bricks pressed and cured in Kavali, Nellore District, since {FOUNDED_YEAR}.
          </span>
        </div>

        {/* Sizes + place */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["11 × 5.5 × 7 in", "11 × 4 × 7 in", "11 × 5.5 × 9 in"].map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  padding: "11px 22px",
                  border: "1px solid rgba(180,82,42,0.55)",
                  background: "rgba(180,82,42,0.16)",
                  color: "#e8b79f",
                  fontSize: 21,
                  fontWeight: 600,
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <span style={{ color: "#8a8474", fontSize: 21 }}>Open daily · {fmtHours("en")}</span>
        </div>
      </div>
    ),
    size,
  );
}
