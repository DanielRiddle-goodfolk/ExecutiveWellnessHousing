import { useEffect } from "react";

export const SITE_URL = "https://executivewellnesshousing.com";
export const SITE_NAME = "The Old Ruth — Executive Wellness Suites";

/**
 * Shown to a visitor if a form submission fails, so they have a way to reach you.
 * CHANGE THIS to a real, monitored mailbox — it is the only hardcoded address on the site.
 */
export const INQUIRY_EMAIL = "Jennie@goodfolk.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/TOR-Summer-2025-56_5baec9be.webp`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  /** Above-the-fold hero image; emitted as <link rel="preload"> to improve LCP. */
  preloadImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
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
export function useSeo({ title, description, path, ogImage, preloadImage, jsonLd }: SeoInput) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertLink("canonical", url);

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
