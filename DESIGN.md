---
name: jayaremala.com
description: An editorial newsprint system where every typeface is an assigned speaker — the system, the author, and the machine.
colors:
  bg: "#fefefb"
  surface: "#f5f4f0"
  surface-raised: "#eceae6"
  surface-sunken: "#e3e0da"
  border: "#c6c2bb"
  border-subtle: "#dedad3"
  border-strong: "#978f87"
  fg: "#181410"
  fg-muted: "#3a342c"
  fg-subtle: "#5a5248"
  fg-faint: "#8c867e"
  accent: "#4f46e5"
  accent-hover: "#4338ca"
  accent-light: "#eef2ff"
  accent-fg: "#ffffff"
  accent-secondary: "#8b5cf6"
  dark-bg: "#000000"
  dark-surface: "#0c0c0c"
  dark-surface-raised: "#181818"
  dark-border: "#252525"
  dark-border-strong: "#3a3a3a"
  dark-fg: "#f0f0f0"
  dark-fg-muted: "#cccccc"
  dark-fg-subtle: "#888888"
  dark-fg-faint: "#484848"
  dark-accent: "#818cf8"
  dark-accent-hover: "#a5b4fc"
  dark-accent-light: "#1a1a2e"
  dark-accent-secondary: "#a78bfa"
typography:
  display:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.65rem, 4.4vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.016em"
    fontFeature: "kern 1, liga 1"
  headline:
    fontFamily: "Roboto, system-ui, Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.006em"
  body:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  lead:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.8
  prose:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    letterSpacing: "0.07em"
  signature:
    fontFamily: "Cormorant Garamond, EB Garamond, Georgia, serif"
    fontWeight: 500
    letterSpacing: "0.005em"
    lineHeight: 1.1
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
rounded:
  chip: "0.5rem"
  panel: "0.75rem"
  card: "1rem"
  card-lg: "1rem"
  pill: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.25rem"
  xl: "1.5rem"
  nav-h: "50px"
components:
  button-primary:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 1.25rem"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-fg}"
    rounded: "{rounded.chip}"
    padding: "0.375rem 0.875rem"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-fg}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  chip-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-fg}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
  chip-inactive:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg-faint}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.chip}"
    padding: "0.5rem 0.75rem"
  search-trigger:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.fg-faint}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.375rem 0.375rem 0.875rem"
---

# Design System: jayaremala.com

## Overview

**Creative North Star: "Three Voices"**

This system is built on a casting decision, not a style. Every typeface on the
site is an assigned speaker, and the assignment is the rule that makes nine
loaded fonts read as discipline instead of indulgence. **Roboto is the system
talking** — chrome, headings, UI, the default voice a visitor meets.
**Garamond is Jaya talking** — the hero, the chapter labels, the prose
headings, the signature. **Geist Mono is the machine reporting** — code,
metrics, keyboard hints, trace output. A visitor never has to be told which is
which; they can hear it.

The material underneath is newsprint. A fractal-noise grain sits over every
page at 2.8% opacity in multiply, dropping to 1.8% in screen on dark. Column
rules are heavy at the spine and fade to nothing before the margin, the way a
printed rule does. Long-form text carries hanging punctuation, a Garamond drop
cap in the accent, balanced heading wraps, and a 68ch measure. The homepage is
a single continuous column of numbered chapters at every viewport width — one
DOM tree, no layout branch, the rail going sticky only at `lg`.

Restraint is the default state and response is earned by contact. Cards carry
no shadow at all in light mode; depth arrives only on hover, as a 3px lift.
Every button drops to `scale(0.97)` in 75ms when pressed. The palette is
almost entirely ink and paper, with one indigo held back for the few things
that are genuinely live.

**Key Characteristics:**

- Nine typefaces, each with exactly one assigned speaker
- Newsprint grain over every surface; column rules that fade to the margin
- Ink-on-paper primary actions — the accent is never the main button
- Flat in light, materially deep in dark; two different papers, not one tinted
- Motion is a single easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) plus a 75ms press
- A serif that survives every theme, because the author's voice is not themeable

