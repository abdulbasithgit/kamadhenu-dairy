import { Counter } from "@/components/motion/Counter";
import { KolamDivider } from "@/components/ui/KolamDivider";
import { PlaceholderNotice, SampleBadge } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { stats } from "@/data/home";
import { getI18n } from "@/i18n/server";

export async function Stats() {
  const { t } = await getI18n();
  const hasPlaceholders = stats.some((s) => s.placeholder);
  return (
    <Section tone="strong" labelledBy="stats-title" className="relative">
      <h2 id="stats-title" className="sr-only">
        {t.stats.title}
      </h2>
      {hasPlaceholders && (
        <PlaceholderNotice onDark className="mb-10">
          {t.stats.notice}
        </PlaceholderNotice>
      )}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center text-center">
            <dt className="order-2 mt-2 text-sm font-semibold tracking-wide text-cream/85 sm:text-base">
              {t.stats.items[stat.id]}
            </dt>
            <dd className="order-1 font-display text-4xl font-semibold text-gold-300 sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
            {stat.placeholder && (
              <dd className="order-3 mt-2">
                <SampleBadge onDark label={t.common.sample} />
              </dd>
            )}
          </div>
        ))}
      </dl>
      <KolamDivider onDark className="mt-12" />
    </Section>
  );
}
