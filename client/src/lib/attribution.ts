/**
 * Lead attribution.
 *
 * The site has five pages but only one form, at /apply. Without this, every
 * inquiry arrives looking identical — you cannot tell whether someone found the
 * corporate-housing landing page through search or typed the homepage in from a
 * business card.
 *
 * So on the visitor's first page view we record where they came from, keep it
 * for the length of the browser session, and attach it when they submit.
 *
 * First touch wins: if someone lands on /corporate-housing, browses to /apply
 * and submits, we report /corporate-housing — the page that actually brought
 * them in, not the page the form happens to live on.
 *
 * Best-effort by design. Private browsing, disabled storage, or a visitor who
 * blocks referrers all degrade to empty values rather than throwing. A missing
 * attribution is a minor loss; a form that fails to submit is not.
 */

const KEY = "ewh:attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = {
  /**
   * First page of this site the visitor saw, e.g. "/corporate-housing" — or
   * "housing.executivewellnesssuites.com" for a visitor handed off from the
   * housing landing page (see captureAttribution).
   */
  landingPage: string;
  /** External site that sent them, or "(direct)" */
  referrer: string;
  /** Campaign tags from the landing URL, or "" */
  campaign: string;
};

const EMPTY: Attribution = { landingPage: "", referrer: "", campaign: "" };

/** Records where this visitor came from. Safe to call on every page load. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    // First touch wins — never overwrite.
    if (window.sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);

    // Hand-off from the housing landing page at housing.executivewellnesssuites.com
    // (client/public/housing/index.html). That page is a different origin: it
    // cannot share this sessionStorage and does not run this file, so without
    // this its visitors' first page view here is /apply and their leads would be
    // credited to the form instead of the page that sent them. Its button passes
    // what it saw — ews_lp is where the visitor landed, ews_ref is the site that
    // sent them there. Campaign tags and ad click ids are passed through
    // unchanged and read below like any others. Rename either parameter and you
    // must rename it in that page too.
    const handoffLanding = (params.get("ews_lp") ?? "").slice(0, 200);
    const handoffReferrer = (params.get("ews_ref") ?? "").slice(0, 500);

    const utm = UTM_KEYS.map((k) => {
      const v = params.get(k);
      return v ? `${k.replace("utm_", "")}=${v}` : null;
    })
      .filter(Boolean)
      .join(" · ");

    // Ad platforms often send a click id instead of UTM tags.
    const clickId = params.get("gclid")
      ? "gclid (Google Ads)"
      : params.get("fbclid")
        ? "fbclid (Meta)"
        : "";

    // Ignore same-site referrers — internal navigation is not a traffic source.
    let referrer = document.referrer || "";
    if (referrer) {
      try {
        if (new URL(referrer).hostname === window.location.hostname) referrer = "";
      } catch {
        referrer = "";
      }
    }

    // Netlify serves prerendered routes as directories, so paths arrive with a
    // trailing slash. Strip it so "/corporate-housing" and "/corporate-housing/"
    // do not count as two different landing pages.
    const path = window.location.pathname.replace(/(.)\/$/, "$1");

    const record: Attribution = handoffLanding
      ? {
          landingPage: handoffLanding,
          referrer: handoffReferrer || "(direct)",
          campaign: utm || clickId,
        }
      : {
          landingPage: path + window.location.search,
          referrer: referrer || "(direct)",
          campaign: utm || clickId,
        };

    window.sessionStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable. Attribution is optional; never let it break the page.
  }
}

/** Returns what was captured, or empty strings if nothing was. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

/**
 * Attaches attribution to an outgoing form submission.
 *
 * The field names live here, beside the values, so changing one means editing
 * this file alone. They must match the hidden Netlify declaration in
 * client/index.html exactly, or Netlify silently drops them.
 *
 * Do not use the names Netlify reserves for itself — `referrer`, `ip`, or
 * `user_agent`. Netlify records those on every submission automatically, and a
 * collision is invisible: its value wins, yours never appears, and the field
 * looks populated in Zapier. "Traffic Source" exists because "Referrer" hit
 * exactly that.
 */
export function applyAttribution(data: FormData): void {
  const a = getAttribution();
  data.set("Landing Page", a.landingPage);
  data.set("Traffic Source", a.referrer);
  data.set("Campaign", a.campaign);
}