**Confirmed anti-reference: the generic developer-portfolio dark mode.** No
neon-on-black terminal aesthetic, no monospace-everything, no glowing gradient
orbs, no `</> Full Stack Developer` hero. Monospace here is a reporting voice
with a job, not a costume.

## Colors

Ink and paper carry the entire system; one indigo is held in reserve for what
is live.

### Primary

- **Signal Indigo** (`accent`): the site's single accent, and a deliberate,
  binding choice. It marks what is live and what is current — link underlines,
  the drop cap on every article's opening letter, active filter chips, the
  pinging status dot on shipped products, focus rings, and the selection
  highlight at 24% mix. It lightens to a periwinkle in dark mode
  (`dark-accent`) so it survives a true-black ground.
- **Signal Violet** (`accent-secondary`): appears only as the far stop of the
  gradient on section micro-labels (`.label-gradient`) and nowhere else. It is
  a terminator for one gradient, not a second accent.
- **Indigo Wash** (`accent-light`): the tint behind blockquotes and the
  soft-selected state of pipeline nodes.

### Neutral

- **Newsprint** (`bg`) and its three surface steps (`surface`,
  `surface-raised`, `surface-sunken`): the paper stack. Cards sit on
  `surface`, dropdowns and the search trigger on `surface-raised`.
- **Ink** (`fg`) with three descending voices (`fg-muted`, `fg-subtle`,
  `fg-faint`): body copy runs at `fg-muted`, not full ink; `fg-faint` carries
  timestamps, list markers, and captions.
- **Column Rules** (`border`, `border-subtle`, `border-strong`): print rule
  weights. `border-strong` is the hover border on cards and the spine end of
  every chapter rule.
- **Pure Black** (`dark-bg`): dark mode is true `#000000`, OLED-ready, with
  `dark-fg` at a soft `#f0f0f0` rather than pure white.

### Named Rules

**The One Ink Rule.** The primary action is ink on paper — `fg` background,
`bg` text, pill geometry. Signal Indigo is never the primary button. It marks
state and liveness; the moment it becomes a call to action it stops meaning
anything.

**The Two Papers Rule.** Light and dark are not one palette in two tints. Light
is paper: flat, no card shadow, grain in multiply. Dark is pure black: real
layered shadows, grain in screen. Never port a treatment across without
re-deciding it.

**The Cool Newsprint Rule (drift — correct before extending).** The intended
neutral character is a *cool blue-slate* off-white with deep blue-black ink,
as the token comments state. The shipped hexes have drifted warm — `#fefefb`
is bone, `#181410` is a brown-black, `#c6c2bb` is a warm gray. The cool intent
is normative; the current values are the incumbent implementation pending
correction. Do not add new neutrals matching the warm drift, and do not treat
the warmth as the system's character in new work.

## Typography

**Display Font:** EB Garamond (with Georgia, Times New Roman)
**UI / Body Font:** Roboto (with system-ui, Arial) — the default theme's face
**Long-form Font:** Source Serif 4 (with Georgia)
**Mono Font:** Geist Mono
**Signature Font:** Cormorant Garamond, italic
**Handwriting:** Caveat, for the hero doodle field only

**Character:** A humanist Garamond announcing, a neutral grotesque operating,
and a precise mono reporting. The pairing works because the roles never
overlap — the serif is never used for chrome and the grotesque is never used
for the author's voice.

The default theme is `midnight`, set pre-hydration from `localStorage`, and it
re-points `--font-display` and `--font-sans` at Roboto. Inter and Geist Sans
are the non-midnight grotesques and the face the two subdomain sites inherit;
Playfair Display serves the gradeVITian and VRF Bricks wordmarks. Because
Garamond and Source Serif 4 are bound through variables that `midnight`
deliberately does *not* override, the author's voice and the reading voice are
identical in every theme.

### Hierarchy

