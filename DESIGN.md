---
name: jayaremala.com
description: An editorial newsprint system where every typeface is an assigned speaker — the system, the author, the machine, and the reader.
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
  signal-indigo: "#3730a3"
  signal-indigo-hover: "#312e81"
  signal-indigo-light: "#e9e8f7"
  signal-indigo-fg: "#ffffff"
  signal-violet: "#6d28d9"
  accent-shared: "#4f46e5"
  accent-shared-secondary: "#8b5cf6"
  dark-bg: "#000000"
  dark-surface: "#0c0c0c"
  dark-surface-raised: "#181818"
  dark-border: "#252525"
  dark-border-subtle: "#161616"
  dark-border-strong: "#3a3a3a"
  dark-fg: "#f0f0f0"
  dark-fg-muted: "#cccccc"
  dark-fg-subtle: "#888888"
  dark-fg-faint: "#484848"
  dark-signal-indigo: "#6f7bf7"
  dark-signal-indigo-hover: "#93a0fb"
  dark-signal-indigo-light: "#14142b"
  dark-signal-violet: "#8b7cf6"
typography:
  display:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.65rem, 4.4vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "-0.016em"
    fontFeature: "kern 1, liga 1"
  display-lg:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.016em"
  headline:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.016em"
  title:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
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
  voice-serif:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  dateline:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.16em"
  label:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    letterSpacing: "0.2em"
  signature:
    fontFamily: "Cormorant Garamond, EB Garamond, Georgia, serif"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.005em"
  marginalia:
    fontFamily: "Caveat, Segoe Print, Bradley Hand, cursive"
    fontWeight: 400
    lineHeight: 1.05
rounded:
  chip: "0.5rem"
  panel: "0.75rem"
  card: "1rem"
  pill: "9999px"
spacing:
  micro: "0.375rem"
  xs: "0.625rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  chapter: "4rem"
  chapter-lg: "8rem"
components:
  button-ink:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.25rem"
  button-ink-hover:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
  button-quiet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg-faint}"
    rounded: "{rounded.chip}"
    padding: "0.375rem 0.875rem"
  chip-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg-faint}"
    rounded: "{rounded.chip}"
    padding: "0.375rem 0.875rem"
  chip-filter-active:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    rounded: "{rounded.chip}"
  card-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.chip}"
    padding: "0.625rem 0.875rem"
  input-chat:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 0.875rem"
  nav-bar:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg-muted}"
    height: "50px"
---

# Design System: jayaremala.com

## Overview

**Creative North Star: "Three Voices"**

The site is a printed thing that happens to run in a browser. Its material is
newsprint and ink: an off-white sheet, a deep near-black ink, hairline column
rules doing the work that boxes and shadows do elsewhere. Nothing floats
decoratively; where something lifts, it lifts because you touched it.

The organizing idea is that type is casting, not decoration. **Roboto is the
system talking** — chrome, labels, UI copy, the default `midnight` theme
applied pre-hydration by an inline script so the first paint is already
correct. **EB Garamond (and Cormorant for the signature) is the author
talking** — hero and chapter headlines, pull-quotes, opinions, the signature
mark. **Geist Mono is the machine reporting** — measurements, datelines,
uptime counters, model ids, anything the build knows rather than claims.
**Source Serif 4 is the reader's voice** — long-form `/blog` and `/lab` prose,
set at reading size and never themed away. A visitor should be able to tell who
is speaking without reading a word.

Density is editorial, not dashboard: one column, generous vertical rhythm
between chapters, tight leading inside them. Colour is almost entirely absent —
the page is ink on paper, and a single indigo appears only where something is
alive. The confirmed anti-reference is the generic developer-portfolio dark
mode: neon-on-charcoal, gradient hero, glassmorphic cards, a rainbow of tag
colours. This system rejects all of it.

**Key Characteristics:**
- Ink-on-paper primaries; a cool newsprint sheet and a deep near-black ink
- One accent, Signal Indigo, reserved for live state
- Four assigned typefaces, each with a fixed speaker
- Hairline rules and ruled bands instead of nested cards
- Flat at rest; depth is earned by interaction
- One continuous reading column at every viewport
- Paper grain over the whole page (2.8% multiply noise, 1.8% screen in dark)

## Colors

Two papers and one ink, plus a single indigo that means "this is running".

