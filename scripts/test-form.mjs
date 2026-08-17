/**
 * End-to-end test of the residency inquiry form.
 *
 * Stands up a server that behaves the way Netlify does — serves the built site
 * and accepts a urlencoded POST at "/" — then drives the real form in a browser
 * and prints exactly what the server received.
 *
 *   node scripts/test-form.mjs
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const DIST = path.resolve(import.meta.dirname, "..", "dist", "public");
const PORT = 4176;
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".xml": "application/xml",
  ".txt": "text/plain",
};

let received = null;
// set FAIL=1 to exercise the error path instead of the happy path
const SIMULATE_FAILURE = process.env.FAIL === "1";

const server = createServer(async (req, res) => {
  if (req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    received = { contentType: req.headers["content-type"], body };
    if (SIMULATE_FAILURE) {
      res.writeHead(500).end("simulated Netlify outage");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" }).end("<html><body>Thank you</body></html>");
    return;
  }
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  let file = path.join(DIST, url);
  if (existsSync(file)) {
    const s = await stat(file);
    if (!s.isFile()) {
      const idx = path.join(file, "index.html");
      file = existsSync(idx) ? idx : path.join(DIST, "index.html");
    }
  } else file = path.join(DIST, "index.html");
  try {
    const buf = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(buf);
  } catch {
    if (!res.headersSent) res.writeHead(404);
    res.end("nf");
  }
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const jsErrors = [];
page.on("pageerror", (e) => jsErrors.push(e.message));

await page.goto(`http://localhost:${PORT}/apply`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await page.fill('input[name="First Name"]', "Dana");
await page.fill('input[name="Last Name"]', "Whitfield");
await page.fill('input[name="email"]', "d.whitfield@example.com");
await page.fill('input[name="Phone"]', "(312) 555-0148");
await page.fill('textarea[name="Reason for Inquiry"]', "Relocating a build team for 18 months.");
await page.selectOption('select[name="Length of Stay"]', "Corporate Master Lease");
await page.fill('textarea[name="Contribution to the Peace"]', "We keep quiet hours and clean up after ourselves.");
await page.fill('textarea[name="Services of Interest"]', "Infrared sauna, PEMF");
// the checkboxes are sr-only with a styled proxy, so click the label the way a visitor does
const covenantLabels = await page.$$('label:has(input[name="Covenant Acknowledged"])');
for (const label of covenantLabels) await label.click();
const checkedCount = await page.$$eval('input[name="Covenant Acknowledged"]', (n) => n.filter((i) => i.checked).length);
console.log(`covenant boxes checked via label click: ${checkedCount}/${covenantLabels.length}`);

await page.click('button[type="submit"]');
await page.waitForTimeout(2000);

const confirmationShown = await page.locator("text=Your inquiry has been received").count();
const errorToastShown = await page.locator("text=could not send your inquiry").count();

console.log("=== what the server received ===");
if (!received) {
  console.log("NOTHING — the form did not POST.");
} else {
  console.log("content-type:", received.contentType);
  const parsed = new URLSearchParams(received.body);
  for (const key of [...new Set(parsed.keys())]) {
    console.log(`  ${key.padEnd(16)} = ${parsed.getAll(key).join(" | ")}`);
  }
}
console.log("\n=== what the visitor saw ===");
console.log("  confirmation panel:", confirmationShown > 0 ? "shown" : "not shown");
console.log("  error message:     ", errorToastShown > 0 ? "shown" : "not shown");
console.log("  JS errors:         ", jsErrors.length ? jsErrors.join(" | ") : "none");

await page.screenshot({ path: `/mnt/user-data/working/shots/form-${SIMULATE_FAILURE ? "fail" : "ok"}.png` });
await browser.close();
server.close();

const expected = ["form-name", "First Name", "Last Name", "email", "Phone", "Reason for Inquiry", "Length of Stay", "Contribution to the Peace", "Services of Interest", "Covenant Acknowledged"];
const got = received ? new Set(new URLSearchParams(received.body).keys()) : new Set();
const missing = expected.filter((f) => !got.has(f));
const passed = SIMULATE_FAILURE
  ? received && errorToastShown > 0 && confirmationShown === 0
  : received && missing.length === 0 && confirmationShown > 0 && jsErrors.length === 0;
console.log(`\n${passed ? "PASS" : "FAIL"}${missing.length ? ` — missing fields: ${missing.join(", ")}` : ""}`);
process.exit(passed ? 0 : 1);
