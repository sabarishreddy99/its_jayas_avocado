"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's margin: hand-written stances you can pick up and throw.
 *
 * The redesign left the right of the hero empty on wide screens. This fills it
 * with the same phrases the page already says elsewhere, in a hand, drifting —
 * and lets a visitor grab one and fling it. It is amusement, not information.
 *
 * ── Two things that are load-bearing ──────────────────────────────────────
 *
 * 1. Bodies store a DISPLACEMENT from a CSS home (`dx`, `dy`), never an
 *    absolute position. Homes live in globals.css as left/top percentages plus
 *    --doodle-rot. So the resting composition renders correctly with no JS at
 *    all: first paint before hydration is right, and the reduced-motion branch
 *    is a one-line early return rather than a second layout mode.
 *
 * 2. Idle drift is added AT WRITE TIME, never integrated into velocity. If it
 *    were integrated, FRICTION would damp the idle away within a couple of
 *    seconds and the field would freeze.
 *
 * ── Accessibility ─────────────────────────────────────────────────────────
 *
 * The field is aria-hidden and the tokens are deliberately NOT focusable. Every
 * string here already renders in the opinions chapter and in <Signature>, so
 * exposing them again would read the same six phrases twice with no context.
 * And the drag conveys nothing — it changes no state, reveals nothing and
 * navigates nowhere, so there is no functionality for a keyboard path to reach.
 *
 * If anyone ever gives a token a tabIndex, a role or an onClick, the aria-hidden
 * has to come off in the SAME commit and every token needs an accessible name.
 * A focusable node inside an aria-hidden subtree is a WCAG 4.1.2 failure: focus
 * lands on something the accessibility tree says does not exist, and the screen
 * reader announces nothing at all.
 */

// ── Field ───────────────────────────────────────────────────────────────────
const PAD = 10; // px the tokens keep off the field edge

// ── Motion ──────────────────────────────────────────────────────────────────
// Friction, not gravity. Nothing falls here; a thrown token travels until the
// paper-on-desk drag stops it. Expressed as a rate (s^-1) and applied as
// exp(-k*dt), which is exactly framerate-independent — a per-frame multiply
// would damp twice as hard at 120Hz as at 60Hz.
const FRICTION = 2.6; // s^-1 — a hard fling coasts ~1.2s
const SPIN_FRICTION = 3.0; // s^-1 — spin dies a little faster than travel
const MAX_SPEED = 2600; // px/s — a flick should not teleport across the field
const MAX_SPIN = 220; // deg/s

// ── Walls ───────────────────────────────────────────────────────────────────
// Under half the energy back: the edge is a desk lip, not a squash court.
const WALL_BOUNCE = 0.52;
const WALL_SPIN = 0.06; // deg/s of kick per px/s of tangential speed at impact

// ── Sleep ───────────────────────────────────────────────────────────────────
// A body parks once it has been below SLEEP_SPEED continuously for SLEEP_TIME.
// A time gate rather than a frame count, so the threshold is identical at 60
// and 120Hz. Parking skips integration and wall tests; drift still renders.
const SLEEP_SPEED = 7; // px/s
const SLEEP_SPIN = 4; // deg/s
const SLEEP_TIME = 0.28; // s

// ── Throw ───────────────────────────────────────────────────────────────────
// The fling reads a WINDOW of samples, never the last pointermove alone — one
// event is 8–16ms of noise and produces a fling that fights the gesture.
const THROW_WINDOW = 0.08; // s
const SPIN_FROM_FLING = 0.9; // deg/s per (px/s · px) / px

// ── Tap ─────────────────────────────────────────────────────────────────────
// Below TAP_SLOP of travel a press is a tap, not a drag. A tap still has to do
// something, or a token reads as dead under the finger.
const TAP_SLOP = 5; // px
const TAP_MS = 400;
const TAP_KICK = 260; // px/s, pushed away from the field centre
const TAP_SPIN = 150; // deg/s

// ── Idle drift ──────────────────────────────────────────────────────────────
// Two layered sines per axis. Frequencies are mutually non-commensurate so the
// path never visibly repeats and no two tokens share a rhythm — the same idea
// as HopeMolecules' NODES table, an order of magnitude slower.
const DRIFT_FADE = 2.2; // s^-1 — drift eases back in over ~1s after a release

