/**
 * Generates dist/public/sitemap.xml from the route table in routes.mjs.
 *
 * Run after the prerender pass:  node scripts/sitemap.mjs
 *
 * lastmod is the date of the commit being built, not "today". A rebuild that
 * changes nothing should not tell Google the content changed — crawlers
 * de-weight a sitemap whose dates move on every deploy regardless of content.
 * Falls back to the build date only if git is unavailable.
 */
import { writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { ROUTES, SITE_URL } from "./routes.mjs";

const DIST = path.resolve(import.meta.dirname, "..", "dist", "public");

function lastmod() {
  try {
    return execSync("git log -1 --date=short --pretty=%cd", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const date = lastmod();

const body = ROUTES.map(
  ({ path: p, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

await writeFile(path.join(DIST, "sitemap.xml"), xml, "utf-8");
console.log(`sitemap.xml — ${ROUTES.length} urls, lastmod ${date}`);