- **Display** (`.display-serif` + `.display-xl/lg/md`, Garamond 600, clamp
  2.65–4.25rem, line-height 1.03, tracking −0.016em): hero headlines and
  chapter labels. Garamond's small x-height means every step is set larger and
  leaded tighter than a grotesque equivalent would be. Italic within display
  drops to weight 500 and tracking −0.008em.
- **Headline** (h1, line-height 1.1, tracking −0.02em / −0.022em in midnight):
  page headings.
- **Title** (h2/h3, weight 600 — 500 in midnight, line-height 1.2–1.25):
  section and card headings.
- **Body** (`--text-body`, 0.9375rem; paragraphs line-height 1.8): card and
  interface copy. `--text-lead` (1.0625rem) opens bios and intros.
- **Prose** (Source Serif 4, 1.0625rem, line-height 1.85, max 68ch): article
  and lab body text, set in `fg-muted` with hanging punctuation. Prose
  headings switch to EB Garamond; `.prose h4` becomes an uppercase
  0.875rem/700 label at 0.07em tracking.
- **Label** (`--text-nano`, 0.625rem): chips, eyebrows, section micro-labels.
  `--text-micro` (0.6875rem) carries captions, timestamps, and hints.
- **Signature** (Cormorant Garamond italic 500): the sign-off mark only — a
  fine-nib italic standing in for a handwritten hand.

### Named Rules

**The Assigned Speaker Rule.** Before adding a typeface, name its speaker. If
the job belongs to a voice already cast — system, author, machine, reader — use
that face. A tenth font with no speaker is a bug.

**The Unthemeable Voice Rule.** `--font-garamond`, `--font-cormorant`, and
`--font-blog` are never overridden by a theme. Themes may swap the system's
voice; they may not swap the author's or the reader's.

**The Escape Hatch Rule.** Promote a serif to headline duty with the
`.display-serif` class, never by overriding `--font-display`. That variable is
how `midnight` swaps the whole site to Roboto, and both subdomains inherit it —
overriding it breaks the default experience and two other products at once.

## Layout

One continuous column, everywhere. The homepage is a stack of numbered
chapters, each a plain `<section>` with a rail that goes sticky at `lg`
(1024px) and is a normal stacked block below it — a single DOM tree with no
JS-driven layout branch.

`--nav-h` (50px) is the CSS source of truth for the sticky nav height, and
anchor targets clear it via `scroll-margin-top: calc(var(--nav-h) + 0.875rem)`
so a jump never parks a heading under the chrome. Prose headings carry a 6rem
scroll margin for the same reason.

Containers step up rather than filling: `max-w-6xl` at base, `xl:max-w-7xl`,
`2xl:max-w-[90rem]` for the nav and wide sections; `max-w-2xl` is the common
single-column block. Reading measures are set in characters, not pixels — 68ch
for prose, 62ch and 56ch for narrower editorial passages. Breakpoints are
Tailwind's defaults (640 / 768 / 1024 / 1280 / 1536); 1024 is the one that
carries real structural weight.

Spacing follows Tailwind's 0.25rem base. Cards are padded 1.25rem, rising to
1.5rem at `sm`. Mobile drops the sticky card-stacking behavior entirely rather
than shrinking it.

### Named Rules

**The One Column Rule.** The page reads as one column at every width.
Responsive work adjusts rhythm and stickiness, never the number of columns the
eye has to track.

## Elevation & Depth

Hybrid, and split by theme. **Light mode is flat** — `--shadow-card` is
literally `none`, and depth comes from the surface stack plus border weight.
**Dark mode is materially layered** — cards carry a real two-part shadow at
rest and a three-part shadow on hover, tuned in a blue-black
(`rgb(5 3 15 / …)`) rather than neutral black.

Depth in light mode is therefore *motion*, not shadow: the `card-lift` hover
raises a card 3px and only then introduces a shadow.

### Shadow Vocabulary

