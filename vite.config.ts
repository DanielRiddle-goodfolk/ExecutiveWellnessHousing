import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * The build stamp shown under the footer of every page, so you can tell which
 * build is live without opening a deploy log.
 *
 * Format: 1.<PR number>. Build 1.17 is the build produced by pull request #17.
 *
 * Netlify sets REVIEW_ID to the pull request number on deploy previews, but
 * NOT on production builds — no environment variable carries it there.
 * Production recovers it from the commit subject instead: this repo squash
 * merges, and GitHub's default squash subject ends with "(#17)". The useful
 * consequence is that a preview and the production build it later becomes
 * report the SAME number, so "the preview I approved" and "what is live" are
 * directly comparable.
 *
 * If a squash title is hand-edited so the "(#17)" is gone, production falls
 * back to the short commit SHA — still unambiguous, just harder to read. If
 * you ever see a SHA here instead of a number, that is why.
 */
function buildVersion(): string {
  if (process.env.REVIEW_ID) return `1.${process.env.REVIEW_ID}`;

  try {
    const subject = execSync("git log -1 --pretty=%s", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const pr = subject.match(/\(#(\d+)\)\s*$/);
    if (pr) return `1.${pr[1]}`;
  } catch {
    // git not available in this environment — fall through to the SHA
  }

  const sha = process.env.COMMIT_REF;
  return sha ? `1.${sha.slice(0, 7)}` : "1.dev";
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD_VERSION__: JSON.stringify(buildVersion()),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
