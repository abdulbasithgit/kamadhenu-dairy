import { ShieldCheckIcon } from "@/components/icons";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/home";
import { site } from "@/data/site";
import { format } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { isSet } from "@/lib/contact";

export async function Certifications() {
  const { t } = await getI18n();
  return (
    <Section tone="sage" labelledBy="cert-title" className="py-14 sm:py-16 lg:py-16">
      <SectionHeading id="cert-title" eyebrow={t.certs.eyebrow} title={t.certs.title} />
      <PlaceholderNotice className="mt-6">{t.certs.notice}</PlaceholderNotice>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {certifications.map((id) => (
          <li
            key={id}
            className="flex flex-col items-center rounded-lg border border-dashed border-gold-300 bg-cream-50 p-5 text-center"
          >
            <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gold text-leaf-700">
              <ShieldCheckIcon size={28} />
            </span>
            <span className="font-display text-lg font-semibold text-navy ta:font-tamil ta:text-base">
              {t.certs.items[id]}
            </span>
            {/* Licence number shows only once it is filled in site.ts */}
            {id === "fssai" && isSet(site.legal.fssaiLicence) && (
              <span className="mt-1 text-sm text-gold-700">
                {format(t.certs.licenceNo, { number: site.legal.fssaiLicence })}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
