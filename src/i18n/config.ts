/** Supported languages. English is the default. */
export const locales = ["en", "ta"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** localStorage key that remembers the visitor's language choice */
export const LOCALE_STORAGE_KEY = "kamadhenu-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The other language (for the toggle) */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ta" : "en";
}

/**
 * Prefixes an internal path with the locale: ("ta", "/products") → "/ta/products/".
 * next/link adds the GitHub Pages base path on top of this automatically.
 */
export function localizedHref(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `/${locale}${clean}/`;
}

/** Removes the locale prefix from a pathname: "/ta/products/" → "/products/" */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ta)(?=\/|$)/, "") || "/";
}
