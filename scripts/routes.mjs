/**
 * The site's public routes — the single source of truth for prerendering, the
 * sitemap, and the verify gate.
 *
 * Adding a page means adding ONE line here. Before this file existed the route
 * list was duplicated in prerender.mjs and verify.mjs, and sitemap.xml was
 * hand-written — it sat three weeks stale, still claiming a lastmod of
 * 2026-08-12 while the site changed underneath it.
 *
 * `path` is also the canonical URL path passed to useSeo() by each page, so
 * the sitemap entry, the <link rel="canonical"> tag and the prerendered file
 * agree by construction rather than by anyone remembering.
 */
export const SITE_URL = "https://executivewellnesshousing.com";

export const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/corporate-housing", priority: "0.9", changefreq: "monthly" },
  { path: "/the-table", priority: "0.8", changefreq: "monthly" },
  { path: "/gallery", priority: "0.7", changefreq: "monthly" },
  { path: "/apply", priority: "0.7", changefreq: "monthly" },
];

export const ROUTE_PATHS = ROUTES.map((r) => r.path);

/** Short slug used for screenshot filenames in verify.mjs. */
export function routeName(path) {
  return path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
}
