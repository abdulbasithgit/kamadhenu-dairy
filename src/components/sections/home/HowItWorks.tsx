import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { subscriptionSteps } from "@/data/home";
import { localizedHref } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

export async function HowItWorks() {
  const { locale, t } = await getI18n();
  return (
    <Section tone="sage" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        eyebrow={t.how.eyebrow}
        title={t.how.title}
        intro={t.how.intro}
      />

      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* dashed green line joining the steps on large screens */}
        <span
          aria-hidden="true"
          className="absolute top-8 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-leaf/50 lg:block"
        />
        {subscriptionSteps.map((step, i) => {
          const Icon = iconMap[step.icon];
          const copy = t.how.steps[step.id];
          return (
            <li key={step.id} className="relative text-center">
              <FadeIn delay={i * 0.1}>
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-cream text-navy shadow-softer">
                  <Icon size={28} />
                  <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm font-bold text-white rich:bg-forest-800">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-card ta:text-lg">{copy.title}</h3>
                <p className="mx-auto mt-2 max-w-60 leading-relaxed text-ink-muted ta:text-[0.95rem]">
                  {copy.text}
                </p>
              </FadeIn>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 text-center">
        <ButtonLink href={localizedHref(locale, "/subscribe")} size="lg">
          {t.how.cta}
        </ButtonLink>
      </div>
    </Section>
  );
}
