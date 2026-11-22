import { iconMap } from "@/components/icons/iconMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { subscriptionSteps } from "@/data/home";

export function HowItWorks() {
  return (
    <Section tone="light" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        eyebrow="Subscription"
        title="How doorstep delivery works"
        intro="Four simple steps, and fresh milk turns up every morning."
      />

      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* dotted gold line joining the steps on large screens */}
        <span
          aria-hidden="true"
          className="absolute top-8 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-gold/60 lg:block"
        />
        {subscriptionSteps.map((step, i) => {
          const Icon = iconMap[step.icon];
          return (
            <li key={step.title} className="relative text-center">
              <FadeIn delay={i * 0.1}>
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-cream text-navy shadow-softer">
                  <Icon size={28} />
                  <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-60 leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </FadeIn>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 text-center">
        <ButtonLink href="/subscribe" size="lg">
          Start my subscription
        </ButtonLink>
      </div>
    </Section>
  );
}
