# Troubleshooting

Problems that have actually happened here, and what they turned out to be. Add to this rather than
rediscovering things.

---

## "Build failed: unrecognized Git contributor"

**Symptom.** A pull request opened by someone other than the repo owner shows every Netlify check
red — Deploy Preview, Pages changed, Header rules, Redirect rules. There is **no build log**, because
the build never started. Netlify's message reads:

> Build failed: unrecognized Git contributor. Your plan allows only one contributor on private repos.

**Cause.** Netlify's Free and Personal plans allow unlimited Git contributors **only on public
repositories**. On a private repo you get exactly one — the owner. The moment a second person's
commits appear, Netlify refuses to build them.

This is a plan limit, not a permissions problem, and not anything wrong with the code. Rebuilding the
same tree locally will succeed and tell you nothing.

**Fixes — only two work:**

1. **Make the repository public.** Unlimited contributors on public repos at every tier, including
   Free. This is what was done on August 19, 2026. As a bonus, GitHub branch protection is free on
   public repos, so GitHub Pro is no longer required just to protect `main`.
2. **Upgrade Netlify to Pro** ($20/month flat, unlimited members and contributors on all repos).
   The Personal plan at $9 does **not** fix this — it is still public-repos-only for contributors.

"Link your Git account" in the Netlify error is for one person with several Git identities. It does
not apply to a genuinely different teammate.

**After changing repo visibility, you must trigger a new deploy.** The warning banner on Netlify's
Deploys page refers to past deploys and does not clear itself. Push a commit, or use *Retry deploy*.
If a fresh deploy still fails with the same message, relink the repository:
Project configuration → Build & deploy → Continuous deployment → Repository → **Link repository**.
Relink the *existing* site — never "Add new site → Import from Git", which creates a second site with
its own form store and silently orphans the Zapier trigger.

---

## Several commits in quick succession, one red check

Every push to a branch starts a build. Netlify runs one at a time on the lower tiers and cancels
builds that have been superseded — and a cancelled deploy reports to GitHub as a **failure**, not as
"cancelled".

If a pull request went red after a rapid burst of commits, check whether a later deploy for the same
branch succeeded before assuming anything is broken.

Practical consequence: **ask for edits in one batch rather than one at a time.** Fewer commits, fewer
builds, less noise.

---

## A pull request is red and there *is* a log

Then it is a real build failure. Read the last 20 lines of the Netlify log. The usual culprits, in
order:

1. **The prerender step.** It drives a real headless browser over every route; it is the slowest and
   most fragile part of the build.
2. **The form guard in `scripts/verify.mjs`**, which fails the build when the rendered form and the
   hidden declaration in `client/index.html` disagree about field names. If you see
   `missing: <field>`, a form field was added in one file and not the other. That guard exists
   because that mistake silently deletes real inquiries.
3. **Dependency install.** Rare, and usually means `package.json` and the lockfile disagree.

---

## The live site looks stale after a merge

Check Netlify → Deploys. If the newest deploy is red, Netlify kept serving the last good build —
which is correct behaviour, not an outage. Fix the build; the site is not broken in the meantime.

---

## Analytics shows nothing

Check from a phone with wifi off before assuming anything is wrong. Desktop ad blockers routinely
block the Google Analytics script while leaving everything else working, which looks exactly like a
broken install. See `claude/analytics-ga4` in the project notes for the console checks.
