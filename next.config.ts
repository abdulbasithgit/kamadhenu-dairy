import type { NextConfig } from "next";

/**
 * GitHub Pages serves the site from https://<user>.github.io/<repo>/,
 * so Pages builds set NEXT_PUBLIC_BASE_PATH=/kamadhenu-dairy.
 * Locally (npm run dev / npm run build) it is empty and the site runs at "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Static HTML export (written to /out) – no Node server needed
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,

  // One 404 page for URLs outside /en and /ta (there are several root layouts)
  experimental: {
    globalNotFound: true,
  },

  // Note: cacheComponents / partialPrefetching are NOT used – Partial
  // Prerendering can't run in static export mode.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