- **`--shadow-card`** (`none` light / `0 1px 3px 0 rgb(5 3 15/.5), 0 1px 2px -1px rgb(5 3 15/.35)` dark): the resting state of every card.
- **`--shadow-card-hover`** (`0 12px 32px -8px rgb(0 0 0/.08)` light / a three-layer blue-black stack in dark): applied by `.card-lift` on hover.
- **`--shadow-stack`** (`0 -16px 48px -8px rgb(0 0 0/.12)` light, `/.50` dark): upward-cast shadow for stacking sections, so a section reads as sliding over the one before it.

### Named Rules

**The Earned Depth Rule.** Surfaces are flat at rest in light mode. A shadow is
a response to state — hover, stacking, focus — never decoration on an idle
element.

## Shapes

Three semantic corners and nothing else: `chip` (0.5rem) for chips, tags and
small controls; `panel` (0.75rem) for dropdowns, drawers and code blocks;
`card` (1rem) for content cards. Pills (`9999px`) are reserved for two things —
the primary CTA and status/filter chips — which is what makes the pill read as
"this is an action or a state."

Borders do structural work everywhere. A card is `border-border` at rest and
`border-border-strong` on hover; the hover border change is part of the lift,
not a separate effect. Chapter rules are gradients, not solid lines: heavy at
the spine (`border-strong`), mid at 34% (`border`), transparent by the margin.

Scrollbars are 5px with a fully-rounded `border-strong` thumb on a transparent
track, and hidden entirely on horizontal chip rows and the chat textarea.

### Named Rules

**The Three Corners Rule.** Every radius comes from `chip`, `panel`, or `card`
— or it is a pill. An arbitrary `rounded-[14px]` is a bug.

## Components

### Buttons

- **Shape:** fully rounded pill for the primary action; `chip` radius (0.5rem) for accent and inline actions.
- **Primary:** ink on paper — `fg` background, `bg` text, `0.375rem 1.25rem` padding, medium weight, `hover:opacity-75` over 200ms. Used for the CTA in the nav, admin saves, and both subdomains' primary actions.
- **Accent:** `accent` background, white text, `chip` radius, semibold at 12px, hovering to `accent-hover`. Reserved for in-context actions inside a tool surface (the MCP explorer, chat cards), never for the page's main CTA.
- **Press:** every non-disabled button and `a[role=button]` drops to `scale(0.97)` with a 75ms transition. This is global and applies without opt-in.
- **Focus:** a 2px `accent` outline at 3px offset with a 6px radius, applied globally on `:focus-visible` only. Inputs inside styled containers suppress it and let the container show focus instead.

### Cards / Containers

- **Corner Style:** `card` (1rem, shipped as `rounded-2xl` in most call sites).
- **Background:** `surface`, on the `bg` page ground.
- **Border:** `border` at rest → `border-strong` on hover.
- **Shadow Strategy:** see Elevation — none at rest in light, real depth in dark.
- **Internal Padding:** 1.25rem, rising to 1.5rem at `sm`.
- **Interaction:** `.card-lift` raises 3px on hover and settles to `translateY(0) scale(0.99)` in 75ms on press, all on `cubic-bezier(0.16, 1, 0.3, 1)`.

### Chips

- **Style:** pill geometry, 10px semibold label.
- **Selected:** `accent` background, `accent-fg` text, `accent` border, subtle shadow — and in the skills grid, a `scale(1.05)`.
- **Unselected:** `surface` background, `border` border, `fg-faint` text, hovering to `fg` text and a 50%-alpha accent border.

### Inputs / Fields

- **Style:** `bg` background inside a `border` stroke at `chip` radius, `0.5rem 0.75rem` padding, `fg-faint` placeholder.
- **Focus:** outline suppressed; the border shifts to `accent`. The border *is* the focus indicator for fields.
- **Chat textarea:** transparent background, no ring at all — the surrounding composer owns the focus state, and its scrollbar is hidden.

### Navigation

