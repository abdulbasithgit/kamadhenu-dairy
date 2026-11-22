import { ShieldCheckIcon } from "@/components/icons";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/home";

export function Certifications() {
  return (
    <Section tone="light" labelledBy="cert-title" className="py-14 sm:py-16 lg:py-16">
      <SectionHeading id="cert-title" eyebrow="Trust" title="Licences & certifications" />
      <PlaceholderNotice className="mt-6">
        Placeholders – add only the certificates you actually hold
      </PlaceholderNotice>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {certifications.map((cert) => (
          <li
            key={cert.name + cert.detail}
            className="flex flex-col items-center rounded-lg border border-dashed border-gold-300 bg-cream p-5 text-center"
          >
            <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold-700">
              <ShieldCheckIcon size={28} />
            </span>
            <span className="font-display text-lg font-semibold text-navy">
              {cert.name}
            </span>
            <span className="mt-1 text-sm text-gold-700">{cert.detail}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
