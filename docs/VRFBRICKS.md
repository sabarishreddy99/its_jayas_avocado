# VRF Bricks — vrfbricks.jayaremala.com

Venkata Ramana Fly Ash Cement Bricks, Kavali, Nellore District. Proprietor
Remala Govinda Reddy. Trading since 2014.

This is a rebuild of the original `vrfbricks.github.io`, archived verbatim at
`docs/vrfbricks-original/`.

---

## Routes

| Subdomain URL | Route segment | What it is |
|---|---|---|
| `/` | `app/vrfbricks/page.tsx` | The story, the three bricks, the process, where to find the yard |
| `/bricks/` | `app/vrfbricks/bricks/` | Full sizes, spec tables, dimension drawings, brick quantity calculator |
| `/why-fly-ash/` | `app/vrfbricks/why-fly-ash/` | Fly ash vs red clay comparison, IS 12894, field tests a buyer can run |
| `/delivery/` | `app/vrfbricks/delivery/` | Truck loads, lead time, charges, self pick-up |
| `/visit/` | `app/vrfbricks/visit/` | Address, hours, map, WhatsApp enquiry composer |
| `/404/` | `app/vrfbricks/404/` | Served by nginx as the `error_page 404` body |

Served from the same static export as the portfolio and gradeVITian. nginx maps
the subdomain root onto the `vrfbricks/` subtree — see
`infra/nginx/vrfbricks.conf`.

---

## File structure

Mirrors gradeVITian exactly: route segment, flat component folder, `lib/` for
logic, `data/` for content. Flat rather than nested, because that is this
repo's convention (gradeVITian has 40 components in one folder) and a second
organising scheme would be worse than none.

```
app/vrfbricks/              routes; each page.tsx is a thin server shell that
                            exports metadata + JSON-LD and renders one client
                            component. Keeps metadata server-side while the
                            page body can use the language context.
  layout.tsx                fonts, metadata, LocalBusiness JSON-LD, chrome
  page.tsx  bricks/  why-fly-ash/  delivery/  visit/
  404/  not-found.tsx       the nginx error_page body
  opengraph-image.tsx       the 1200x630 social card

components/vrfbricks/
  VRFNav / VRFFooter / VRFStickyBar     chrome
  VRFHome / VRFBricksPage /             one per route, the page bodies
    VRFWhyPage / VRFDeliveryPage /
    VRFVisitPage
  VRFUi                                 buttons, icons, Section, Chapter,
                                        Headline, Eyebrow, Inner
  VRFField                              VRFInput, VRFSelect, VRFLabel
  VRFPhoto                              photos + the true-size registry
  VRFFaq / VRFTestimonials              reusable trust blocks
  BrickDiagram / BrickCalculator        the product primitives
  QuoteComposer                         the WhatsApp message composer
  VRFLang / VRFLink /                   plumbing
    VRFCanonicalRedirect / VRFJsonLd
  whatsapp.ts                           wa.me + tel + directions link builders

lib/vrfbricks/
  nav.tsx                   the one nav list, used by nav, drawer and footer
  seo.ts                    canonical URLs, metadata, all JSON-LD
  useVrfBase.ts             mount-point prefix hook

data/vrfbricks/
  business.ts               facts. Single source of truth.
  copy.ts                   every rendered string, en + te, plus FAQ
  testimonials.ts           empty by design, see below
```

---

## Design system

This site does **not** have its own palette. It inherits the whole site design
system: the same semantic tokens (`bg` / `fg` / `accent` / `border`), the same
type scale, the same dark mode, the same `ScrollReveal` primitive, and the same
Cormorant editorial headline voice used by the portfolio and gradeVITian.

It overrides **the accent, and only the accent**: indigo becomes terracotta, the
colour of the kiln-fired clay brick this product replaces. That is the whole
customisation, and it is what makes the page read as Govinda Reddy's business
rather than as an entry in somebody's portfolio.

