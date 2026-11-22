import { MapPinIcon } from "@/components/icons";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { PincodeChecker } from "./PincodeChecker";

export function DeliveryAreas() {
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
          eyebrow="Delivery areas"
          title="Where we deliver"
          intro={`Fresh milk reaches these areas every morning. Delivery time: ${site.hours.delivery}`}
        />
        {!site.deliveryAreasConfirmed && (
          <PlaceholderNotice className="mx-0 mt-6">
            Example areas only – delivery areas are not confirmed yet
          </PlaceholderNotice>
        )}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {site.deliveryAreas.map((area) => (
            <li
              key={area.name}
              className="flex items-start gap-3 rounded-lg border border-gold/40 bg-cream-50 p-4"
            >
              <MapPinIcon size={20} className="mt-0.5 shrink-0 text-gold-700" />
              <span>
                <span className="block font-display text-lg font-semibold text-navy">
                  {area.name}
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
