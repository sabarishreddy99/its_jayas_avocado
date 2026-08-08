#!/usr/bin/env node
/**
 * Generates the gradeVITian subdomain sitemap from the single page list in
 * frontend/src/data/gradevitian/pages.json (the same source the search modal uses).
 * Output: frontend/public/gradevitian/sitemap.xml — served at the subdomain root by
 * nginx. Run automatically via the frontend prebuild/predev hooks.
 *
 * <lastmod> comes from the last commit that touched the route's page file (CI checks
 * out with fetch-depth: 0, so the history is there). If git can't answer — shallow
 * clone, untracked new page — the entry ships without a <lastmod> rather than
 * claiming "modified today", which is the signal Google learns to distrust.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagesPath = resolve(root, "frontend/src/data/gradevitian/pages.json");
const outPath = resolve(root, "frontend/public/gradevitian/sitemap.xml");
const BASE = "https://gradevitian.jayaremala.com";

/** Crawl-priority tiers. Calculators are the money pages; legal/auth are filler
 *  that only needs to exist, so they sit at the bottom and are crawled rarely. */
const TIERS = {
  "/":            { priority: 1.0, changefreq: "weekly"  },
  Calculator:     { priority: 0.9, changefreq: "monthly" },
  Tool:           { priority: 0.8, changefreq: "monthly" },
  Reference:      { priority: 0.8, changefreq: "monthly" },
  Page:           { priority: 0.6, changefreq: "monthly" },
  Info:           { priority: 0.4, changefreq: "yearly"  },
  Account:        { priority: 0.3, changefreq: "yearly"  },
};
const FALLBACK = { priority: 0.5, changefreq: "monthly" };

/** Route → the source file whose git history dates the page. */
function pageFile(href) {
  const seg = href === "/" ? "" : href;
  return resolve(root, `frontend/src/app/gradevitian${seg}/page.tsx`);
}

/** ISO date (YYYY-MM-DD) of the last commit touching `file`, or null. */
function lastCommitDate(file) {
  if (!existsSync(file)) return null;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const pages = JSON.parse(readFileSync(pagesPath, "utf8"));

const seen = new Set();
const entries = [];
for (const p of pages) {
  if (p.auth === "in") continue;        // private pages aren't indexed (e.g. /account)
  if (seen.has(p.href)) continue;       // dedupe shared hrefs (e.g. Weightage → /grade-predictor)
  seen.add(p.href);

  const loc = p.href === "/" ? `${BASE}/` : `${BASE}${p.href}/`; // trailingSlash: true
  const tier = TIERS[p.href] ?? TIERS[p.category] ?? FALLBACK;

  entries.push({ loc, ...tier, lastmod: lastCommitDate(pageFile(p.href)) });
}

// Highest-priority URLs first — the order crawlers read them in.
entries.sort((a, b) => b.priority - a.priority || a.loc.localeCompare(b.loc));

const body = entries
  .map((e) =>
    [
      "  <url>",
      `    <loc>${e.loc}</loc>`,
      ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n"),
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(outPath, xml);
console.log(`gv-sitemap: wrote ${entries.length} URLs → frontend/public/gradevitian/sitemap.xml`);
