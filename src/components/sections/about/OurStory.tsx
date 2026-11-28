import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { storyImage } from "@/data/about";
import { site } from "@/data/site";
import { format } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { withBasePath } from "@/lib/basePath";

/**
 * How the farm started and the family behind it.
 * The text is a TODO placeholder until the family writes their story
 * (about.story in the JSON files) – then set `storyIsPlaceholder` to false.
 * The founding year appears only when site.foundedYear is set.
 */
const storyIsPlaceholder = true;

export async function OurStory() {
  const { t } = await getI18n();
  const copy = t.about.story;
  return (
    <Section
      labelledBy="story-title"
      containerClassName="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14"
    >
      <FadeIn>
        <SectionHeading
          id="story-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          align="left"
        />
        {site.foundedYear !== null && (
          <p className="mt-4 inline-block rounded-full border border-gold bg-gold-100 px-3 py-1 text-caption font-semibold text-gold-700">
            {format(copy.since, { year: site.foundedYear })}
          </p>
        )}
        {storyIsPlaceholder ? (
          <div className="mt-6 rounded-lg border-2 border-dashed border-gold-300 p-4 sm:p-5">
            <PlaceholderNotice className="mx-0 mb-4 max-w-none">
              {copy.placeholderNotice}
            </PlaceholderNotice>
            <div className="space-y-3 text-body text-ink-muted ta:text-base">
              {copy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-body text-ink-muted ta:text-base">
            {copy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="rounded-lg border border-gold p-1.5 shadow-softer">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-gold-300">
            {storyImage ? (
              <Image
                src={withBasePath(storyImage.src)}
                alt={copy.imageAlt}
                fill
                sizes="(min-width: 768px) 440px, 100vw"
                className="object-cover"
                style={{ objectPosition: storyImage.position ?? "center" }}
              />
            ) : (
              <Placeholder label={copy.imagePlaceholder} className="border-0" />
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
