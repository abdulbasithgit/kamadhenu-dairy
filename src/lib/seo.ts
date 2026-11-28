import type { Metadata } from "next";
import { site } from "@/data/site";
import { defaultLocale, localizedHref, locales, type Locale } from "@/i18n/config";

/** "/en/about/" → "https://…/kamadhenu-dairy/en/about/" (uses site.url) */
export function absoluteUrl(path: string): string {
  return `${site.url.replace(/\/+$/, "")}${path}`;
}

/** Inner-page title as shown in the browser tab AND in link previews */
export function pageTitle(title: string): string {
  return `${title} | ${site.shortName}`;
}

/** Absolute URL of each language version of a page, plus x-default */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(localizedHref(l, path));
  languages["x-default"] = absoluteUrl(localizedHref(defaultLocale, path));
  return languages;
}

const ogLocale: Record<Locale, string> = { en: "en_IN", ta: "ta_IN" };

/**
 * Metadata for one page: browser title, description, canonical + hreflang
 * links and Open Graph / Twitter tags. `title` is the full title, used
 * unchanged everywhere so the tab and the link preview always match.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  /** Path without locale, e.g. "/" or "/about" */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(localizedHref(locale, path));
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary", title, description },
  };
}