### Primary
- **Signal Indigo** (`{colors.signal-indigo}` light, `{colors.dark-signal-indigo}` dark): the portfolio's only accent. It marks live state and nothing else — the pulsing dot on a still-running product, an open booking slot, the active nav item, the focus ring, the drop cap, the prose link, the hairline that wipes across a tile on hover. Deepened from the shared site indigo toward the ink so it reads as a second ink rather than a UI highlight (9.86:1 on light paper, 5.85:1 on black).
- **Shared Indigo** (`{colors.accent-shared}`): the unscoped `:root` accent that gradeVITian still runs on. The portfolio overrides it inside `.portfolio`; it is not the portfolio's colour.

### Secondary
- **Signal Violet** (`{colors.signal-violet}`): a supporting hue with a deliberately narrow brief — the second stop of the gradient micro-label and the ambient scan-line. Never a state, never a category.

### Neutral
- **Newsprint** (`{colors.bg}`): the page. Off-white with a faint warm cast in the shipped hex.
- **Sheet** (`{colors.surface}`) / **Raised Sheet** (`{colors.surface-raised}`) / **Sunken Sheet** (`{colors.surface-sunken}`): the only tonal steps. Cards, hover beds, table headers.
- **Column Rule** (`{colors.border}`), **Faint Rule** (`{colors.border-subtle}`), **Heavy Rule** (`{colors.border-strong}`): the three line weights. Heavy opens a rule and marks a pull-quote's spine; standard divides ruled bands; faint separates rows inside one band.
- **Ink** (`{colors.fg}`) → **Muted** (`{colors.fg-muted}`) → **Subtle** (`{colors.fg-subtle}`) → **Faint** (`{colors.fg-faint}`): the full four-step ink ramp, and the system's real hierarchy device. Distinction is full ink; dormant is faint.
- **Pure Black** (`{colors.dark-bg}`): dark mode is true black, OLED-ready, with a near-white ink. Not a dark grey theme.

### Named Rules
**The One Ink Rule.** Emphasis is ink weight, not hue. A thing is important because it is set in full `fg` while its neighbours sit at `fg-subtle`, never because it was tinted. Audit test: desaturate a screen; if the hierarchy survives, it obeyed the rule.

**The Two Papers Rule.** There are two papers, `bg` and `surface`, plus a raised and a sunken step for edges. A surface never invents a third tint, a tinted card, or a coloured panel.

**The Cool Newsprint Rule.** The neutral ramp is normatively cool blue-slate — quality newsprint under natural light. The shipped hexes carry a warm cast (`#fefefb` / `#181410`) that is known drift, not intent; the correction is still pending. New neutrals are chosen cool.

**The Signal Rule.** Signal Indigo means live: something running, open, active, or focused. It is not a brand wash, not a category colour, and not a hover flourish on a static element. Live is indigo, distinguished is full ink, dormant is faint — three states, one hue.

**The No-Category-Colour Rule.** Tags, skills, project types, roles and post kinds are never colour-coded. They are distinguished by ink weight, rule weight, and position.

## Typography

**Display Font:** EB Garamond (with Georgia, Times New Roman, serif) — via `.display-serif`
**Body Font:** Roboto (with system-ui, Arial, sans-serif) — the `midnight` default
**Reading Font:** Source Serif 4 (with Georgia, serif) — `--font-blog`, long-form only
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace)
**Signature:** Cormorant Garamond italic; **Marginalia:** Caveat

**Character:** A humanist Garamond announcing over a neutral Roboto that reports,
with a monospace that only ever states measured fact and a reading serif kept
for the reader alone. The pairing is a newspaper's: a masthead voice, a body
voice, and an agate voice, each doing one job.

### Hierarchy
- **Display** (600, `clamp(2.65rem, 4.4vw, 4.25rem)`, 1.0, `-0.016em`): the hero headline. Garamond's small x-height means every step is set larger and leaded tighter than a grotesque equivalent would be. The vw factor is deliberately modest so the headline never pushes the CTAs and signature below the fold.
- **Display Large** (600, `clamp(2rem, 4.4vw, 3.5rem)`): page titles across `/blog`, `/lab`, `/experience`, `/projects`, `/education`, `/apps`, `/now`.
- **Headline** (600, `clamp(1.5rem, 2.4vw, 2.1rem)`, 1.12): chapter labels in the home page rail.
- **Title** (600, `1rem`, 1.25, `-0.006em`): card and section headings; Roboto.
- **Body** (400, `0.9375rem`, 1.55): all UI and card copy. `text-lead` (`1.0625rem`, 1.8) for bios and intro paragraphs.
- **Prose** (400, `1.0625rem`, 1.85, max 68ch): `/blog` and `/lab` article bodies in Source Serif 4, with Garamond headings, a Garamond drop cap in Signal Indigo, and hanging punctuation.
- **Dateline** (`0.6875rem`, uppercase, `0.16em`, tabular): Geist Mono. `PLACE / YEAR` above a chapter heading, and every measurement line beneath one.
- **Label** (700, `0.625rem`, uppercase, `0.2em`): section micro-labels and stat captions.
- **Ghost numeral** (Garamond 500, `clamp(4rem, 8vw, 8.5rem)`, 5–6% ink, lining + tabular figures): the chapter's typographic anchor, set behind the rail label.

