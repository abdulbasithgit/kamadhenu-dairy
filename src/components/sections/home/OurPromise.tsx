import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { promises } from "@/data/home";
import { getI18n } from "@/i18n/server";

export async function OurPromise() {
  const { t } = await getI18n();
  return (
    <Section tone="sage" labelledBy="promise-title">
      <SectionHeading
        id="promise-title"
        eyebrow={t.promise.eyebrow}
        title={t.promise.title}
        intro={t.promise.intro}
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((item, i) => {
          const Icon = iconMap[item.icon];
          const copy = t.promise.items[item.id];
          return (
            <li key={item.id}>
              <FadeIn delay={i * 0.08} className="h-full">
                <div className="h-full rounded-lg border border-gold/40 bg-cream-50 p-6 text-center shadow-softer transition-shadow hover:shadow-soft">
                  <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-sage-50 text-leaf-700 ring-4 ring-sage-100">
                    <Icon size={30} />
                  </span>
                  <h3 className="text-card ta:text-lg">{copy.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted ta:text-[0.95rem]">
                    {copy.text}
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
