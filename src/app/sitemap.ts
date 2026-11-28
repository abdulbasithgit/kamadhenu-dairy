import type { MetadataRoute } from "next";
import { builtPages } from "@/data/navigation";
import { localizedHref, locales } from "@/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

// Required so /sitemap.xml is written as a static file with output: "export"
export const dynamic = "force-static";

/**
 * /sitemap.xml – every built page in every language, with absolute URLs
 * from site.url. "Coming soon" pages are left out until they are real.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return builtPages().flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedHref(locale, path)),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
