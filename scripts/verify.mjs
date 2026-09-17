/**
 * Serves dist/public the way Netlify would and checks every route:
 * HTTP errors, JS errors, broken images, and the head tags that carry all of
 * this site's SEO.
 *
 * Also checks the generated sitemap and that every form named
 * residency-inquiry declares every expected field.
 *
 *   node scripts/verify.mjs
 */
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { ROUTE_PATHS, SITE_URL, routeName } from "./routes.mjs";

const DIST = path.resolve(import.meta.dirname, "..", "dist", "public");
const SHOTS = process.env.SHOT_DIR ?? path.resolve(import.meta.dirname, "..", "shots");
const PORT = 4174;

/**
 * Floor for prerendered visible text, in characters.
 *
 * The entire point of the prerender pass is that crawlers receive real content
 * instead of an empty React shell. When prerender half-fails it does not throw
 * — it writes a valid HTML file containing the shell and nothing else, which
 * passed every previous check in this file. The thinnest real page renders in
 * the low thousands, an empty shell in the low hundreds.
 */
const MIN_PRERENDERED_TEXT = 800;

/**
 * Every field the inquiry form must declare. Netlify builds its form definition
 * by parsing the deployed HTML and stores ONLY the fields that definition
 * contains — anything else in the POST is discarded silently.
 *
 * Keep this in step with client/index.html and the inputs in Application.tsx.
 */
const REQUIRED_FORM_FIELDS = [
  "First Name", "Last Name", "Company", "Job Title", "email", "Phone",
  "Number of People", "Target Move-In", "Length of Stay", "Lease Type",
  "Decision Timeline", "Services of Interest", "Notes",
  "Landing Page", "Traffic Source", "Campaign",
  "company-website",
];

/**
 * Checks EVERY form named residency-inquiry in EVERY built page, individually.
 *
 * This is deliberately per-form rather than per-page. The prerendered /apply
 * page carries two such forms — the rendered React form and the hidden
 * declaration copied from index.html. A check that pools field names across
 * both looks complete while the rendered form is missing fields, which is
 * exactly how three attribution fields reached production and were silently
 * dropped by Netlify on 18 Aug 2026.
 */
async function checkFormDeclarations() {
  const pages = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".html")) pages.push(full);
    }
  };
  await walk(DIST);

  let bad = 0;
  for (const file of pages.sort()) {
    const html = await readFile(file, "utf8");
    const forms = html.match(/<form[^>]*name="residency-inquiry"[^>]*>[\s\S]*?<\/form>/g) ?? [];
    forms.forEach((form, i) => {
      const names = new Set([...form.matchAll(/name="([^"]+)"/g)].map((m) => m[1]));
      const missing = REQUIRED_FORM_FIELDS.filter((f) => !names.has(f));
      const label = `${path.relative(DIST, file)} form#${i + 1}`;
      if (missing.length) {
        bad++;
        console.log(`FAIL  ${label} — missing: ${missing.join(", ")}`);
      } else {
        console.log(`PASS  ${label} — all ${REQUIRED_FORM_FIELDS.length} fields declared`);
      }
    });
  }
  if (!pages.length) console.log("WARN  no built pages found to check");
  return bad;
}

/**
 * The sitemap is generated from the same route table this file reads, so a
 * mismatch means scripts/sitemap.mjs did not run, or a stale hand-written
 * sitemap.xml is still being copied out of client/public and shadowing it.
 */
async function checkSitemap() {
  const file = path.join(DIST, "sitemap.xml");
  if (!existsSync(file)) {
    console.log("FAIL  sitemap.xml missing from the build — did scripts/sitemap.mjs run?");
    return 1;
  }
  const xml = await readFile(file, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = ROUTE_PATHS.map((p) => `${SITE_URL}${p}`);
  const missing = expected.filter((u) => !locs.includes(u));
  const extra = locs.filter((u) => !expected.includes(u));
  const stale = /<lastmod>2026-08-12<\/lastmod>/.test(xml) ? "lastmod still 2026-08-12 — not generated" : "";

  if (missing.length || extra.length || stale) {
    console.log(
      `FAIL  sitemap.xml — missing: ${missing.join(", ") || "none"} · unexpected: ${extra.join(", ") || "none"}${stale ? ` · ${stale}` : ""}`,
    );
    return 1;
  }
  const lastmod = xml.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "?";
  console.log(`PASS  sitemap.xml — ${locs.length} urls match the route table, lastmod ${lastmod}`);
  return 0;
}

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".xml": "application/xml",
  ".txt": "text/plain", ".json": "application/json",
};

