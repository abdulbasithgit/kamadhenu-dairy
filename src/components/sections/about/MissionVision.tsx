import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missionVision } from "@/data/about";
import { site } from "@/data/site";
import { format } from "@/i18n/format";
import { getI18n } from "@/i18n/server";

/** Two short cards: mission and vision. */
export async function MissionVision() {
  const { locale, t } = await getI18n();
  const copy = t.about.mission;
  return (
    <Section tone="sage" labelledBy="mission-title">
      <SectionHeading id="mission-title" eyebrow={copy.eyebrow} title={copy.title} />
      <ul className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        {missionVision.map((item, i) => {
          const Icon = iconMap[item.icon];
          const text = copy.items[item.id];
          return (
            <li key={item.id}>
              <FadeIn delay={i * 0.1} className="h-full">
                <div className="h-full rounded-lg border border-gold bg-cream-50 p-1.5 shadow-softer">
                  <div className="h-full rounded-md border border-gold-300 px-6 py-7 sm:px-8">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold-300 rich:bg-forest-800">
                      <Icon size={24} />
                    </span>
                    <h3 className="text-subhead ta:text-xl">{text.title}</h3>
                    <span aria-hidden="true" className="my-3 block h-px w-12 bg-leaf" />
                    <p className="text-body text-ink-muted ta:text-base">
                      {format(text.text, { area: site.serviceArea[locale] })}
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