It also borrows the **geometry**, which is what actually makes two sites look
related: `rounded-full` pill buttons, `rounded-2xl` cards edged with
`ring-1 ring-border` rather than a hard border, `bg-surface-raised` fills, and
the glassy `bg-surface/95 backdrop-blur-[14px]` dropdown panel with the
portfolio's exact two-layer box-shadow. The nav is the portfolio's nav: sticky,
hides on scroll-down and returns on scroll-up or idle, gradient scrim, a
floating pill that gains background and dot-grid once scrolled, a Playfair
wordmark, and a spotlight that glides between links. `ThemeToggle` is the
shared component, so light and dark work identically across all three sites.

Two things belong to VRF alone:

- **The stretcher bond** (`.vrf-bond`), drawn from the real 11 x 7 inch brick
  face ratio, sits behind sections in the role `HeroDotGrid` plays elsewhere.
- **Anek Telugu.** None of the site's Latin faces carry a single Telugu glyph,
  so `.vrf` appends Anek to the font stack and the browser falls through per
  glyph. Remove it and every Telugu string becomes tofu boxes.

Page structure follows the house rhythm: numbered `<Chapter>` markers, a
Cormorant `<Headline>` per act, one idea per act. The home page runs
01 The Yard, 02 How We Make It, 03 The Bricks, 04 Quality, 05 Trust,
06 Our Customers, 07 Answers, 08 Come and See.

---

## Two hard rules

**1. No em dashes in rendered copy, in either language.** The whole site dropped
them in commit `274dec2` and this subtree follows. Use a colon when the second
half explains the first, a full stop when it is a new thought, a comma when it
is an aside. Do not swap one dash for another. Comments in code are exempt. En
dashes in ranges (`06:00–21:00`) are fine and used across the rest of the site.

Check before shipping:
```bash
grep -o '—' frontend/out/vrfbricks/index.html | wc -l   # must be 0
```

**2. Never invent a testimonial.** See the next section.

**Photographs are registered, not hand-sized.** `VRFPhoto` holds every photo's
real pixel dimensions and shapes its container to that exact ratio, so nothing
can be cropped; and it caps display width at or below native width, so nothing
can be upscaled. An earlier version laid photos out full-bleed at `h-[46vw]`
with `object-cover`, which stretched a 1152px source across a 1920px screen and
then cropped whatever did not fit. If you add a photo, add it to `PHOTOS` with
its true size (`sips -g pixelWidth -g pixelHeight <file>`) and it is impossible
to distort.

---

## Where to edit things

**All rendered text lives in `src/data/vrfbricks/copy.ts`.** Never write copy
into a component. Every string is an `{ en, te }` pair and the `T` type will not
compile if you add one without its Telugu twin.

**All facts live in `src/data/vrfbricks/business.ts`** — address, phone, hours,
brick sizes, truck loads. Change a brick's dimensions there and the spec table,
the dimension drawing, the calculator, the JSON-LD and the social card all follow.

| To change | Edit |
|---|---|
| Any wording, in either language | `src/data/vrfbricks/copy.ts` |
| Phone, address, hours, sizes | `src/data/vrfbricks/business.ts` |
| Titles, descriptions, structured data | `src/lib/vrfbricks/seo.ts` |
| Colours, the brick-bond motif | the `.vrf` block at the end of `src/app/globals.css` |
| Photographs | `public/vrfbricks/photos/` |
| Sitemap page list | `scripts/gen-vrf-sitemap.mjs` |
| Customer testimonials | `src/data/vrfbricks/testimonials.ts` |
| FAQ (visible **and** schema) | the `FAQ` array in `copy.ts` |

The FAQ array is read by both `<VRFFaq>` and `faqLdFor()` in `seo.ts`, so the
structured data can never describe a question the visitor cannot see. Google
requires the answer to be visible on the page it is marked up on; a mismatch is
what gets rich results suppressed rather than shown. Never add an FAQ entry to
one without the other.

---

## Photographs — read this before adding any

`public/vrfbricks/photos/yard-kavali.jpg` is **the only genuine photograph of
this business.** It is the actual yard, the actual mixer, the actual truck. It
is the hero of the home page and it is deliberately exempt from the site's
colour treatment (`.vrf-photo-true`) — it is shown as it was taken.