### Named Rules
**The Assigned Speaker Rule.** Four faces, four speakers: Roboto is the system, Garamond/Cormorant is the author, Geist Mono is the machine, Source Serif 4 is the reader. Before setting a new string, name its speaker; that names the face. A measurement never appears in Garamond, and an opinion never appears in mono.

**The Unthemeable Voice Rule.** `--font-garamond`, `--font-cormorant` and `--font-blog` are deliberately never overridden by `[data-theme]`. The author's voice and the reader's voice survive every theme; only the system's voice swaps.

**The Escape Hatch Rule.** The display serif is a class (`.display-serif`), never a `--font-display` override. That variable is the hatch `midnight` — the default theme — uses to swap the whole site to Roboto, and gradeVITian and VRF Bricks inherit it and must stay grotesque. Overriding it would silently break the experience most visitors get.

**The Ghost Numeral Rule.** A chapter is counted once, by the oversized ghost numeral in the rail. No second mono numeral, no third line above the heading; the dateline below carries the filing.

## Layout

One continuous reading column at every viewport. The home page is a stack of
plain `<section>` chapters inside a container that steps `max-w-6xl` →
`xl:max-w-7xl` → `2xl:max-w-[90rem]`, padded `px-4` → `sm:px-6` → `md:px-8`,
with a wider right gutter at `xl` (`xl:pr-16`) reserving a lane for the fixed
section indicator.

Each chapter is a two-column grid only from `lg` up: a `13rem` → `xl:15rem` →
`2xl:17rem` rail beside a `minmax(0,1fr)` body, gap `lg:3.5rem` → `xl:5rem`.
Below `lg` the rail is a normal stacked block. The rail goes `lg:sticky` in pure
CSS — no matchMedia, no ResizeObserver, no scroll handler — so its identity
stays with you while the body scrolls past, and it degrades on its own.

Vertical rhythm is the chapter interval: `pt-16 pb-12` on phones rising through
`sm` / `md` / `lg` to `xl:pt-36 pb-24`. The sticky nav is 50px (`--nav-h`), and
chapters carry `scroll-margin-top: calc(var(--nav-h) + 0.875rem)` so an anchor
jump never parks a heading under the chrome.

Reading measures are capped explicitly: prose 68ch, testimonials 68ch,
experience and education bullet lists 72ch, standfirsts and body columns 62ch,
decks and short annotations 46ch.

Breakpoints are Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280,
`2xl` 1536). Mobile disables the legacy sticky card-stacking entirely
(`.stack-pin` → static below 768px) so native momentum scroll stays smooth.

### Named Rules
**The One Column Rule.** The page is one column of reading at every width. Side rails carry identity, never content the reader must have. A layout that only works above `lg` is not a layout.

**The Measure Rule.** Every run of text declares its measure. Nothing sets wider than 72ch, and prose sets at 68ch.

## Elevation & Depth

The system is flat at rest. `--shadow-card` is literally `none` in light mode;
depth in daylight is carried by hairline borders and the two paper tints, not by
shadow. Dark mode gets a minimal resting shadow (a 1px/3px pair at 50%/35%
black) because on true black a border alone loses the edge.

Shadow is a response, not a property. `.card-lift` translates a surface up 3px
and swaps to `--shadow-card-hover` over 300ms on the site's one easing curve;
`:active` settles it back to `translateY(0) scale(0.99)` in 75ms. Buttons scale
to 0.97 on press globally. The only ambient shadow left is `--shadow-stack`, an
upward cast under stacked sections, and the reading-mode spotlight
(`0 0 0 100vmax rgba(0,0,0,0.62)`) which is a scrim expressed as a shadow so it
survives ancestor stacking contexts.

