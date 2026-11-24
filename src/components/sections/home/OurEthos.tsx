import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ethos } from "@/data/home";
import { getI18n } from "@/i18n/server";

/** Three pillars, each framed as a temple-style arch. */
export async function OurEthos() {
  const { t } = await getI18n();
  return (
    <Section tone="tile" labelledBy="ethos-title">
      <SectionHeading
        id="ethos-title"
        eyebrow={t.ethos.eyebrow}
        title={t.common.tagline}
      />
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {ethos.map((pillar, i) => {
          const Icon = iconMap[pillar.icon];
          const copy = t.ethos.items[pillar.id];
          return (
            <li key={pillar.id}>
              <FadeIn delay={i * 0.1} className="h-full">
                <div className="h-full arch rounded-b-lg border border-gold bg-cream-50/90 p-1.5 shadow-softer">
                  <div className="flex h-full flex-col items-center arch rounded-b-md border border-gold-300 px-6 pt-12 pb-8 text-center">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-300 rich:bg-forest-800">
                      <Icon size={28} />
                    </span>
                    <h3 className="text-subhead ta:text-xl">{copy.title}</h3>
                    <span aria-hidden="true" className="my-3 h-px w-12 bg-leaf" />
                    <p className="leading-relaxed text-ink-muted ta:text-[0.95rem]">
                      {copy.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
