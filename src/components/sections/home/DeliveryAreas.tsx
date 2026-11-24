import { MapPinIcon } from "@/components/icons";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { format, formatTimeRange } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { PincodeChecker } from "./PincodeChecker";

export async function DeliveryAreas() {
  const { locale, t } = await getI18n();
  const time = formatTimeRange(locale, site.hours.delivery.from, site.hours.delivery.to);
  const intro = time
    ? `${t.delivery.intro} ${format(t.delivery.deliveryTime, { time })}`
    : t.delivery.intro;

  return (
    <Section
      id="delivery"
      labelledBy="delivery-title"
      containerClassName="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <SectionHeading
          id="delivery-title"
          align="left"
          eyebrow={t.delivery.eyebrow}
          title={t.delivery.title}
          intro={intro}
        />
        {!site.deliveryAreasConfirmed && (
          <PlaceholderNotice className="mx-0 mt-6">{t.delivery.notice}</PlaceholderNotice>
        )}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {site.deliveryAreas.map((area) => (
            <li
              key={area.id}
              className="flex items-start gap-3 rounded-lg border border-gold/40 bg-cream-50 p-4"
            >
              <MapPinIcon size={20} className="mt-0.5 shrink-0 text-leaf-700" />
              <span>
                <span className="block font-display text-lg font-semibold text-navy ta:font-tamil ta:text-base">
                  {area.name[locale]}
                </span>
                <span className="text-sm text-ink-muted">{area.pincodes.join(", ")}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <PincodeChecker />
    </Section>
  );
}
