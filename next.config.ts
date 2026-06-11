import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * - `output: "export"` emits a fully static site into `out/` on `next build`.
 * - On GitHub Pages the project site is served under a subpath
 *   (https://<user>.github.io/worldcard/), so the deploy workflow sets
 *   NEXT_PUBLIC_BASE_PATH=/worldcard. Locally the var is unset → site runs at root.
 * - `trailingSlash` makes routes resolve as /cards/ → cards/index.html on Pages.
 * - `images.unoptimized` keeps the export self-contained (no image optimizer).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
