# Connecting Claude to this repo

**Who this is for:** anyone on the team who wants to edit the website by describing changes to
Claude — from a laptop or a phone. You do not need to know how to code, and you never need to open
Netlify.

**Time:** about ten minutes, once.

---

## What you're setting up

Claude talks to GitHub through a **connector**. Once it's connected, you can say things like
"change the phone number in the footer to (219) 555-0199" and Claude will make the edit on a copy of
the site, hand you a preview link, and publish it only after you say it looks right.

Nothing you do can break the live site by accident. Every change goes through a review step.

---

## Step 1 — Get a GitHub account and access

Ask Dan to add you as a collaborator on the `executive-wellness-housing` repository. You'll get an
email invitation from GitHub. Accept it.

## Step 2 — Add the GitHub connector in Claude

1. Open Claude (web, desktop, or the mobile app).
2. Go to **Settings → Connectors**. On Team or Enterprise plans, an owner adds it once in
   Organization settings and you'll just enable it here.
3. Choose **Add custom connector**.
4. Paste this URL:

   ```
   https://api.githubcopilot.com/mcp/
   ```

5. Name it **GitHub** and save.
6. Sign in when prompted, and approve access.

> Custom connectors work on **every** Claude client, including the phone apps, on Pro, Max, Team,
> and Enterprise. On the Free plan you only get one custom connector.

## Step 3 — Turn it on in a conversation

In any chat, tap the **+** button near the message box, choose **Connectors**, and switch on
**GitHub**. You only need to do this per conversation.

## Step 4 — Try it

Say something like:

> In the executive-wellness-housing repo, change the phrase "Request a Residency" on the apply page
> to "Request a Stay." Open a pull request and give me the preview link.

Claude should: make a branch, edit the file, open a pull request, and come back with a link.

---

## How to read what comes back

Claude will hand you a **Netlify preview link** — a temporary copy of the whole site with just your
change in it. Open it, click around, and check the change looks right.

You'll also see a **check** on the pull request:

- **Green** — the site built successfully. Safe to look at the preview.
- **Red** — the build failed. **Do not merge.** Tell Claude "the check is red, what happened?" and
  it can read the log and fix it.
- **Yellow / spinning** — still building. Wait a minute.

When you're happy, tell Claude to merge it. The live site updates within a couple of minutes.

---

## Rules worth knowing

- **Never ask Claude to commit straight to `main`.** `main` is the live site. Everything goes
  through a pull request. The repo is configured to enforce this.
- **The inquiry form is delicate.** If you want to add or change a field on the apply form, say so
  explicitly — Claude has to update the form in two places or submissions silently lose that field.
  It's written up in `CLAUDE.md`, but flag it out loud anyway.
- **Don't rename the brand.** The site says "The Old Ruth — Executive Wellness Suites" on purpose,
  even though the project is called Executive Wellness Housing.
- **Never paste a password or API key into a chat.** If a task seems to need one, stop and ask Dan.

## When something looks wrong

Tell Claude plainly: "that's not what I meant," or "the preview looks broken." It can push a fix to
the same pull request and the preview link updates in place. Nothing is live until you merge.

If the live site itself looks broken, tell Dan — the previous deploy can be restored from Netlify in
under a minute.
