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
│   ├── index.html          # HTML shell + the hidden Netlify form declaration
│   ├── public/             # copied verbatim to the site root
│   │   ├── photos/         # 67 optimized WebP property photos
│   │   ├── _redirects      # Netlify redirects
│   │   ├── _headers        # Netlify headers
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── pages/          # one component per route
│       │   ├── Home.tsx            → /
│       │   ├── CorporateHousing.tsx→ /corporate-housing
│       │   ├── TheTable.tsx        → /the-table
│       │   ├── Gallery.tsx         → /gallery
│       │   ├── Application.tsx     → /apply  (the inquiry form)
│       │   └── NotFound.tsx        → 404
│       ├── components/     # shared UI
│       ├── lib/seo.ts      # per-route meta, and INQUIRY_EMAIL
│       ├── lib/analytics.ts# GA4 loader — dormant until a Measurement ID is set
│       └── index.css       # Tailwind layer + design tokens
├── scripts/
│   ├── prerender.mjs       # writes crawlable HTML for every route
│   ├── verify.mjs          # route gate — run before every PR
│   └── test-form.mjs       # form plumbing test
├── netlify.toml            # build command, publish dir, Node/pnpm versions
├── README.md               # this file (humans)
├── CLAUDE.md               # instructions for AI editors
└── docs/
    └── CLAUDE-GITHUB-SETUP.md   # how a teammate connects Claude to this repo
```

## How edits are made

Day-to-day content edits go through **Claude**, not by hand. A teammate describes the change in
plain English; Claude branches, makes the edit, opens a pull request, and hands back the Netlify
preview link. After review it's merged and goes live. The rules Claude follows are in
[`CLAUDE.md`](./CLAUDE.md).

**Setting up a new teammate:** follow [`docs/CLAUDE-GITHUB-SETUP.md`](./docs/CLAUDE-GITHUB-SETUP.md)
exactly. The obvious path — adding the "GitHub" connector from Claude's directory — **does not
work**; it authorizes without installing and ends up read-only. The setup guide covers the OAuth App
method that does work.

## Repository rules

`main` is protected. Nobody commits to it directly, including Dan.

| Rule | Setting |
|---|---|
| Pull request required before merging | yes |
| Required approvals | **0** — with a single maintainer, requiring an approval deadlocks merges, since GitHub forbids approving your own PR |
| Required status check | `netlify/executivewellnesshousing/deploy-preview` — a failed build blocks the merge |
| Merge method | squash — one PR becomes one revertible commit |
| Force pushes | blocked |
| Signed commits | **must stay off** — commits created through the Claude connector are unsigned and would be rejected, breaking the whole editing workflow |

## How deploys work

- **Open a pull request** → Netlify builds a **deploy preview** at
  `deploy-preview-<PR number>--executivewellnesshousing.netlify.app`. If the build fails, the PR
  check goes red and the merge is blocked.
- **Merge into `main`** → Netlify builds and publishes to the live site.

Nobody logs into Netlify to publish. A failed build cannot take the site down — Netlify only swaps
in a new deploy on success.

> **If Netlify ever has to be relinked, link the repo to the *existing* site** via Project
> configuration → Build & deploy → Continuous deployment → Repository → Link repository. Creating a
> new site instead gives it a fresh form store, and inquiries stop reaching Notion silently.

### The build's one fragile dependency

The prerender pass drives **headless Chromium via Playwright**, so Netlify installs a browser at
build time (`pnpm exec playwright install chromium`). `PLAYWRIGHT_BROWSERS_PATH=0` in `netlify.toml`
puts it inside `node_modules` so Netlify's dependency cache keeps it between builds. Playwright is
pinned to an exact version on purpose — a floating version downloads a different browser build.

If this ever breaks, the fallback is to run build + prerender in GitHub Actions and deploy the
finished artifact with the Netlify CLI.

## Forms

The inquiry form is **Netlify Forms** (`residency-inquiry`), with a honeypot field and real error
handling. Submissions land in Netlify's dashboard, email Jennie, and are copied into a Notion CRM
by a Zap.

**Netlify cannot discover a JavaScript-rendered form.** A hidden copy in `client/index.html`
declares the field names Netlify scans at deploy time. Adding or renaming a field on `/apply`
requires updating that hidden form to match, or the field is **silently dropped** — no error, the
data just never arrives. `pnpm run test:form` catches the drift. See `CLAUDE.md`.

Note that **deploy previews capture form submissions too**, into the same form as production. A test
submission on a preview will create a real row in the CRM.

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

- **Analytics is wired but dormant.** Paste a GA4 Measurement ID into `GA_MEASUREMENT_ID` in
  `client/src/lib/analytics.ts` to switch it on. Tracking is restricted to the production hostname,
  so deploy previews and local development never appear in the reports.
- **The Zap stamps `Source` as "Website — Corporate Housing"**; it should be "Website — Apply." More
  fundamentally, `Source` is a fixed value and can never vary — every inquiry passes through the one
  `/apply` form. Attributing leads to a page would need a hidden field capturing the referrer.
- **"Blue zone" appears twice on the live homepage** and the decision on it is still open. See the
  brand voice section of `CLAUDE.md` before touching it.
- The live build used a patched `wouter@3.7.1`; the patch file was never delivered and this repo
  uses stock `wouter`. All five routes verify identically, so the patch's effect is not observable.

## Who to contact

- Site owner, merges & settings: Dan Riddle
- Inquiries: Jennie@goodfolk.com
