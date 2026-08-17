# CLAUDE.md — Executive Wellness Housing

You are editing the website for **Executive Wellness Housing** — private corporate housing at The
Old Ruth, a circa-1888 historic mansion in La Porte, Indiana. The person talking to you is likely
**not a coder**. They will describe changes in plain English. Make the change safely, then explain
what you did in plain language, never in jargon.

---

## Read this before you touch the inquiry form

The form on `/apply` is a **Netlify Form**. Netlify cannot see a JavaScript-rendered form, so the
field names are declared **twice**:

1. The real form — `client/src/pages/Application.tsx`
2. A hidden copy Netlify scans at deploy — `client/index.html`

**If you add, rename, or remove a field in one and not the other, that field is silently dropped.**
No error. No warning. The visitor sees a success message and the data is simply gone. This is the
single most expensive mistake you can make in this repo.

So: **any change to the form's fields must be made in both files**, and you must then run

```
pnpm run test:form
```

which drives the real form in a browser and prints exactly what the server received. Do not open a
pull request touching the form until that prints `PASS`.

One deliberate quirk: the field named `email` is lowercase on purpose. Netlify treats a field
literally named `email` as the reply-to address on notification emails, so Jennie can hit Reply and
reach the prospect. **Do not rename it.**

---

## Golden rules

1. **Never commit to `main`.** Branch, edit, open a pull request. `main` is the live site.
2. **Branch names:** `edit/<short-description>` — e.g. `edit/update-phone-number`.
3. **Always hand back the Netlify preview link** and wait for the person to confirm it looks right
   before merging. If the PR's Netlify check is red, the build failed — read the log and fix it
   rather than merging.
4. **Never put secrets in the repo.** No passwords, API keys, or credentials, ever.
5. **Ask when unsure.** Flag anything touching pricing, legal text, the Sanctuary Covenant, or
   licensing for Dan to approve.

## Do not rename the brand

The repo and project are called *Executive Wellness Housing*. The **site's visible branding is
"The Old Ruth — Executive Wellness Suites"**, and it appears in headers, footers, meta titles, Open
Graph tags, and the `LodgingBusiness` structured data. That is intentional. Do not "fix" it, do not
harmonize it, do not swap one for the other — it changes SEO and needs Dan's explicit sign-off.

## Where things live

| Plain English | File |
|---|---|
| Homepage, hero, most marketing copy | `client/src/pages/Home.tsx` |
| Corporate housing landing page | `client/src/pages/CorporateHousing.tsx` |
| The Table (dining) | `client/src/pages/TheTable.tsx` |
| Photo gallery | `client/src/pages/Gallery.tsx` |
| Inquiry form | `client/src/pages/Application.tsx` **+** `client/index.html` |
| Page titles, descriptions, social tags | `client/src/lib/seo.ts` |
| Where inquiries are emailed | `INQUIRY_EMAIL` in `client/src/lib/seo.ts` |
| Colors, fonts, spacing tokens | `client/src/index.css` |
| Shared buttons, nav, footer | `client/src/components/` |
| Photos | `client/public/photos/` |
| Redirects / headers / robots / sitemap | `client/public/` |

There are **no** `about.html`, `contact.html`, `css/styles.css`, or `js/main.js` files. This is a
React app — pages are `.tsx` components and styling is Tailwind utility classes.

## Brand voice

Editorial, restrained, warm, and unhurried. It speaks to executives seeking a quiet, dignified place
to live while deployed — not to tourists. No hype, no exclamation points, no slang, no stock
marketing verbs ("unlock," "elevate," "supercharge"). Match the cadence of the surrounding copy.

**Fixed language rules:**

- "La Porte" is always two words.
- "Circa 1888," never "Est. 1888."
- Avoid "silence" and standalone "green space" — these were removed deliberately.
- "Blue Zone" is currently banned pending Dan's sign-off. Do not reintroduce it.

## Images

Phone photos are 5–12 MB and will wreck page load. Before any image goes in:

1. **Resize** to **1500px** max on the long edge (matches the existing set).
2. **Convert to WebP.**
3. Save to `client/public/photos/` with a lowercase, hyphenated, descriptive filename.
4. Add meaningful **`alt` text** to every `<img>`.
5. Lazy-load anything below the fold.

## Before you open a pull request

Run these, in order, and don't open the PR until they pass:

```
pnpm run build       # must complete, including the prerender pass
pnpm run verify      # all 5 routes: h1=1, 4xx=0, js=0, img=0
pnpm run test:form   # only if you touched the form — must print PASS
```

Then re-read the person's original request and confirm you actually did that, and only that.

> If you are working through a chat connector and have no shell, you cannot run these. Say so
> plainly, open the PR anyway, and tell the person that **Netlify's own build is the test** — if the
> PR check goes green the build and prerender succeeded. Do not claim you verified something you
> did not run.

## Commit & PR style

- One topic per PR. Small and focused.
- Commit messages in plain language: `Update contact phone number`, `Add sauna photos to gallery`.
- PR description: one or two sentences a non-coder understands — what changed and why.
