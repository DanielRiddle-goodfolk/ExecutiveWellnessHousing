/**
 * Prerenders each route of the built SPA to real, crawlable HTML.
 *
 * Why this instead of a Next.js rewrite: it produces the same crawlable output
 * (full markup + per-route head tags in the served HTML) while leaving the
 * existing React/Vite app and its design completely untouched.
 *
 * Run after `vite build`:  node scripts/prerender.mjs
 *
 * The route list lives in scripts/routes.mjs, shared with sitemap.mjs and
 * verify.mjs so the three cannot drift apart.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { ROUTE_PATHS } from "./routes.mjs";

const DIST = path.resolve(import.meta.dirname, "..", "dist", "public");
const PORT = 4173;

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let file = path.join(DIST, url);
  if (!existsSync(file) || url.endsWith("/")) file = path.join(DIST, "index.html");
  try {
    const buf = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(buf);
  } catch {
    res.writeHead(404).end("not found");
  }
});

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

for (const route of ROUTE_PATHS) {
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });

  // Drive every whileInView animation to completion so the captured markup is
  // fully visible rather than frozen at opacity:0.
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`);

  // Write /corporate-housing as corporate-housing.html, NOT corporate-housing/index.html.
  // Netlify answers a request for a folder's index with a 301 to the trailing-slash
  // URL, while the canonical tag and sitemap use the slash-less path. Google then
  // sees every inner page canonicalise to a URL that redirects away, and indexes
  // none of them. A sibling .html file is served at the slash-less URL directly.
  const outFile = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route}.html`);
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf-8");

  const text = await page.evaluate(() => document.body.innerText.length);
  console.log(`prerendered ${route.padEnd(20)} ${(html.length / 1024).toFixed(0)} kB html, ${text} chars of text`);
}

await browser.close();
server.close();
