import { ImageResponse } from "next/og";

/**
 * The social card every gradeVITian page inherits (file-convention metadata, so
 * it applies to /gpa, /cgpa, … without each page repeating it). Replaces the old
 * 512px square logo, which Twitter/X and LinkedIn rendered as a thumbnail; a
 * 1200x630 card gets the full-width treatment and a much better click-through.
 */
export const dynamic = "force-static";
export const alt = "gradeVITian, free VIT GPA, CGPA, grade and attendance calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#4f46e5";
const TOOLS = ["GPA", "CGPA", "Grade Predictor", "Attendance", "Planner"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0b0a12",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand glow, echoing the accent halo behind the site's hero */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 60% at 20% 0%, rgba(79,70,229,0.30) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: ACCENT }} />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {/* Letter mark, not the 🎓 emoji — satori needs a network-fetched emoji
                font to render one, and the build must stay offline-safe. */}
            gV
          </div>
          <span style={{ color: "#f4f3fb", fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em" }}>
            grade<span style={{ color: "#a5a0f5" }}>VIT</span>ian
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Your VIT GPA, CGPA and attendance, in seconds.
          </span>
          <span style={{ color: "#b9b4d4", fontSize: 27, marginTop: 22, maxWidth: 820 }}>
            Free calculators on VIT&apos;s 10-point scale. No sign-up, works offline.
          </span>
        </div>

        {/* Tool chips + social proof */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {TOOLS.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(165,160,245,0.28)",
                  background: "rgba(79,70,229,0.14)",
                  color: "#cfcbf0",
                  fontSize: 20,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <span style={{ color: "#7d789c", fontSize: 20 }}>17K+ VITians / month</span>
        </div>
      </div>
    ),
    size,
  );
}
