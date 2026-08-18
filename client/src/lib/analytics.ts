/**
 * Google Analytics 4.
 *
 * To turn analytics on: paste your GA4 Measurement ID below. It looks like
 * "G-XXXXXXXXXX" and comes from Google Analytics → Admin → Data streams → your
 * web stream. Leaving it empty disables tracking entirely — nothing loads.
 *
 * Tracking is deliberately limited to the production hostnames, so Netlify
 * deploy previews and local development never pollute the real numbers.
 */

export const GA_MEASUREMENT_ID = "G-RQ8W0NEY7H";

const PRODUCTION_HOSTS = ["executivewellnesshousing.com", "www.executivewellnesshousing.com"];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined") return;
  if (!PRODUCTION_HOSTS.includes(window.location.hostname)) return;
  if (document.getElementById("ga4")) return;

  const s = document.createElement("script");
  s.id = "ga4";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

/**
 * Records a page view for a client-side route change.
 *
 * Currently unused, and deliberately so: GA4's Enhanced Measurement includes
 * "page changes based on browser history events", which already captures this
 * app's Wouter navigation. Calling this as well would double-count every
 * navigation. Wire it up only if Enhanced Measurement is turned off.
 */
export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
