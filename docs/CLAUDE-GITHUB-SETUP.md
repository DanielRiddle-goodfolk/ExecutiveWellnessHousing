# Connecting Claude to this repo

**Who this is for:** anyone on the team who wants to edit the website by describing changes to
Claude — from a laptop or a phone. You do not need to know how to code, and you never need to open
Netlify.

**Time:** about fifteen minutes, once.

---

## What you're setting up

Claude talks to GitHub through a **connector**. Once it's connected, you can say things like
"change the phone number in the footer to (219) 555-0199" and Claude will make the edit on a copy of
the site, hand you a preview link, and publish it only after you say it looks right.

Nothing you do can break the live site by accident. Every change goes through a review step.

---

## Important: the obvious setup path does not work

Claude's built-in GitHub connector **authorizes but never installs**, so it ends up with read-only
access and no repository permissions. Symptoms: a `404` on this repo, or `403 Resource not
accessible by integration` when Claude tries to create a branch. Reconnecting does not fix it, and
there is no repository-selection screen to find. This is a known bug
([anthropics/claude-code#64130](https://github.com/anthropics/claude-code/issues/64130)).

**The working method is to supply your own OAuth App.** It takes one extra step and then behaves
correctly. Follow the steps below rather than the "GitHub" entry in Claude's connector directory.

---

## Step 1 — Get access to the repo

Ask Dan to add you as a collaborator on `ExecutiveWellnessHousing`. Accept the GitHub email
invitation.

## Step 2 — Create a GitHub OAuth App

Go to **https://github.com/settings/applications/new**

| Field | Value |
|---|---|
| Application name | anything, e.g. `Claude MCP — <your name>` |
| Homepage URL | `https://claude.ai` |
| Authorization callback URL *(may be labelled "Redirect URL")* | `https://claude.ai/api/mcp/auth_callback` |

Leave **Enable Device Flow**, **wildcard redirect matching**, and **Expire user authorization
tokens** all **unchecked**.

The callback URL must match exactly — no trailing slash. A wrong value here fails silently later.

Register the app, then copy the **Client ID**, and click **Generate a new client secret** and copy
that too. GitHub shows the secret only once.

> Make sure you're on the **OAuth App** form, not the **GitHub App** form. The OAuth App form is
> short. If you see a Webhook section and a long list of Read/Write permission dropdowns, you're on
> the wrong page — GitHub Apps need a separate install step, which is the thing that's broken.

## Step 3 — Add the custom connector in Claude

1. Claude → **Settings → Connectors → Add custom connector**
2. URL: `https://api.githubcopilot.com/mcp/x/all`
3. Open **Advanced settings** and paste your **Client ID** and **Client Secret**
4. Save, then **Connect**, and approve on GitHub

If Claude says *"a server with this URL already exists"*, an older GitHub connector is still
registered. Use a different documented endpoint — `https://api.githubcopilot.com/mcp/x/all` and
`https://api.githubcopilot.com/mcp/` are both valid and serve the same tools.

## Step 4 — Turn it on in a conversation

Tap the **+** button near the message box → **Connectors** → switch on your GitHub connector. Once
per conversation.

## Step 5 — Try it

> In the ExecutiveWellnessHousing repo, change the phrase "Request a Residency" on the apply page to
> "Request a Stay." Open a pull request and give me the preview link.

Claude should branch, edit, open a pull request, and come back with a link.

---

## How to read what comes back

Claude hands you a **Netlify preview link** — a temporary copy of the whole site with only your
change in it. It looks like `deploy-preview-7--executivewellnesshousing.netlify.app`. Open it, click
around, check the change.

You'll also see a **check** on the pull request:

- **Green** — the site built. Safe to review the preview.
- **Red** — the build failed. **Do not merge.** Tell Claude "the check is red, what happened?"
- **Yellow / spinning** — still building. Wait a minute.

When you're happy, tell Claude to merge. The live site updates within a couple of minutes.

---

## Rules worth knowing

- **Never ask Claude to commit straight to `main`.** `main` is the live site. Everything goes through
  a pull request, and the repo is configured to enforce it.
- **The inquiry form is delicate.** If you want to add or change a field on the apply form, say so
  explicitly — Claude has to update the form in two places or submissions silently lose that field.
  It's written up in `CLAUDE.md`, but flag it out loud anyway.
- **Don't rename the brand without Dan's sign-off.** The site says "The Old Ruth — Executive
  Wellness Housing" (updated August 19, 2026 to match the project name; it previously read
  "...Suites"). Changing it again still needs Dan's approval — it affects SEO.
- **Never paste a password, token, or client secret into a chat.** The client secret from Step 2 goes
  directly into Claude's settings field and nowhere else.

## Known limitation

An OAuth App cannot be restricted to individual repositories, so the connector can reach every repo
your GitHub account can. That is the cost of routing around the broken app-install flow. Keep that in
mind if your account has repos you'd rather Claude never touch.

## When something looks wrong

Tell Claude plainly: "that's not what I meant," or "the preview looks broken." It can push a fix to
the same pull request and the preview updates in place. Nothing is live until you merge.

If the live site itself looks broken, tell Dan — the previous deploy can be restored from Netlify in
under a minute.
