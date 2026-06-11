import type { NextConfig } from "next";

/**
 * The site builds to a static export (`out/`) for BOTH hosts; the only
 * difference is the base path:
 *
 *   GitHub Pages — CI sets NEXT_PUBLIC_BASE_PATH=/worldcard → export is served
 *                  under the /worldcard subpath.
 *   Vercel/local — NEXT_PUBLIC_BASE_PATH unset → export served at the root.
 *                  vercel.json pins Vercel to serve the `out/` directory.
 *
 * `trailingSlash` makes /cards resolve to cards/index.html on a static host.
 * `images.unoptimized` keeps the export self-contained (no image optimizer;
 * the site uses plain <img> for flags/logo anyway).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