### Shadow Vocabulary
- **Rest, light** (`box-shadow: none`): the default. Borders do the work.
- **Rest, dark** (`0 1px 3px 0 rgb(5 3 15 / 0.5), 0 1px 2px -1px rgb(5 3 15 / 0.35)`): the minimum needed to hold an edge on black.
- **Lift, light** (`0 12px 32px -8px rgb(0 0 0 / 0.08)`): hover on an interactive tile only.
- **Lift, dark** (`0 4px 16px -2px rgb(5 3 15 / 0.65), 0 8px 32px -4px rgb(5 3 15 / 0.50), 0 1px 3px 0 rgb(5 3 15 / 0.35)`): the same gesture, more layers to read on black.
- **Stack** (`0 -16px 48px -8px rgb(0 0 0 / 0.12)`; `0.50` in dark): the upward cast under a stacked section.

### Named Rules
**The Earned Depth Rule.** Surfaces are flat until touched. Shadow is the response to hover, focus, or press — never a resting decoration, and never a substitute for a rule or a tint.

**The Ruled Band Rule.** A group of related figures is a ruled band — `border-y` on the group, `divide-x` between the cells — not a row of cards. Cards nested inside cards are the failure mode this replaced; every line in a band is present at rest, never gated behind a hover a touch device cannot reach.

**The No-Scrim Rule.** The nav meets content at a clean edge. It carries the page background, not a translucent wash — a scrim over the sticky chrome dropped body copy behind it to roughly 2:1 and was removed.

## Shapes

Three corners and no more: `chip` (0.5rem) for tags, small controls and input
fields; `panel` (0.75rem) for dropdowns, drawers and code blocks; `card` (1rem)
for the canonical content card. A fourth shape exists and is deliberately not on
the ramp — the full pill (`9999px`), reserved for actions and the chat input,
so a thing you press never has the same silhouette as a thing you read.

Borders are the primary form language. Three weights of the same hairline —
`border-strong` where a rule begins, `border` where it divides, `border-subtle`
where it merely separates rows — carry nearly all structure. The chapter rule is
a gradient hairline that starts heavy at the spine and vanishes before the
margin: a column rule, not a UI divider. Pull-quotes hang off a single
`border-l border-border-strong` with hanging punctuation. Dotted chains
(radial-gradient at 3px/11px, masked to fade at both ends) stand in for dividers
where a hard rule would be too loud.

Recurring geometry: the 24px dot grid (hero, nav, footer), the corner-bracket
motif on bracketed tiles, and the avocado mark used as the chapter bullet.

### Named Rules
**The Three Corners Rule.** Chip, panel, card. A new surface picks one of the three or it picks the pill because it is an action. There is no fourth radius.

**The Rule Before The Box Rule.** Reach for a hairline before a container. If a border, a gradient rule, or a divided band can express the grouping, it does — a bordered box is the last resort, not the first.

## Components

### Buttons
- **Shape:** Full pill (`9999px`) for actions; chip (0.5rem) for quiet controls.
- **Primary — the ink pill:** solid ink on paper (`bg-fg` / `text-bg`), `0.625rem 1.25rem`, Roboto 500 at body size. The single highest-commitment affordance on any page: Schedule a call, Send message, Ask Avocado.
- **Hover / Focus:** opacity to 75% over 200ms — the ink thins, it does not change colour. Global `:active` scales to 0.97 in 75ms. Focus-visible is a 2px Signal Indigo outline at 3px offset, 6px radius, applied globally.
- **Quiet / Ghost:** paper background, hairline border, `fg-faint` text rising to `fg` on hover. No fill, no shadow.

### Chips
- **Style:** Chip radius, `bg-surface`, hairline border, `fg-faint` label at 12px with a 10px count badge.
- **State:** Selected inverts to solid ink (`bg-fg` / `text-bg` / `border-fg`); unselected stays paper. Filter state is expressed by inversion, never by hue.

### Cards / Containers
- **Corner Style:** Card (1rem), from the shared `Tile` primitive.
- **Background:** `surface` on `bg`, hairline `border`.
- **Shadow Strategy:** none at rest; `card-lift` only when the tile is interactive (see Elevation & Depth).
- **Border:** hairline, strengthening to `border-strong` on hover.
- **Internal Padding:** `1.25rem` typical, `1.5rem` at `sm` and up.
- **Sweep:** an optional 1px Signal Indigo hairline pinned to the top edge that wipes in left-to-right (`scale-x-0` → `scale-x-100`, 300ms) on hover. It is a boolean, not a colour — there is no per-tile gradient.
- **Brackets:** optional 10px corner brackets at 50% border ink, warming to 40% accent on hover.

