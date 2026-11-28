import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { KolamDivider } from "@/components/ui/KolamDivider";
import { LeafAccent } from "@/components/ui/LeafAccent";
import { Section } from "@/components/ui/Section";
import { comingSoonPages } from "@/data/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import { whatsappHref } from "@/lib/contact";
import { pageMetadata, pageTitle } from "@/lib/seo";

/**
 * Translated "Coming soon" page for every menu page that isn't built yet
 * (listed in src/data/navigation.ts → comingSoonPages).
 * A real page folder (e.g. app/[locale]/products/) automatically takes priority.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return comingSoonPages.map((p) => ({ section: p.slug }));
}

function findPage(section: string) {
  return comingSoonPages.find((p) => p.slug === section);
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[section]">): Promise<Metadata> {
  const { locale, section } = await params;
  const page = findPage(section);
  if (!isLocale(locale) || !page) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/${page.slug}`,
    title: pageTitle(t.nav[page.key]),
    description: t.comingSoon.text,
  });
}

export default async function ComingSoonPage({
  params,
}: PageProps<"/[locale]/[section]">) {
  const { locale, section } = await params;
  const page = findPage(section);
  if (!isLocale(locale) || !page) notFound();
  const t = getDictionary(locale);

  return (
    <Section tone="tile" className="flex min-h-[60vh] items-center">
      <div className="mx-auto max-w-xl rounded-lg border border-gold bg-cream-50/95 p-1.5 shadow-soft">
        <div className="rounded-md border border-gold-300 px-6 py-12 text-center sm:px-10">
          <p className="mb-3 flex items-center justify-center gap-2 text-caption font-semibold tracking-[0.18em] text-gold-700 uppercase ta:text-sm">
            <LeafAccent />
            {t.comingSoon.eyebrow}
          </p>
          <h1 className="text-section ta:text-2xl ta:sm:text-3xl">
            {format(t.comingSoon.title, { page: t.nav[page.key] })}
          </h1>
          <p className="mt-4 text-body text-ink-muted">{t.comingSoon.text}</p>
          <KolamDivider className="my-6" />
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={whatsappHref(t.whatsapp.greeting)}
              external
              variant="whatsapp"
            >
              <WhatsAppIcon size={18} />
              {t.common.orderOnWhatsApp}
            </ButtonLink>
            <ButtonLink href={localizedHref(locale, "/")} variant="outline">
              {t.comingSoon.back}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