type Slot = {
  /** Home, as a fraction of the field box. */
  hx: number;
  hy: number;
  rot: number;
  size: number;
  weight: number;
  tone: "strong" | "mid" | "faint" | "accent";
  ornament?: "underline" | "circle";
  /** Drift: amplitude / frequency / phase, per axis, two layers. */
  ax1: number; fx1: number; px1: number;
  ax2: number; fx2: number; px2: number;
  ay1: number; fy1: number; py1: number;
  ay2: number; fy2: number; py2: number;
  arot: number; frot: number; prot: number;
};

/**
 * Positionally zipped against the `tokens` prop. Homes are spread so no two
 * sit on a shared axis, and the bottom-right is left clear: AvocadoChatButton
 * is fixed there with a 288px card that opens upward.
 */
const LAYOUT: Slot[] = [
  {
    hx: 0.36, hy: 0.10, rot: -6, size: 27, weight: 600, tone: "strong", ornament: "circle",
    ax1: 7, fx1: 0.13, px1: 0.0, ax2: 3, fx2: 0.41, px2: 2.1,
    ay1: 6, fy1: 0.19, py1: 1.4, ay2: 2, fy2: 0.53, py2: 0.3,
    arot: 1.8, frot: 0.11, prot: 0.7,
  },
  {
    hx: 0.70, hy: 0.26, rot: 5, size: 22, weight: 500, tone: "faint",
    ax1: 8, fx1: 0.17, px1: 2.6, ax2: 2, fx2: 0.43, px2: 0.9,
    ay1: 5, fy1: 0.23, py1: 3.3, ay2: 3, fy2: 0.59, py2: 1.7,
    arot: 2.2, frot: 0.14, prot: 2.4,
  },
  {
    hx: 0.30, hy: 0.42, rot: -3, size: 24, weight: 500, tone: "mid",
    ax1: 6, fx1: 0.19, px1: 4.1, ax2: 3, fx2: 0.47, px2: 3.0,
    ay1: 7, fy1: 0.29, py1: 0.6, ay2: 2, fy2: 0.61, py2: 2.8,
    arot: 1.4, frot: 0.17, prot: 4.9,
  },
  {
    hx: 0.66, hy: 0.57, rot: 7, size: 21, weight: 500, tone: "faint",
    ax1: 9, fx1: 0.23, px1: 1.2, ax2: 2, fx2: 0.53, px2: 5.2,
    ay1: 6, fy1: 0.31, py1: 2.5, ay2: 4, fy2: 0.41, py2: 4.4,
    arot: 2.4, frot: 0.13, prot: 1.1,
  },
  {
    hx: 0.34, hy: 0.72, rot: -5, size: 23, weight: 500, tone: "mid",
    ax1: 5, fx1: 0.29, px1: 3.7, ax2: 4, fx2: 0.59, px2: 1.5,
    ay1: 8, fy1: 0.13, py1: 5.1, ay2: 2, fy2: 0.47, py2: 3.9,
    arot: 1.6, frot: 0.19, prot: 3.2,
  },
  {
    // The signature. Largest, accented, underlined — the one that reads first.
    hx: 0.56, hy: 0.88, rot: -9, size: 34, weight: 600, tone: "accent", ornament: "underline",
    ax1: 7, fx1: 0.31, px1: 0.4, ax2: 3, fx2: 0.61, px2: 4.7,
    ay1: 5, fy1: 0.17, py1: 4.2, ay2: 3, fy2: 0.43, py2: 2.0,
    arot: 2.0, frot: 0.23, prot: 5.6,
  },
];

type Body = {
  el: HTMLElement;
  slot: Slot;
  dx: number; dy: number; rot: number;
  vx: number; vy: number; vr: number;
  /** Half-extents, measured once fonts have settled. */
  hw: number; hh: number;
  minDx: number; maxDx: number; minDy: number; maxDy: number;
  /** 0 while held, easing to 1 after release: how much idle drift is applied. */
  mix: number;
  held: boolean;
  resting: boolean;
  still: number;
  /** Grab offset from the token centre, for lever-arm spin. */
  gx: number; gy: number;
  lastTransform: string;
};

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