Every other photograph is sourced editorial stock (Pexels licence, commercial
use permitted). Each one carries a visible caption saying so. **This rule is not
optional:** a sourced photograph must never be captioned, implied or laid out as
if it documents this yard, this team or this product. A brick supplier's entire
asset is being believed, and the original site lost that by filling its gallery
with other companies' catalogue images — including a photo of hollow blocks,
a product Govinda Reddy does not make.

The product itself is carried by **generated dimension drawings**
(`BrickDiagram.tsx`), not photographs. The geometry is computed from
`brick.inches`, so the shape on screen is the shape in the yard. This is also
simply more useful: a buyer choosing between a 5.5-inch and a 4-inch brick needs
the proportion and the numbers, and no photograph of a grey brick against grey
ground gives them either.

If Govinda Reddy sends real photographs, replace the stock ones and delete their
"illustrative photograph" captions. Useful shots, in order of value:
1. Him standing at the yard.
2. The hydraulic press mid-cycle.
3. A hand holding one brick, edge on, against the sky.
4. A finished house built from these bricks, with the owner's permission.
5. A loaded truck leaving the yard.

---

## Testimonials: the empty state is deliberate

`src/data/vrfbricks/testimonials.ts` exports an **empty array**, and the
"What our customers say" section renders an honest empty state that says so and
offers the visitor a real customer's phone number instead.

Do not fill it with placeholder quotes, quotes adapted from another supplier's
site, or anything an AI assistant generated to make the layout look finished. A
fabricated review is a fabricated record: it is illegal in most jurisdictions as
a deceptive trade practice, and on a business where the proprietor's own name is
above the door it is not a small thing. Four honest, specific, slightly awkward
quotes from named local people will out-convert forty polished anonymous ones.

The site already carries a "Send your experience" WhatsApp button pointed at the
yard. When a customer replies: ask permission to publish their words, their name
and their village; keep their wording rather than tidying it into marketing
English; and add the entry. The file documents the shape.

---

## Enquiries go to WhatsApp, not a form

`QuoteComposer.tsx` posts nothing anywhere. The fields assemble a message and
the button is a `wa.me` deep link. That means the buyer sees exactly what they
are sending and keeps a copy in their own chat history, the message lands on the
phone Govinda Reddy already carries, and this static site needs no backend, no
database and no privacy policy covering stored personal data.

Every field is optional by design. The old Google Form rejected the whole
submission if any required field was blank; here, a buyer who types only "5000"
still produces a useful message.

To change the number, edit `BUSINESS.whatsapp` in `business.ts` (bare digits, no
`+`, no spaces).

---

## Bilingual behaviour, and its one trade-off

English is the server-rendered default; Telugu is applied on hydration from
`localStorage`. Because this is a static export there is no server-side cookie
read, so **the Telugu copy is not in the prerendered HTML and is therefore not
indexed by Google.**

That is a deliberate trade: stable, crawlable English HTML for the search
traffic that is the entire demand channel, versus a flash-free first paint for
Telugu readers. If Telugu indexing ever matters more, the fix is separate
`/te/` routes with `hreflang` — not a change to this toggle.

---

## NEEDS_CONFIRMATION — the handover list

`business.ts` ends with a `NEEDS_CONFIRMATION` block. Every entry is something
that would materially strengthen the site but that **only Govinda Reddy can
confirm.** Anything whose `confirmed` flag is `false` is skipped at render time,
so the site never shows an unverified claim.

Ask him for these, fill in the value, flip the flag:

| Field | Why it matters |
|---|---|
| `pricing` | Prices are currently quoted per enquiry. Publishing them wins search traffic, but only once they are current. |
| `capacity` | "We press N bricks a day" is a concrete trust signal. |
| `gstin` | Contractors and builders ask for this before anything else. |
| `testReport` | A lab report against IS 12894 is the single strongest credibility asset a brick yard can have. |
| `flyAshSource` | A named source (which power station) turns a vague claim into a verifiable one. |
| `deliveryRadiusKm` | Lets the delivery page answer "do you come to my village?" |
| `projects` | Named completed jobs, with the owners' permission. |
| `googleBusinessProfile` | **The biggest single local-SEO win available.** See below. |
| `geo` | Exact yard coordinates. Until confirmed, the map and the JSON-LD both fall back to the postal address. |

