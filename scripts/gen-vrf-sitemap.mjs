#!/usr/bin/env node
/**
 * Generates the VRF Bricks subdomain sitemap.
 * Output: frontend/public/vrfbricks/sitemap.xml — served at the subdomain root
 * by nginx. Run automatically via the frontend prebuild/predev hooks.
 *
 * Same <lastmod> discipline as gen-gv-sitemap.mjs: the date comes from the last
 * commit that touched the route's page file, and an entry ships without a
 * <lastmod> rather than claiming "modified today", which is the signal Google
 * learns to distrust.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "frontend/public/vrfbricks");
const outPath = resolve(outDir, "sitemap.xml");
const BASE = "https://vrfbricks.jayaremala.com";

/**
 * The home page and the product page are what a buyer searches for, so they
 * carry the crawl priority. Nothing here changes often — a brick yard's sizes
 * and hours are stable — so changefreq is honest rather than optimistic.
 */
const PAGES = [
  { route: "", priority: 1.0, changefreq: "monthly" },
  { route: "/bricks", priority: 0.9, changefreq: "monthly" },
  { route: "/why-fly-ash", priority: 0.8, changefreq: "yearly" },
  { route: "/delivery", priority: 0.8, changefreq: "yearly" },
  { route: "/visit", priority: 0.8, changefreq: "yearly" },
];

/** Route → the source file whose git history dates the page. */
function pageFile(route) {
  return resolve(root, `frontend/src/app/vrfbricks${route}/page.tsx`);
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

const body = PAGES.map((p) => {
  const loc = p.route === "" ? `${BASE}/` : `${BASE}${p.route}/`; // trailingSlash: true
  const lastmod = lastCommitDate(pageFile(p.route));
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <changefreq>${p.changefreq}</changefreq>`,
    `    <priority>${p.priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, xml);
console.log(`vrf-sitemap: wrote ${PAGES.length} URLs → frontend/public/vrfbricks/sitemap.xml`);
