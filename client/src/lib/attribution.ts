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
  /** First page of this site the visitor saw, e.g. "/corporate-housing" */
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

    const record: Attribution = {
      landingPage: window.location.pathname + window.location.search,
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
