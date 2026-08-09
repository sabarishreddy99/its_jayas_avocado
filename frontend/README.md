# frontend

Next.js 16 static export serving all three sites — the portfolio (`jayaremala.com`),
gradeVITian and VRF Bricks (their own subdomains, same `out/` directory).

See the root [README.md](../README.md) for system architecture and deployment,
and [CLAUDE.md](../CLAUDE.md) for the working map.

```bash
npm install
npm run dev      # syncs knowledge base first, then http://localhost:3000
npm run build    # syncs knowledge base first, then static export → out/
npm run sync     # manually sync backend JSON → frontend/src/data/knowledge/
npm run lint
npx tsc --noEmit # typecheck
```

## Layout

`src/` is organised by feature vertical — everything belonging to one product
lives together, and only genuinely cross-cutting code sits at a root.

```
app/
  (portfolio)/   portfolio routes; the group adds no URL segment, so `/` is home
  chat/          Avocado chatbot        admin/       token-gated editor
  gradevitian/   vrfbricks/             subdomain sites (nginx maps each root)

components/
  ui/            content-free primitives shared by 2+ verticals
  portfolio/     the portfolio's own sections and chrome
  chat/ blog/ lab/ system/ admin/ gradevitian/ vrfbricks/

lib/
  api/           backend client          content/     MDX loaders (blog, lab)
  portfolio/     seo, search, nav        admin/       GitHub staging
  gradevitian/ vrfbricks/                per-site helpers
  session.ts sound.ts visitor.ts         cross-cutting utilities

data/
  knowledge/     GENERATED — synced from backend/data/knowledge/, never edit
  *.ts           typed re-exports        gradevitian/ vrfbricks/   per-site data

content/blog/*.mdx   content/lab/*.mdx   authored posts
```

**Adding a component?** If it renders product-specific content, put it in that
product's folder. `components/ui/` is only for content-free pieces that at least
two verticals could use.

`Dockerfile` here is dev-only (used by `infra/compose.yml`); production is the
static export built in CI.