async function resolveFile(url) {
  // Netlify serves /foo from foo.html without a redirect — mirror that first.
  const sibling = path.join(DIST, `${url.replace(/\/$/, "")}.html`);
  if (url !== "/" && existsSync(sibling)) return sibling;
  const direct = path.join(DIST, url);
  if (existsSync(direct)) {
    const s = await stat(direct);
    if (s.isFile()) return direct;
    const idx = path.join(direct, "index.html");
    if (existsSync(idx)) return idx;
  }
  return path.join(DIST, "index.html"); // mirrors the Netlify _redirects fallback
}

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  try {
    const file = await resolveFile(url);
    const buf = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(buf);
  } catch {
    if (!res.headersSent) res.writeHead(404);
    res.end("not found");
  }
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
let failures = 0;

// Titles and descriptions must be unique per route. Two pages sharing either
// is how a five-page site ends up with two pages indexed.
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const route of ROUTE_PATHS) {
  const name = routeName(route);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const http4xx = [];
  const jsErrors = [];
  page.on("response", (r) => {
    if (r.status() >= 400) http4xx.push(`${r.status()} ${r.url().replace(`http://localhost:${PORT}`, "")}`);
  });
  page.on("pageerror", (e) => jsErrors.push(e.message));

  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);
  // let anything still decoding settle before judging it broken
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));

  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
  const title = await page.title();
  const h1 = await page.$$eval("h1", (n) => n.length);
  const canonical = await page
    .$eval('link[rel="canonical"]', (e) => e.getAttribute("href"))
    .catch(() => "MISSING");
  const description = await page
    .$eval('meta[name="description"]', (e) => e.getAttribute("content") ?? "")
    .catch(() => "");
  const jsonLd = await page.$$eval('script[type="application/ld+json"]', (n) => n.length);
  const textLength = await page.evaluate(() => document.body.innerText.length);
  const expectedCanonical = `${SITE_URL}${route}`;

  await page.screenshot({ path: `${SHOTS}/v-${name}.png`, fullPage: true });

  const problems = [];
  if (http4xx.length) problems.push(`${http4xx.length} 4xx`);
  if (jsErrors.length) problems.push(`${jsErrors.length} js errors`);
  if (broken.length) problems.push(`${broken.length} broken images`);
  if (h1 !== 1) problems.push(`h1 count is ${h1}, expected 1`);
  if (title.length < 10) problems.push("title missing or too short");
  if (canonical !== expectedCanonical) problems.push(`canonical is ${canonical}, expected ${expectedCanonical}`);
  if (description.length < 50) problems.push(`description is ${description.length} chars, expected 50+`);
  if (jsonLd === 0) problems.push("no JSON-LD block");
  if (textLength < MIN_PRERENDERED_TEXT) {
    problems.push(`only ${textLength} chars of text — prerender likely produced a shell`);
  }
  if (seenTitles.has(title)) problems.push(`title duplicates ${seenTitles.get(title)}`);
  if (description && seenDescriptions.has(description)) {
    problems.push(`description duplicates ${seenDescriptions.get(description)}`);
  }
  seenTitles.set(title, route);
  if (description) seenDescriptions.set(description, route);

  const ok = problems.length === 0;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${route.padEnd(20)} h1=${h1} 4xx=${http4xx.length} js=${jsErrors.length} img=${broken.length} jsonld=${jsonLd} text=${textLength}`,
  );
  console.log(`        title:     ${title}`);
  console.log(`        canonical: ${canonical}`);
  console.log(`        desc:      ${description.slice(0, 90)}${description.length > 90 ? "…" : ""}`);
  for (const p of problems) console.log(`        ✗ ${p}`);
  if (http4xx.length) console.log("        4xx:", http4xx.slice(0, 4).join(" | "));
  if (jsErrors.length) console.log("        js: ", jsErrors.slice(0, 2).join(" | "));
  if (broken.length) console.log("        img:", broken.slice(0, 4).join(" | "));

  await page.close();
}

await browser.close();
server.close();

console.log("\n--- sitemap ---");
const sitemapFailures = await checkSitemap();

console.log("\n--- inquiry form field declarations ---");
const formFailures = await checkFormDeclarations();

console.log(failures === 0 ? "\nAll routes passed." : `\n${failures} route(s) failed.`);
if (formFailures) console.log(`${formFailures} form(s) missing declared fields.`);
process.exit(failures === 0 && formFailures === 0 && sitemapFailures === 0 ? 0 : 1);
