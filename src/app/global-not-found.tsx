import type { Metadata } from "next";
import Link from "next/link";
import { KolamDivider } from "@/components/ui/KolamDivider";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import { fontVariables } from "./fonts";
import "./globals.css";

const en = getDictionary("en");
const ta = getDictionary("ta");

export const metadata: Metadata = {
  title: `${en.notFound.title} | ${site.shortName}`,
  robots: { index: false, follow: false },
};

/**
 * 404 for any URL that doesn't exist (also exported as 404.html for GitHub Pages).
 * Shown in both languages because the URL may not tell us which one the visitor uses.
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      data-theme={site.colorTheme}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full items-center justify-center bg-athangudi p-4 font-sans rich:bg-athangudi-sage">
        <main className="w-full max-w-lg rounded-lg border border-gold bg-cream-50 p-1.5 shadow-soft">
          <div className="rounded-md border border-gold-300 px-6 py-10 text-center">
            <p className="font-display text-6xl font-semibold text-gold-700">404</p>
            <h1 className="mt-3 text-3xl font-semibold">{en.notFound.title}</h1>
            <p className="mt-2 text-ink-muted">{en.notFound.text}</p>
            <div lang="ta" className="mt-5">
              <h2 className="text-2xl font-semibold">{ta.notFound.title}</h2>
              <p className="mt-1 text-ink-muted">{ta.notFound.text}</p>
            </div>
            <KolamDivider className="my-6" />
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/en/"
                className="inline-flex items-center justify-center rounded-lg bg-navy px-5 py-2.5 font-semibold text-white hover:bg-navy-900"
              >
                {en.notFound.home}
              </Link>
              <Link
                href="/ta/"
                lang="ta"
                className="inline-flex items-center justify-center rounded-lg border border-navy px-5 py-2.5 font-semibold text-navy hover:bg-navy hover:text-white"
              >
                {ta.notFound.home}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
