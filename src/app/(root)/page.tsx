import Link from "next/link";
import { LOCALE_STORAGE_KEY, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { basePath } from "@/lib/basePath";

/**
 * "/" → the visitor's saved language (set by the header toggle), else English.
 * Static export has no server redirects, so this runs as a tiny inline script
 * (with a <noscript> fallback to /en/).
 */
export default function RootRedirectPage() {
  const en = getDictionary("en");
  const ta = getDictionary("ta");
  const script = `(function(){var l=${JSON.stringify(defaultLocale)};try{var s=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});if(s==="en"||s==="ta")l=s}catch(e){}location.replace(${JSON.stringify(basePath)}+"/"+l+"/")})();`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${basePath}/en/`} />
      </noscript>
      <p className="flex flex-col items-center gap-2 p-6 text-center">
        <Link
          href="/en/"
          className="font-semibold text-navy underline underline-offset-4"
        >
          {en.redirect.continue}
        </Link>
        <Link
          href="/ta/"
          lang="ta"
          className="font-semibold text-navy underline underline-offset-4"
        >
          {ta.redirect.continue}
        </Link>
      </p>
    </>
  );
}
