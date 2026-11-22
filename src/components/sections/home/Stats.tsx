import { Counter } from "@/components/motion/Counter";
import { KolamDivider } from "@/components/ui/KolamDivider";
import { PlaceholderNotice, SampleBadge } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { stats } from "@/data/home";

export function Stats() {
  const hasPlaceholders = stats.some((s) => s.placeholder);
  return (
    <Section tone="navy" labelledBy="stats-title" className="relative">
      <h2 id="stats-title" className="sr-only">
        Our farm in numbers
      </h2>
      {hasPlaceholders && (
        <PlaceholderNotice onDark className="mb-10">
          Sample figures for layout only – not real numbers yet
        </PlaceholderNotice>
      )}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <dt className="order-2 mt-2 text-sm font-semibold tracking-wide text-cream/85 sm:text-base">
              {stat.label}
            </dt>
            <dd className="order-1 font-display text-4xl font-semibold text-gold-300 sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
            {stat.placeholder && (
              <dd className="order-3 mt-2">
                <SampleBadge onDark />
              </dd>
            )}
          </div>
        ))}
      </dl>
      <KolamDivider className="mt-12 text-gold/70" />
    </Section>
  );
}