### The address, and why the map is derived

The owner-confirmed address is:

> Venkata Ramana Fly Ash Cement Bricks, Thummalapenta Rd, Kavali,
> Andhra Pradesh **524203**, India

The original site printed PIN **524201**, which was wrong, and mixed a landmark
("near Kolkata-Chennai Highway Crossing") into the street line. A wrong PIN on a
`LocalBusiness` record is not cosmetic: it is what Google geocodes against.

Three things follow from that and are worth not undoing:

1. **The map is generated, not pasted.** `mapEmbedUrl()` builds the embed from
   the address. The original was a Google MyMaps file with a fixed `mid=`, drawn
   in 2020, carrying an unchecked pin that could never follow a corrected
   address. Never paste a fixed map URL back in.
2. **`directionsLink` sends the address, not coordinates.** It used to send
   lat/lng accurate only to Kavali town centre, which could route a loaded truck
   to the wrong end of town.
3. **`geo` is omitted from the JSON-LD.** Asserting a precise point you do not
   know moves the map pin; Google geocodes the postal address fine on its own.

All three sharpen automatically the moment `NEEDS_CONFIRMATION.geo` is filled
in: stand in the yard, long-press your location in Google Maps, read off the
pin. Creating the Google Business Profile also produces it.

---

## The one thing worth doing outside this repo

**Create a Google Business Profile for the yard.** For a local materials
supplier this outranks everything in this codebase combined: it is what puts the
business into Google Maps and into the local pack for "fly ash bricks near me".
The site is already emitting matching `LocalBusiness` structured data (name,
address, geo, opening hours, phone), so a profile created with the same details
will corroborate it rather than compete with it.

Once it exists, put the URL into `NEEDS_CONFIRMATION.googleBusinessProfile` — it
gets emitted as `sameAs` in the structured data, which links the two together.

---

## Deployment

Nothing extra to do — the existing workflow already covers it. `frontend/out/`
is rsynced to `/var/www/gv-site/` on Lightsail by
`.github/workflows/deploy.yml`, and this subtree rides along.

Two one-time steps on the server:

1. **DNS** — add an `A` record for `vrfbricks` pointing at the same Lightsail
   static IP as `gradevitian`. Wait for it to resolve.
2. **nginx + TLS**:
   ```bash
   sudo cp infra/nginx/vrfbricks.conf /etc/nginx/sites-available/vrfbricks.jayaremala.com
   sudo ln -s /etc/nginx/sites-available/vrfbricks.jayaremala.com /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d vrfbricks.jayaremala.com
   ```

Then submit `https://vrfbricks.jayaremala.com/sitemap.xml` in Search Console.

---

## What changed from the original site

| Original | Now |
|---|---|
| No `<title>`, description, OG tags or structured data | Full metadata, `LocalBusiness` + `Product` + `FAQPage` JSON-LD, sitemap, robots |
| Gallery built from other companies' catalogue photos, including hollow blocks (a product he does not make) and clip art | One real photograph as the hero; sourced photos labelled; product carried by generated dimension drawings |
| The real photograph of the yard sat unused in the folder | It is the hero of the home page |
| Prices hard-coded in 2020 | Quoted per enquiry; no stale number on the page |
| "delivering since 6 years" frozen in the copy | Computed from `FOUNDED_YEAR` at build time |
| Leads into a Google Form behind a hidden iframe, no confirmation | WhatsApp deep link; the buyer keeps a copy |
| English only, in a Telugu market | Bilingual with a toggle |
| jQuery, sweetalert, FontAwesome, anime.js off four CDNs | No third-party runtime; inline SVG icons |
| Header animation ended on `opacity: 0`, permanently hiding the business name | Removed |
| Truck animation hard-coded to `left: 1100px` | Removed |
| Gallery captions in `title` attributes, invisible on touch | Real captions and `alt` text |
| No focus states anywhere | Visible focus ring on everything interactive |
| No phone number until you scrolled | Tappable in the header bar, and in a fixed bottom bar on phones |
