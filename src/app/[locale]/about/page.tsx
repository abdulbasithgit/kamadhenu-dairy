import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { OurStory } from "@/components/sections/about/OurStory";
import { OwnerCard } from "@/components/sections/about/OwnerCard";
import { Timeline } from "@/components/sections/about/Timeline";
import { WhyA2 } from "@/components/sections/about/WhyA2";
import { OurEthos } from "@/components/sections/home/OurEthos";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { aboutHeroImage } from "@/data/about";
import { site } from "@/data/site";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const { title, description } = t.about.meta;
  return {
    title,
    description,
    alternates: site.previewMode
      ? undefined
      : {
          canonical: localizedHref(locale, "/about"),
          languages: {
            en: localizedHref("en", "/about"),
            ta: localizedHref("ta", "/about"),
            "x-default": localizedHref("en", "/about"),
          },
        },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      type: "website",
      locale: locale === "ta" ? "ta_IN" : "en_IN",
      siteName: site.name,
      url: localizedHref(locale, "/about"),
    },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const hero = t.about.hero;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        image={aboutHeroImage}
        imageAlt={hero.imageAlt}
        placeholderLabel={hero.imagePlaceholder}
      />
      <OurStory />
      <MissionVision />
      <WhyA2 />
      <Timeline />
      <OurEthos />
      <OwnerCard />
      <CtaBand title={t.about.cta.title} text={t.about.cta.text} />
    </>
  );
}
