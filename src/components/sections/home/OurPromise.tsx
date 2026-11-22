import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { promises } from "@/data/home";

export function OurPromise() {
  return (
    <Section tone="light" labelledBy="promise-title">
      <SectionHeading
        id="promise-title"
        eyebrow="Why A2 milk"
        title="Our promise to your family"
        intro="Good milk doesn't need clever marketing. It needs healthy cows, clean hands and a short trip to your door."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <li key={item.title}>
              <FadeIn delay={i * 0.08} className="h-full">
                <div className="h-full rounded-lg border border-gold/40 bg-cream p-6 text-center shadow-softer transition-shadow hover:shadow-soft">
                  <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-cream-50 text-gold-700 ring-4 ring-gold-100">
                    <Icon size={30} />
                  </span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </FadeIn>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
