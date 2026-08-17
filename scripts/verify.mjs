/**
 * Serves dist/public the way Netlify would and checks every route:
 * HTTP errors, JS errors, broken images, and full-page screenshots.
 *
 *   node scripts/verify.mjs
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const DIST = path.resolve(import.meta.dirname, "..", "dist", "public");
const SHOTS = process.env.SHOT_DIR ?? "/mnt/user-data/working/shots";
const PORT = 4174;

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".xml": "application/xml",
  ".txt": "text/plain", ".json": "application/json",
};

async function resolveFile(url) {
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

for (const [route, name] of [
  ["/", "home"], ["/corporate-housing", "corp"], ["/the-table", "table"],
  ["/gallery", "gal"], ["/apply", "apply"],
]) {
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
  const canonical = await page.$eval('link[rel="canonical"]', (e) => e.getAttribute("href")).catch(() => "MISSING");
  const h1 = await page.$$eval("h1", (n) => n.length);

  await page.screenshot({ path: `${SHOTS}/v-${name}.png`, fullPage: true });

  const ok =
    http4xx.length === 0 && jsErrors.length === 0 && broken.length === 0 && h1 === 1 && title.length > 10;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${route.padEnd(20)} h1=${h1} 4xx=${http4xx.length} js=${jsErrors.length} img=${broken.length}`);
  console.log(`        title:     ${title}`);
  console.log(`        canonical: ${canonical}`);
  if (http4xx.length) console.log("        4xx:", http4xx.slice(0, 4).join(" | "));
  if (jsErrors.length) console.log("        js: ", jsErrors.slice(0, 2).join(" | "));
  if (broken.length) console.log("        img:", broken.slice(0, 4).join(" | "));

  await page.close();
}

await browser.close();
server.close();
console.log(failures === 0 ? "\nAll routes passed." : `\n${failures} route(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
