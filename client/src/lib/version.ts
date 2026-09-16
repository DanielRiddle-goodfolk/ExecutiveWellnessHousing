/**
 * Which build is live.
 *
 * The value is computed in vite.config.ts and substituted into the bundle at
 * build time — see the comment on buildVersion() there for where the number
 * comes from and when it falls back to a commit SHA.
 *
 * Because it is baked in rather than fetched, the prerendered HTML carries it
 * too, so it can be read without opening a browser:
 *
 *   curl -s https://executivewellnesssuites.com/ | grep -o '\-\-build-version:[^;"]*'
 */
declare const __BUILD_VERSION__: string;

export const BUILD_VERSION: string =
  typeof __BUILD_VERSION__ === "string" ? __BUILD_VERSION__ : "dev";

/**
 * Publishes the version as a CSS custom property on <html>, which the
 * `footer::after` rule in index.css renders.
 *
 * Why CSS rather than a React component: the five pages each carry their own
 * hand-written footer markup, with different colours on the ivory pages and
 * the charcoal ones. A stamp that has to be pasted into five footers is a
 * stamp that ends up in four, and each copy would need its own colour. As
 * generated content on whatever <footer> the page already has, it inherits
 * that footer's colour automatically and lives in exactly one place.
 */
export function publishBuildVersion() {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--build-version", `"${BUILD_VERSION}"`);
}
