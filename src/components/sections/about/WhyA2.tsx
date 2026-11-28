import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { a2Points } from "@/data/about";
import { getI18n } from "@/i18n/server";

/**
 * Plain-language explanation of A2 milk and native cows.
 * Keep this honest: no medical or health claims (the last point says so).
 */
export async function WhyA2() {
  const { t } = await getI18n();
  const copy = t.about.a2;
  return (
    <Section labelledBy="a2-title">
      <SectionHeading
        id="a2-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {a2Points.map((point, i) => {
          const Icon = iconMap[point.icon];
          const text = copy.items[point.id];
          return (
            <li key={point.id}>
              <FadeIn delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-lg border-t-4 border-leaf bg-cream-50 px-6 py-7 shadow-softer">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-leaf-700">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-card ta:text-lg">{text.title}</h3>
                  <p className="mt-3 text-body text-ink-muted ta:text-base">
                    {text.text}
                  </p>
                </div>
              </FadeIn>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
