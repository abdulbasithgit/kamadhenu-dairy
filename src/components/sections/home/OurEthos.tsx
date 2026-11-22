import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ethos } from "@/data/home";

/** Three pillars, each framed as a temple-style arch. */
export function OurEthos() {
  return (
    <Section tone="tile" labelledBy="ethos-title">
      <SectionHeading
        id="ethos-title"
        eyebrow="Our ethos"
        title="Purity • Tradition • Quality"
      />
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {ethos.map((pillar, i) => {
          const Icon = iconMap[pillar.icon];
          return (
            <li key={pillar.title}>
              <FadeIn delay={i * 0.1} className="h-full">
                <div className="h-full arch rounded-b-lg border border-gold bg-cream-50/90 p-1.5 shadow-softer">
                  <div className="flex h-full flex-col items-center arch rounded-b-md border border-gold-300 px-6 pt-12 pb-8 text-center">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-300">
                      <Icon size={28} />
                    </span>
                    <h3 className="text-2xl font-semibold">{pillar.title}</h3>
                    <span aria-hidden="true" className="my-3 h-px w-12 bg-gold" />
                    <p className="leading-relaxed text-ink-muted">{pillar.text}</p>
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
