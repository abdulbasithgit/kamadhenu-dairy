import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ownerPhoto } from "@/data/about";
import { site } from "@/data/site";
import { format } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { withBasePath } from "@/lib/basePath";
import { isSet } from "@/lib/contact";

/**
 * Owner card. Name comes from site.ownerName; until it's set a dashed
 * "name to be added" label is shown. The message is a placeholder
 * (about.team.message) until the owner writes one.
 */
export async function OwnerCard() {
  const { t } = await getI18n();
  const copy = t.about.team;
  const hasName = isSet(site.ownerName);
  return (
    <Section labelledBy="team-title">
      <SectionHeading id="team-title" eyebrow={copy.eyebrow} title={copy.title} />
      <FadeIn className="mx-auto mt-10 max-w-md">
        <article className="rounded-lg border border-gold bg-cream-50 p-1.5 shadow-soft">
          <div className="flex flex-col items-center rounded-md border border-gold-300 px-6 py-8 text-center">
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-gold-100 ring-1 ring-gold">
              {ownerPhoto ? (
                <Image
                  src={withBasePath(ownerPhoto.src)}
                  alt={hasName ? format(copy.photoAlt, { name: site.ownerName }) : ""}
                  fill
                  sizes="144px"
                  className="object-cover"
                  style={{ objectPosition: ownerPhoto.position ?? "center" }}
                />
              ) : (
                <Placeholder
                  label={copy.photoPlaceholder}
                  className="rounded-full border-0 p-3 text-xs [&_svg]:h-6 [&_svg]:w-6"
                />
              )}
            </div>
            {hasName ? (
              <h3 className="mt-5 text-subhead">{site.ownerName}</h3>
            ) : (
              <h3 className="mt-5">
                <span className="inline-block rounded-full border border-dashed border-gold-700 px-3 py-1 font-sans text-base font-semibold text-gold-700">
                  {copy.namePlaceholder}
                </span>
              </h3>
            )}
            <p className="mt-1 text-caption font-semibold tracking-[0.12em] text-leaf-700 uppercase">
              {copy.role}
            </p>
            <span aria-hidden="true" className="my-4 h-px w-12 bg-gold" />
            <p className="rounded-md border border-dashed border-gold-300 px-4 py-3 text-body text-ink-muted italic ta:text-base ta:not-italic">
              {copy.message}
            </p>
          </div>
        </article>
      </FadeIn>
    </Section>
  );
}
