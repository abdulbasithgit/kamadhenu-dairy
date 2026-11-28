import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/data/about";
import { getI18n } from "@/i18n/server";

/**
 * Farm milestones from src/data/about.ts → timeline.
 * Renders nothing while that list is empty. Years show only when set.
 */
export async function Timeline() {
  if (timeline.length === 0) return null;
  const { t } = await getI18n();
  const copy = t.about.timeline;
  // Widened so the component still type-checks while the items list is empty
  const items: Record<string, { title: string; text: string } | undefined> = copy.items;
  return (
    <Section tone="sage" labelledBy="timeline-title">
      <SectionHeading id="timeline-title" eyebrow={copy.eyebrow} title={copy.title} />
      <ol className="relative mx-auto mt-10 max-w-2xl border-l-2 border-gold-300 pl-8">
        {timeline.map((item, i) => {
          const text = items[item.id];
          if (!text) return null;
          return (
            <li key={item.id} className="relative pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[2.5625rem] h-4 w-4 rounded-full border-2 border-gold bg-cream-50 ring-4 ring-sage-50 rich:ring-sage-100"
              />
              <FadeIn delay={i * 0.05}>
                {item.year !== null && (
                  <p className="text-caption font-bold tracking-[0.12em] text-gold-700">
                    {item.year}
                  </p>
                )}
                <h3 className="mt-1 text-card ta:text-lg">{text.title}</h3>
                <p className="mt-2 text-body text-ink-muted ta:text-base">{text.text}</p>
              </FadeIn>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
