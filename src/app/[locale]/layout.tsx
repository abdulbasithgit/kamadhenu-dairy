import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { site } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { I18nProvider } from "@/i18n/I18nProvider";
import { fontVariables } from "../fonts";
import "../globals.css";

// Only /en and /ta exist (required for static export)
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${site.shortName}` },
    description: t.meta.description,
    // Keep search engines out while this is a review/preview build
    robots: site.previewMode ? { index: false, follow: false } : undefined,
    alternates: site.previewMode
      ? undefined
      : { languages: { en: "/en/", ta: "/ta/", "x-default": "/en/" } },
  };
}

export const viewport: Viewport = {
  themeColor: "#1F3354",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-theme={site.colorTheme}
      // lets Next.js turn off smooth scrolling during route changes
      data-scroll-behavior="smooth"
      // the preview-banner script may add data-preview-dismissed before hydration
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.common.skipToContent}
        </a>
        <I18nProvider locale={locale} t={t}>
          <PreviewBanner />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </I18nProvider>
      </body>
    </html>
  );
}
