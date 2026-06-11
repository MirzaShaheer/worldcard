import type { NextConfig } from "next";

/**
 * Dual-target config.
 *
 * GitHub Pages (CI sets NEXT_PUBLIC_BASE_PATH=/worldcard):
 *   → static export to `out/`, served under the /worldcard subpath, with
 *     trailingSlash so /cards/ resolves to cards/index.html.
 *
 * Vercel & local dev (NEXT_PUBLIC_BASE_PATH unset):
 *   → a normal Next.js build served at the root domain. We do NOT force
 *     `output: "export"` here, because Vercel runs Next natively and a static
 *     export confuses its routing (causing 404 NOT_FOUND).
 *
 * The Pages-only env var is the single switch that selects the target.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isPagesExport = basePath !== "";

const nextConfig: NextConfig = {
  // Harmless when next/image is unused; required for a self-contained export.
  images: { unoptimized: true },
  ...(isPagesExport
    ? { output: "export", trailingSlash: true, basePath }
    : {}),
};

export default nextConfig;