- **Style:** sticky at `top-0`, `z-40`, on a solid `bg` ground, 50px tall, with a dot-grid texture that fades in to 18% opacity once scrolled.
- **Behavior:** hides on scroll-down and returns on scroll-up, with an idle timer.
- **Desktop:** three grouped triggers with hover dropdowns at `panel` radius, and a magnetic spotlight indicator that glides between triggers.
- **Active state:** `accent` icon and `fg` semibold label inside the dropdown; the spotlight carries the hover state.
- **Search trigger:** a pill on `surface-raised` with a `⌘K` / `Ctrl K` keycap in a bordered `kbd`, platform-detected on mount.

### Signature: The Paper Grain

A fixed full-viewport `body::after` overlay carrying an inline SVG
`feTurbulence` fractal noise (baseFrequency 0.75, 4 octaves), at 2.8% opacity
in `multiply` on light and 1.8% in `screen` on dark. It sits at `z-index: 9998`
with `pointer-events: none`. It is the single element that makes every other
surface read as paper, and it is why flat light-mode cards do not look empty.

### Signature: The Drop Cap

The first letter of every article's opening paragraph floats left at 3.1em in
EB Garamond 700, set in Signal Indigo, with a 0.78 line-height. The opening
paragraph itself runs at 1.09em in `fg-subtle`. Together they are the "settle
in" signal for long-form.

### Signature: The Ink Rule

An 900ms `scaleX(0 → 1)` from `transform-origin: left` on
`cubic-bezier(0.22, 1, 0.36, 1)` — a rule that draws itself the way a pen
finishes a stroke. Used under the signature mark.

### Motion

Two curves carry the whole system. `cubic-bezier(0.16, 1, 0.3, 1)` is the
standard ease for reveals (0.55s), card lift (0.3s), and drawers;
`cubic-bezier(0.22, 1, 0.36, 1)` is the entrance curve for page transitions
(0.4s) and the ink rule (900ms). Theme changes cross-fade background, color,
border, and shadow over 0.25s. Presses are 75ms.

`prefers-reduced-motion: reduce` is honored globally — scroll reveals resolve
to their visible state with no transition, and ambient loops are disabled.

### Named Rules

**The Two Curves Rule.** New motion uses `cubic-bezier(0.16, 1, 0.3, 1)` for
state response or `cubic-bezier(0.22, 1, 0.36, 1)` for entrances. Bounce and
elastic easing are not part of this system.

## Do's and Don'ts

### Do:

- **Do** make the primary action ink-on-paper (`bg-fg text-bg`, pill) and let Signal Indigo mark state instead.
- **Do** assign a speaker before adding a typeface — system (Roboto), author (Garamond), machine (Geist Mono), or reader (Source Serif 4).
- **Do** promote a serif to headline duty with `.display-serif`, never by overriding `--font-display`.
- **Do** pick radii from `chip` (0.5rem), `panel` (0.75rem), or `card` (1rem), or use a pill.
- **Do** use `.card-lift` for interactive cards so the 3px hover, the border shift, and the 75ms press all arrive together.
- **Do** set reading measures in `ch` (68 for prose, 62 or 56 for narrow passages).
- **Do** carry `prefers-reduced-motion` on every new animation — the homepage is motion-dense and the media query is already the house standard.
- **Do** reference semantic tokens (`bg-surface`, `text-fg-muted`, `border-border`) rather than raw Tailwind palette classes.

### Don't:

- **Don't** build the generic developer-portfolio dark mode — neon-on-black, monospace-everything, glowing gradient orbs. Mono is a reporting voice here, not a theme.
- **Don't** add a shadow to a light-mode element at rest. Depth in light is motion and border weight.
- **Don't** use bounce or elastic easing; the system has exactly two curves.
- **Don't** animate `width`, `height`, `padding`, or `margin`. Use `transform` and `opacity`.
- **Don't** spread Signal Indigo into decoration — it means "live" or "current," and dilution costs it that meaning.
- **Don't** introduce new neutrals matching the current warm drift; the intended character is cool blue-slate (see The Cool Newsprint Rule).
- **Don't** override `--font-garamond`, `--font-cormorant`, or `--font-blog` in a theme. The author's and reader's voices are not themeable.
- **Don't** branch the homepage into a second layout tree for mobile — one column, one DOM, stickiness toggled at `lg`.