export default function HeroDoodleField({
  tokens,
  className = "",
}: {
  tokens: string[];
  className?: string;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const items = tokens.slice(0, LAYOUT.length).map((text, i) => ({ text, slot: LAYOUT[i] }));

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    // House idiom. Returning here means no listeners are ever attached, so the
    // field is not draggable either — inertia after a release is motion the
    // user did not ask for, and a static field beats a two-mode physics branch.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(field.querySelectorAll<HTMLElement>("[data-doodle-token]"));
    if (els.length !== items.length) return;

    const bodies: Body[] = els.map((el, i) => ({
      el,
      slot: LAYOUT[i],
      dx: 0, dy: 0, rot: LAYOUT[i].rot,
      vx: 0, vy: 0, vr: 0,
      hw: 0, hh: 0,
      minDx: 0, maxDx: 0, minDy: 0, maxDy: 0,
      mix: 1,
      held: false,
      resting: false,
      still: 0,
      gx: 0, gy: 0,
      lastTransform: "",
    }));

    let W = field.clientWidth;
    let H = field.clientHeight;

    /** Wall bounds live in offset space, so they only change on resize. */
    function measure() {
      W = field!.clientWidth;
      H = field!.clientHeight;
      for (const b of bodies) {
        b.hw = b.el.offsetWidth / 2;
        b.hh = b.el.offsetHeight / 2;
        const homeX = b.slot.hx * W;
        const homeY = b.slot.hy * H;
        b.minDx = PAD + b.hw - homeX;
        b.maxDx = W - PAD - b.hw - homeX;
        b.minDy = PAD + b.hh - homeY;
        b.maxDy = H - PAD - b.hh - homeY;
        // A token wider than the field: pin it centred rather than let the
        // bounds cross over and fling it back and forth between them.
        if (b.minDx > b.maxDx) b.minDx = b.maxDx = (b.minDx + b.maxDx) / 2;
        if (b.minDy > b.maxDy) b.minDy = b.maxDy = (b.minDy + b.maxDy) / 2;
        b.dx = clamp(b.dx, b.minDx, b.maxDx);
        b.dy = clamp(b.dy, b.minDy, b.maxDy);
      }
    }

    // Caveat's metrics differ enough from the fallback that measuring before it
    // lands gives wrong half-extents, and therefore wrong walls.
    measure();
    document.fonts?.ready.then(measure).catch(() => {});

    const ro = new ResizeObserver(measure);
    ro.observe(field);

    // ── Render ──────────────────────────────────────────────────────────────
    function write(b: Body, t: number) {
      const m = b.mix;
      const ox = m * (b.slot.ax1 * Math.sin(b.slot.fx1 * t + b.slot.px1)
                    + b.slot.ax2 * Math.sin(b.slot.fx2 * t + b.slot.px2));
      const oy = m * (b.slot.ay1 * Math.sin(b.slot.fy1 * t + b.slot.py1)
                    + b.slot.ay2 * Math.sin(b.slot.fy2 * t + b.slot.py2));
      const orot = m * b.slot.arot * Math.sin(b.slot.frot * t + b.slot.prot);
      const s = `translate(-50%,-50%) translate3d(${(b.dx + ox).toFixed(1)}px,${(b.dy + oy).toFixed(1)}px,0) rotate(${(b.rot + orot).toFixed(2)}deg)`;
      // A resting token moves well under a tenth of a pixel per frame, so this
      // compare skips a large share of the style writes outright.
      if (s !== b.lastTransform) {
        b.el.style.transform = s;
        b.lastTransform = s;
      }
    }

    /** The drift a body is showing right now — needed to grab without a jump. */
    function driftAt(b: Body, t: number) {
      const m = b.mix;
      return {
        ox: m * (b.slot.ax1 * Math.sin(b.slot.fx1 * t + b.slot.px1)
               + b.slot.ax2 * Math.sin(b.slot.fx2 * t + b.slot.px2)),
        oy: m * (b.slot.ay1 * Math.sin(b.slot.fy1 * t + b.slot.py1)
               + b.slot.ay2 * Math.sin(b.slot.fy2 * t + b.slot.py2)),
        orot: m * b.slot.arot * Math.sin(b.slot.frot * t + b.slot.prot),
      };
    }

    // ── Loop ────────────────────────────────────────────────────────────────
    let raf = 0;
    let running = false;
    let last = performance.now();
    const start = last;
    let now = last;

    function frame(ts: number) {
      now = ts;
      const dt = Math.min((ts - last) / 1000, 0.05); // clamp tab-switch gaps
      last = ts;
      const t = (ts - start) / 1000;

      const damp = Math.exp(-FRICTION * dt);
      const spinDamp = Math.exp(-SPIN_FRICTION * dt);
      const mixK = 1 - Math.exp(-DRIFT_FADE * dt);

      for (const b of bodies) {
        if (!b.held) {
          b.mix += (1 - b.mix) * mixK;

          if (!b.resting) {
            b.vx *= damp; b.vy *= damp; b.vr *= spinDamp;
            b.dx += b.vx * dt; b.dy += b.vy * dt; b.rot += b.vr * dt;

            if (b.dx < b.minDx) { b.dx = b.minDx; b.vx = -b.vx * WALL_BOUNCE; b.vr += b.vy * WALL_SPIN; }
            else if (b.dx > b.maxDx) { b.dx = b.maxDx; b.vx = -b.vx * WALL_BOUNCE; b.vr -= b.vy * WALL_SPIN; }
            if (b.dy < b.minDy) { b.dy = b.minDy; b.vy = -b.vy * WALL_BOUNCE; b.vr -= b.vx * WALL_SPIN; }
            else if (b.dy > b.maxDy) { b.dy = b.maxDy; b.vy = -b.vy * WALL_BOUNCE; b.vr += b.vx * WALL_SPIN; }

            if (b.vx * b.vx + b.vy * b.vy < SLEEP_SPEED * SLEEP_SPEED && Math.abs(b.vr) < SLEEP_SPIN) {
              b.still += dt;
              if (b.still > SLEEP_TIME) { b.resting = true; b.vx = b.vy = b.vr = 0; b.still = 0; }
            } else {
              b.still = 0;
            }
          }
        }
        write(b, t);
      }

      if (running) raf = requestAnimationFrame(frame);
    }

    // Don't burn frames on a field nobody can see — the hero is off screen for
    // most of a session.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(field);

    // ── Pointer ─────────────────────────────────────────────────────────────
    let activeId: number | null = null;
    let active: Body | null = null;
    let rect = field.getBoundingClientRect();
    let lastScrollY = window.scrollY;
    let travel = 0;
    let downAt = 0;
    let lastX = 0, lastY = 0;
    const samples: { x: number; y: number; t: number }[] = [];

    function refreshRect() {
      // clientX/Y are viewport-relative, so the cached rect goes stale the
      // moment the page scrolls under a held pointer. One integer compare per
      // move; a layout read only on frames where the page actually moved.
      if (window.scrollY !== lastScrollY) {
        rect = field!.getBoundingClientRect();
        lastScrollY = window.scrollY;
      }
    }

    function onDown(e: PointerEvent) {
      if (activeId !== null) return; // single pointer; multi-touch is a rounding error at xl
      const el = (e.target as Element | null)?.closest?.("[data-doodle-token]") as HTMLElement | null;
      if (!el) return;
      const b = bodies.find((x) => x.el === el);
      if (!b) return;

      // Intentionally NOT { passive: true }, unlike IntroScreen's touch
      // listeners: this has to preventDefault() to stop the browser starting
      // its own text-selection drag on the glyph the moment you press it.
      e.preventDefault();

      rect = field!.getBoundingClientRect();
      lastScrollY = window.scrollY;

      const t = (now - start) / 1000;
      const d = driftAt(b, t);
      // Fold the drift the token is CURRENTLY showing into its offset and cut
      // the mix to 0. The rendered position is unchanged, so nothing jumps, and
      // from here the pointer owns dx/dy with no sine underneath the finger.
      b.dx += d.ox; b.dy += d.oy; b.rot += d.orot;
      b.mix = 0;
      b.held = true;
      b.resting = false;
      b.vx = b.vy = b.vr = 0;

      const cx = rect.left + b.slot.hx * W + b.dx;
      const cy = rect.top + b.slot.hy * H + b.dy;
      b.gx = e.clientX - cx;
      b.gy = e.clientY - cy;

      activeId = e.pointerId;
      active = b;
      travel = 0;
      downAt = e.timeStamp;
      lastX = e.clientX; lastY = e.clientY;
      samples.length = 0;
      samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });

      // Capture on the TOKEN, not the field: the field is pointer-events:none,
      // and captured events still bubble, so delegation keeps working.
      el.setPointerCapture(e.pointerId);
      document.documentElement.toggleAttribute("data-doodle-drag", true);
    }

    function onMove(e: PointerEvent) {
      if (activeId !== e.pointerId || !active) return;
      refreshRect();

      travel += Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX; lastY = e.clientY;

      const b = active;
      b.dx = clamp(e.clientX - b.gx - rect.left - b.slot.hx * W, b.minDx, b.maxDx);
      b.dy = clamp(e.clientY - b.gy - rect.top - b.slot.hy * H, b.minDy, b.maxDy);

      samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
      if (samples.length > 8) samples.shift();
    }

    function onUp(e: PointerEvent) {
      if (activeId !== e.pointerId || !active) return;
      const b = active;
      b.held = false;
      b.resting = false;
      b.still = 0;

      if (travel >= TAP_SLOP) {
        // Fling from a window of samples, never the last event alone.
        const cutoff = e.timeStamp - THROW_WINDOW * 1000;
        const first = samples.find((s) => s.t >= cutoff) ?? samples[0];
        const span = (e.timeStamp - first.t) / 1000;
        if (span > 0.008) {
          b.vx = clamp((e.clientX - first.x) / span, -MAX_SPEED, MAX_SPEED);
          b.vy = clamp((e.clientY - first.y) / span, -MAX_SPEED, MAX_SPEED);
          // Spin from the lever arm: grabbing a corner and flicking spins hard,
          // grabbing the centre barely spins at all.
          b.vr = clamp(
            (SPIN_FROM_FLING * (b.gx * b.vy - b.gy * b.vx)) / Math.max(1, b.hw),
            -MAX_SPIN,
            MAX_SPIN
          );
        }
      } else if (e.timeStamp - downAt < TAP_MS) {
        // A tap. A token that does nothing under the finger reads as broken.
        const ax = b.slot.hx * W + b.dx - W / 2;
        const ay = b.slot.hy * H + b.dy - H / 2;
        const len = Math.hypot(ax, ay) || 1;
        b.vx = (ax / len) * TAP_KICK;
        b.vy = (ay / len) * TAP_KICK;
        b.vr = (Math.random() < 0.5 ? -1 : 1) * TAP_SPIN;
      }

      activeId = null;
      active = null;
      document.documentElement.removeAttribute("data-doodle-drag");
    }

    field.addEventListener("pointerdown", onDown);
    field.addEventListener("pointermove", onMove);
    field.addEventListener("pointerup", onUp);
    field.addEventListener("pointercancel", onUp);
    field.addEventListener("lostpointercapture", onUp);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      field.removeEventListener("pointerdown", onDown);
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerup", onUp);
      field.removeEventListener("pointercancel", onUp);
      field.removeEventListener("lostpointercapture", onUp);
      // An unmount mid-drag must not strand the attribute — HeroDotGrid would
      // stay suppressed for the rest of the session.
      document.documentElement.removeAttribute("data-doodle-drag");
    };
  }, [items.length]);

  return (
    <div ref={fieldRef} aria-hidden className={`doodle-field relative ${className}`}>
      {items.map(({ text, slot }) => (
        <span
          key={text}
          data-doodle-token
          className={`doodle-token doodle-ink-${slot.tone}`}
          style={{
            left: `${slot.hx * 100}%`,
            top: `${slot.hy * 100}%`,
            fontSize: `${slot.size}px`,
            fontWeight: slot.weight,
            ["--doodle-rot" as string]: `${slot.rot}deg`,
          }}
        >
          {text}

          {slot.ornament === "underline" && (
            // Two strokes, the second offset and thinner and 170ms later, so it
            // reads as a correction rather than a copy.
            <svg
              className="doodle-orn doodle-orn-underline"
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <path
                className="doodle-ink"
                style={{ ["--ink-len" as string]: 208, ["--ink-delay" as string]: "1150ms" }}
                d="M4 8C46 3 92 11 138 5s48 4 58 1"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="doodle-ink"
                style={{ ["--ink-len" as string]: 196, ["--ink-delay" as string]: "1320ms" }}
                d="M11 12C59 8 105 13 151 9s37 3 43 1"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          {slot.ornament === "circle" && (
            // One loop that overshoots and crosses itself — the tell that a pen
            // drew it rather than an <ellipse>.
            <svg
              className="doodle-orn doodle-orn-circle"
              viewBox="0 0 220 64"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <path
                className="doodle-ink"
                style={{ ["--ink-len" as string]: 470, ["--ink-delay" as string]: "1400ms" }}
                d="M150 6C86 -1 20 6 9 27s52 34 118 30 88-19 74-33S72 8 42 22"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
