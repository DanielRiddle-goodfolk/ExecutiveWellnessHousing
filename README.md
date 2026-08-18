# Executive Wellness Housing

Marketing website for **Executive Wellness Housing** — private corporate housing at The Old Ruth, a
circa-1888 National Historic Registry mansion in La Porte, Indiana.

- **Live site:** https://executivewellnesshousing.com
- **Hosting:** Netlify (auto-deploys from this repo)
- **Repo owner / admin:** Dan Riddle
- **Inquiries go to:** Jennie@goodfolk.com

> **Naming note.** This repo and project are called *Executive Wellness Housing*. The **site's own
> branding is still "The Old Ruth — Executive Wellness Suites"** and appears in page copy, meta
> titles, and structured data. That is deliberate — do not rewrite it. "The Old Ruth" is also
> planned as a separate, non-corporate-facing site later.

## What this is

A **React 19 + TypeScript + Vite 7 + Tailwind 4** single-page app with client-side routing (Wouter),
plus a **prerender pass** that turns every route into crawlable static HTML.

**There is a build step, and it is not optional.** The site you deploy is `dist/public`, generated
by the build — not the files in this repo.

```
pnpm install
pnpm run build     # vite build → scripts/prerender.mjs (headless Chromium)
pnpm run verify    # gate: h1 count, 4xx, JS errors, broken images, screenshots
pnpm run test:form # drives the real inquiry form against a fake Netlify server
```

## Folder structure

```
executive-wellness-housing/
├── client/
│   ├── index.html            # HTML shell + the hidden Netlify form declaration
│   ├── public/               # copied verbatim to the site root
│   │   ├── photos/           # 67 optimized WebP property photos
│   │   ├── _redirects        # Netlify redirects
│   │   ├── _headers          # Netlify headers
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── pages/            # one component per route
│       │   ├── Home.tsx              → /
│       │   ├── CorporateHousing.tsx  → /corporate-housing
│       │   ├── TheTable.tsx          → /the-table
│       │   ├── Gallery.tsx           → /gallery
│       │   ├── Application.tsx       → /apply  (the inquiry form)
│       │   └── NotFound.tsx          → 404
│       ├── components/       # shared UI
│       ├── lib/seo.ts        # per-route meta, and INQUIRY_EMAIL
│       ├── lib/analytics.ts  # GA4 — dormant until a Measurement ID is set
│       └── index.css         # Tailwind layer + design tokens
├── scripts/
│   ├── prerender.mjs         # writes crawlable HTML for every route
│   ├── verify.mjs            # route gate — run before every PR
│   └── test-form.mjs         # form plumbing test
├── netlify.toml              # build command, publish dir, Node/pnpm versions
├── README.md                 # this file (humans)
├── CLAUDE.md                 # instructions for AI editors
└── docs/
    └── CLAUDE-GITHUB-SETUP.md   # how a teammate connects Claude to this repo
```

## How edits are made

Day-to-day content edits go through **Claude**, not by hand. A teammate describes the change in
plain English; Claude branches, makes the edit, opens a pull request, and hands back the Netlify
preview link. After review it's merged and goes live. The rules Claude follows are in
[`CLAUDE.md`](./CLAUDE.md).

Setting a teammate up takes about fifteen minutes and is written out in
[`docs/CLAUDE-GITHUB-SETUP.md`](./docs/CLAUDE-GITHUB-SETUP.md). **Follow that guide rather than
adding the "GitHub" connector from Claude's directory** — that one authorizes without installing and
ends up read-only, which looks like it worked right up until the first edit fails.

## Repository rules

`main` is the live site and is protected:

- **A pull request is required.** Direct pushes to `main` are rejected.
- **Zero approvals required.** A solo owner cannot approve their own PR, so requiring approvals would
  deadlock merges. Turn this on when there are enough reviewers to make it work.
- **The Netlify check must pass.** `netlify/executivewellnesshousing/deploy-preview` is a required
  status check — a failed build blocks the merge button rather than merely looking alarming.
- **Squash merges**, so one pull request lands as one revertible commit with a plain-English title.

Do **not** enable *Require signed commits*. Commits created through the Claude connector are not
signed that way and would be rejected, which would silently kill the editing workflow.

## How deploys work

- **Open a pull request** → Netlify builds a **deploy preview** at
  `deploy-preview-<PR number>--executivewellnesshousing.netlify.app`. If the build fails, the PR
  check goes red — that is your first line of defense.
- **Merge into `main`** → Netlify builds and publishes to the live site.

Nobody logs into Netlify to publish. A failed build cannot take the site down — Netlify only swaps in
a new deploy when the build succeeds, so the last good deploy keeps serving.

### The build's one fragile dependency

The prerender pass drives **headless Chromium via Playwright**, so Netlify installs a browser at
build time (`pnpm exec playwright install chromium`). `PLAYWRIGHT_BROWSERS_PATH=0` in `netlify.toml`
puts it inside `node_modules` so Netlify's dependency cache keeps it between builds. Playwright is
pinned to an exact version on purpose — a floating version downloads a different browser build.

If this ever breaks, the fallback is to run build + prerender in GitHub Actions and deploy the
finished artifact with the Netlify CLI.

### If Netlify stops building

Changing the repository's visibility can break Netlify's access to it. Reconnect at **Project
configuration → Build & deploy → Continuous deployment → Repository → Link repository**, and make
sure Netlify's GitHub app has access to this repo. Always relink the **existing** site — creating a
new one gives it a separate form store and silently orphans the inquiry pipeline.

## Forms

The inquiry form is **Netlify Forms** (`residency-inquiry`), with a honeypot field and real error
handling. Submissions land in Netlify's dashboard, email Jennie, and are copied into a Notion CRM
by a Zap.

**Netlify cannot discover a JavaScript-rendered form.** A hidden copy in `client/index.html`
declares the field names Netlify scans at deploy time. Adding or renaming a field on `/apply`
requires updating that hidden form to match, or the field is **silently dropped** — no error, the
data just never arrives. `pnpm run test:form` catches the drift. See `CLAUDE.md`.

Deploy previews capture submissions into the *same* form as production, so a test submission on a
preview will reach Notion. Useful for verifying the chain; delete the test row afterwards.

## Previewing locally

```
pnpm install
pnpm run dev        # http://localhost:3000, hot reload
```

To see exactly what deploys, build first and serve the output:

```
pnpm run build
npx serve dist/public
```

## Domain & DNS

- **Domain:** executivewellnesshousing.com
- **DNS managed at:** GoDaddy
- **Notes:** redirects live in `client/public/_redirects`; custom headers in `client/public/_headers`

> Credentials, API keys, and host logins are **never** stored in this repo.

## Known open items

- Analytics is wired but dormant: paste a GA4 Measurement ID into `GA_MEASUREMENT_ID` in
  `client/src/lib/analytics.ts` to switch it on. Tracking is restricted to the production hostname,
  so deploy previews and local development never appear in the reports.
- The Zap writing into Notion stamps `Source` as *Website — Corporate Housing*; it should be
  *Website — Apply*. Also worth knowing: `Source` is a fixed value, so it can never distinguish
  where a lead came from. Real attribution needs a hidden field on the form capturing the referring
  page.
- The live build used a patched `wouter@3.7.1`; the patch file was never delivered and this repo
  uses stock `wouter`. All five routes verify identically, so the patch's effect is not observable.

## Who to contact

- Site owner, merges & settings: Dan Riddle
- Inquiries: Jennie@goodfolk.com
