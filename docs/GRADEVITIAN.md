# gradeVITian — deployment & layout notes

gradeVITian is the ported student-tools app (GPA / CGPA / Grade Predictor / CGPA
Estimator / Attendance) served at **`gradevitian.jayaremala.com`**. It lives inside this
Next.js app under the `app/gradevitian/**` route segment and reuses the portfolio's
design system, so it ships in the same build.

## How routing works

The site builds with `output: "export"` (fully static). That means **middleware/proxy
does not run in production** — subdomain routing is the web server's job.

- Pages export to `out/gradevitian/<page>/index.html`; shared chunks to `out/_next/`.
- All internal links are **clean** (`/gpa`, `/login`, …) — no `/gradevitian` prefix.

### Production topology

The portfolio frontend is on **GitHub Pages** (single custom domain `jayaremala.com`),
so it can't host the subdomain. Instead the **Lightsail** box (which already runs the
backend behind nginx) serves `gradevitian.jayaremala.com`:

1. CI builds `frontend/out/` (for Pages) and **rsyncs the whole export to
   `/var/www/gv-site` on Lightsail** — see the "Sync gradeVITian static export" step in
   `.github/workflows/deploy.yml` (uses `LIGHTSAIL_SSH_KEY` / `LIGHTSAIL_HOST`).
2. nginx vhost `infra/nginx/gradevitian.conf` serves that export: clean URLs map into the
   `gradevitian/` subtree, while `/_next/` and `/gradevitian/` assets resolve from the
   export root. (Why the whole export and not just `out/gradevitian`? The pages reference
   shared `/_next/...` chunks that live outside the subfolder.)

The vhost also carries a few SEO-load-bearing rules — if you rewrite it, keep them:

- **`/robots.txt` and `/sitemap.xml` at the origin root.** They live in the export under
  `gradevitian/`, but Google only reads robots.txt from the root, and a sitemap can only
  list URLs at or below its own path.
- **301 from `/gpa` to `/gpa/`.** `trailingSlash: true` exports `<route>/index.html`, so
  both forms used to answer 200 with identical HTML. One canonical URL per page.
- **`default_type image/png` on `/gradevitian/opengraph-image`.** Next's generated social
  card has no file extension; without this nginx serves it as `application/octet-stream`
  and every scraper refuses to render it.
- **`error_page 404 /gradevitian/404/index.html`.** A static export only emits the root
  `404.html`, so `app/gradevitian/404/page.tsx` exists purely to give the subdomain its own
  404 body. nginx still returns a real 404 status.

After editing the file, `sudo nginx -t` before `systemctl reload nginx`, and re-run the
certbot command below (it is idempotent) — certbot rewrites this file in place, so
re-copying it removes the 443 block.

DNS: a Namecheap **A record** `gradevitian` → the Lightsail static IP. TLS via
`certbot --nginx -d gradevitian.jayaremala.com`.

CORS: ensure `https://gradevitian.jayaremala.com` is in `FRONTEND_ORIGIN` in the box's
`/home/ubuntu/itsjaya.env` (the code default already includes it).

## Local development

`next dev` **does** run `src/proxy.ts`, which emulates the subdomain:

- Clean URLs: visit `http://gradevitian.localhost:3000/`
- Or browse the segment directly: `http://localhost:3000/gradevitian/`

## SEO

Everything crawler-facing is generated, not hand-maintained:

| Thing | Source |
|---|---|
| Titles, descriptions, canonicals, OG/Twitter | `src/lib/gradevitian/seo.ts` (`gvMetadata`) |
| JSON-LD (WebSite, Organization, WebApplication, BreadcrumbList, ItemList, FAQPage) | same file; rendered via `GVJsonLd` |
| Visible FAQ + matching FAQPage markup | `GVFaq` — one component, so the two can't drift |
| `sitemap.xml` | `scripts/gen-gv-sitemap.mjs`, from `src/data/gradevitian/pages.json`, `<lastmod>` from git |
| 1200x630 social card | `src/app/gradevitian/opengraph-image.tsx` |
| `robots.txt` | `public/gradevitian/robots.txt` (hand-written) |

Adding a page? Add it to `pages.json` and it lands in the sitemap and the search
palette automatically. Give the page `gvMetadata({ path, title, description })` so it
gets a canonical — the canonical is what stops `jayaremala.com/gradevitian/<page>` from
competing with the subdomain copy for the same ranking.

**Search Console:** set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (repo secret of the same
name, already wired into the build) to the "HTML tag" token, then verify the
`gradevitian.jayaremala.com` property and submit `/sitemap.xml`.

## Backend env

- `GV_JWT_SECRET` — required in production (signs auth tokens). Unset = ephemeral dev secret.
- `GV_DB_PATH` — **set to `/data/gradevitian.db`** on Lightsail so it lives on the mounted
  `/data` volume (the default `./chroma_db/...` is inside the container and is lost on
  redeploy). `deploy.sh` restores it from S3 and `backup.sh` backs it up nightly.
- Password-reset / welcome emails reuse the connected Gmail account (admin OAuth). If
  Gmail isn't connected, signup/reset still succeed; the email is skipped.
