/**
 * Base path the site is served from.
 * - "" for `npm run dev` and a normal domain
 * - "/kamadhenu-dairy" when building for GitHub Pages (set by the deploy workflow
 *   or `npm run build:pages` via NEXT_PUBLIC_BASE_PATH)
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a /public file path with the base path.
 * next/link adds the base path automatically, but next/image with a string
 * `src` does NOT – so always wrap image paths with this.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path; // external URL
  return `${basePath}${path}`;
}