### Inputs / Fields
- **Style:** Chip radius, page background (`bg`), hairline border, `0.625rem 0.875rem`. Font-size is forced to 16px below 640px to stop iOS auto-zoom.
- **Focus:** the container takes the state, not the field — `focus-within:border-accent`. The inner `input`/`textarea` has its own outline and ring suppressed by design.
- **Chat input:** the same field as a full pill, with a double box-shadow focus ring (3px page-coloured gap, then 5px indigo at 45%) instead of a border shift.
- **Disabled:** 60% opacity, border held at `border`.

### Navigation
- **Style:** sticky, 50px tall, on the page background with no scrim and no blur over content. Content meets it at a clean edge.
- **Typography:** Roboto at 14px for links; the wordmark is a 20px serif at wide tracking.
- **States:** a sliding rounded-md indicator follows the hovered item; the active item is full ink with an indigo icon; inactive is `fg-muted`. Dropdowns are panel-radius surfaces at 95% opacity with a 14px backdrop blur and a hairline ring — blur applies to menus, never to the bar.
- **Mobile:** an 11px-minimum-height icon row and a panel-radius drawer; a chat FAB sits fixed on portfolio pages.
- **Ambient:** a 24px dot grid fades to 18% inside the nav pill once the page is scrolled.

### The Chapter Dateline
The home page's signature device. A chapter that records a real deployment is
filed like a field note: a mono `PLACE / YEAR` line at 11px, uppercase, `0.16em`
tracking, with the place in `fg-muted`, the slash in `fg-faint`, and the year
tabular. The Garamond chapter label sits directly under it, then the gradient
column rule draws itself left-to-right over 900ms, then an optional 46ch deck,
then — separated by a `border-subtle` top rule — the mono measure line: what that
site cost or produced. Chapters that argue rather than record leave the dateline
unset and read as a plain heading. Four of the home page's chapters are filed
this way.

### The Still-Running Ledger
A row per shipped product, dot-leadered across the measure. A pulsing Signal
Indigo dot (a solid dot under an `animate-ping` halo) marks live; an archived
entry drops to a faint static dot. The uptime is mono and tabular and counts real
years and days. Rows have no borders — they are a hover bed (`surface-raised`) at
panel radius and a leader line of `border`-coloured dots that warms to 40% accent
on hover.

## Do's and Don'ts

### Do:
- **Do** name the speaker before choosing a face: system (Roboto), author (Garamond/Cormorant), machine (Geist Mono), reader (Source Serif 4).
- **Do** build hierarchy from the four-step ink ramp — `fg` → `fg-muted` → `fg-subtle` → `fg-faint` — before reaching for any colour.
- **Do** reserve Signal Indigo for live state: running, open, active, focused.
- **Do** express a group of figures as a ruled band (`border-y` + `divide-x`) at reading scale, with every line visible at rest.
- **Do** pick one of the three corners (chip 0.5rem, panel 0.75rem, card 1rem), or the pill if it is an action.
- **Do** cap the measure — 68ch for prose, 72ch for bullet lists, 62ch for body columns.
- **Do** let depth be earned: flat at rest, `card-lift` on hover, 0.97 on press.
- **Do** file a real deployment with a mono `PLACE / YEAR` dateline and a mono measure line.
- **Do** add every new ambient or infinite animation to the `prefers-reduced-motion` block, and reset the property it holds hostage (`scaleX(1)`, `stroke-dashoffset: 0`, `opacity: 0`) rather than only killing the animation.
- **Do** keep the author's and reader's faces out of `--font-display`; that variable is the theme escape hatch.

### Don't:
- **Don't** colour-code categories, tags, skills, or post types. No emerald/teal/amber/orange/sky/violet ramps on reading surfaces.
- **Don't** introduce a third paper tint or a tinted card to signal state; invert to ink instead.
- **Don't** nest a card inside a card. If it needs grouping, rule it.
- **Don't** put a scrim, wash, or blur behind the sticky nav over body content.
- **Don't** gate information behind hover — a touch device will never see it.
- **Don't** override `--font-display`, `--font-garamond`, `--font-cormorant`, or `--font-blog` per theme.
- **Don't** add a resting shadow in light mode; `--shadow-card` is `none` there on purpose.
- **Don't** invent a fourth radius or a bespoke per-component corner.
- **Don't** set a measurement in a serif or an opinion in mono.
- **Don't** reach for the generic developer-portfolio dark mode: neon on charcoal, gradient heroes, glass cards, rainbow tags.
