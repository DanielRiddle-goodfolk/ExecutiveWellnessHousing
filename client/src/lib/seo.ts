import { useEffect } from "react";

export const SITE_URL = "https://executivewellnesshousing.com";
export const SITE_NAME = "The Old Ruth — Executive Wellness Housing";

/**
 * Shown to a visitor if a form submission fails, so they have a way to reach you.
 * CHANGE THIS to a real, monitored mailbox — it is the only hardcoded address on the site.
 */
export const INQUIRY_EMAIL = "Jennie@goodfolk.com";

/**
 * The social sharing card: the picture people see when a link to this site is
 * pasted into LinkedIn, Facebook, X, Slack, or a text message.
 *
 * THIS FILE MUST STAY A JPEG. Every other photo on the site is WebP, which is
 * correct for pages — but LinkedIn's crawler does not reliably read WebP, and
 * when it cannot read the image it shows a card with no picture at all.
 * LinkedIn is the channel that matters most for corporate housing, so this one
 * file is a deliberate exception to the "convert everything to WebP" rule in
 * CLAUDE.md. Do not "optimise" it.
 *
 * It is 1200x630 — the shape every platform crops to.
 *
 * To replace it: keep 1200x630, keep it JPEG, and give the new file a NEW
 * filename rather than overwriting this one. The platforms cache the old
 * picture against the old address for about a week; a new filename makes them
 * fetch the new one straight away. Update DEFAULT_OG_IMAGE_ALT to match, and
 * update the same tags in client/index.html.
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/og-default-2026-08.jpg`;
export const DEFAULT_OG_IMAGE_ALT =
  "The Old Ruth — a circa-1888 brick mansion in La Porte, Indiana, seen across its lawn through mature trees";
const DEFAULT_OG_IMAGE_WIDTH = "1200";
const DEFAULT_OG_IMAGE_HEIGHT = "630";

/** The mansion was built in 1888. */
export const FOUNDED_YEAR = 1888;

/**
 * Years since the house was built — computed, never hardcoded, so it cannot go
 * stale the way "128 years" did.
 *
 * One caveat: the prerendered HTML captures this at build time. If a new year
 * begins and the site is not redeployed, crawlers see last year's number until
 * the next build. The browser corrects it on load, so visitors always see the
 * right figure.
 */
export function yearsSince(): number {
  return new Date().getFullYear() - FOUNDED_YEAR;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  /** Above-the-fold hero image; emitted as <link rel="preload"> to improve LCP. */
  preloadImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Keeps a page out of search results. Used by the 404. */
  noindex?: boolean;
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets per-route head tags. Runs on the client for SPA navigation, and is
 * captured verbatim by the prerenderer so crawlers see the same tags in the
 * served HTML.
 */
export function useSeo({ title, description, path, ogImage, preloadImage, jsonLd, noindex }: SeoInput) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertLink("canonical", url);
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
    });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    // Dimensions and alt text describe one specific picture, so they are only
    // emitted for the default card. A page that supplies its own ogImage would
    // otherwise inherit the wrong numbers and the wrong description, so any
    // leftover tags are cleared instead.
    if (image === DEFAULT_OG_IMAGE) {
      upsertMeta('meta[property="og:image:width"]', {
        property: "og:image:width",
        content: DEFAULT_OG_IMAGE_WIDTH,
      });
      upsertMeta('meta[property="og:image:height"]', {
        property: "og:image:height",
        content: DEFAULT_OG_IMAGE_HEIGHT,
      });
      upsertMeta('meta[property="og:image:alt"]', {
        property: "og:image:alt",
        content: DEFAULT_OG_IMAGE_ALT,
      });
      upsertMeta('meta[name="twitter:image:alt"]', {
        name: "twitter:image:alt",
        content: DEFAULT_OG_IMAGE_ALT,
      });
    } else {
      removeMeta('meta[property="og:image:width"]');
      removeMeta('meta[property="og:image:height"]');
      removeMeta('meta[property="og:image:alt"]');
      removeMeta('meta[name="twitter:image:alt"]');
    }

    document.head.querySelectorAll('link[data-seo-preload="true"]').forEach((n) => n.remove());
    if (preloadImage) {
      const l = document.createElement("link");
      l.rel = "preload";
      l.as = "image";
      l.setAttribute("href", preloadImage);
      l.setAttribute("fetchpriority", "high");
      l.setAttribute("data-seo-preload", "true");
      document.head.appendChild(l);
    }

    const prior = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
    prior.forEach((n) => n.remove());
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const block of blocks) {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-seo-jsonld", "true");
        s.textContent = JSON.stringify(block);
        document.head.appendChild(s);
      }
    }
  }, [title, description, path, ogImage, preloadImage, jsonLd]);
}

export const LODGING_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  description:
    "Private executive housing in a 30,000 sq ft National Historic Registry mansion. Corporate wellness suites with organic dining, integrated recovery modalities, and private strategy spaces.",
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "La Porte Historic District",
    addressLocality: "La Porte",
    addressRegion: "IN",
    postalCode: "46350",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.6106, longitude: -86.7225 },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Private Suites", value: true },
    { "@type": "LocationFeatureSpecification", name: "Chef-Prepared Organic Meals", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wellness & Recovery Center", value: true },
    { "@type": "LocationFeatureSpecification", name: "Executive Meeting Space", value: true },
  ],
  numberOfRooms: 20,
  petsAllowed: false,
  smokingAllowed: false,
} as const;
