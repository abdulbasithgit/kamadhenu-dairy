import Link from "next/link";
import type { ComponentType } from "react";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { KolamDivider } from "@/components/ui/KolamDivider";
import { Logo } from "@/components/ui/Logo";
import { footerExtraNav, mainNav } from "@/data/navigation";
import { site, type SocialPlatform } from "@/data/site";
import { localizedHref } from "@/i18n/config";
import { format, formatOpeningHours, formatTimeRange } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { isSet, mailtoHref, telHref, whatsappHref } from "@/lib/contact";

/** Platform names are brand names – the same in every language. */
const socialIcons: Record<
  SocialPlatform,
  { name: string; Icon: ComponentType<{ size?: number }> }
> = {
  instagram: { name: "Instagram", Icon: InstagramIcon },
  facebook: { name: "Facebook", Icon: FacebookIcon },
  youtube: { name: "YouTube", Icon: YouTubeIcon },
};

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 font-display text-lg font-semibold text-gold-300">{children}</h2>
  );
}

const linkClass =
  "flex gap-3 text-cream/85 transition-colors hover:text-gold-300 focus-visible:outline-gold-300";

export async function Footer() {
  const { locale, t } = await getI18n();
  const { address, contact, legal, hours } = site;

  // Only filled-in values are shown – empty / TODO fields are hidden automatically.
  const socials = (Object.entries(site.social) as [SocialPlatform, string][]).filter(
    ([, url]) => isSet(url),
  );
  const addressLines = isSet(address.line1)
    ? [
        address.line1,
        [address.line2, address.district].filter(isSet).join(", "),
        [address.state, address.postalCode].filter(isSet).join(" – "),
      ].filter(isSet)
    : [];
  const deliveryTime = formatTimeRange(locale, hours.delivery.from, hours.delivery.to);
  const businessHours = hours.business.map((h) => formatOpeningHours(locale, h, t.days));

  return (
    <footer className="mt-auto bg-forest-900 text-cream">
      <div aria-hidden="true" className="h-1.5 border-y border-gold bg-forest-800" />

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-block rounded-lg bg-cream p-3">
            <Logo
              href={localizedHref(locale, "/")}
              label={format(t.brand.homeLink, { name: site.name })}
              line1={t.brand.line1}
              line2={t.brand.line2}
              size={56}
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/85">
            {t.meta.description}
          </p>
          <p className="mt-3 text-sm font-semibold tracking-wide text-gold-300">
            {t.common.tagline}
          </p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3" aria-label={t.footer.social}>
              {socials.map(([platform, href]) => {
                const { name, Icon } = socialIcons[platform];
                return (
                  <li key={platform}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={format(t.footer.socialLabel, { platform: name })}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold-300 transition-colors hover:bg-gold hover:text-forest-900 focus-visible:outline-gold-300"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <nav aria-label={t.footer.quickLinks}>
          <FooterHeading>{t.footer.quickLinks}</FooterHeading>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
            {[...mainNav, ...footerExtraNav].map((item) => (
              <li key={item.key}>
                <Link
                  href={localizedHref(locale, item.href)}
                  className="text-cream/85 transition-colors hover:text-gold-300 focus-visible:outline-gold-300"
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact – every line is hidden until its value is filled in site.ts */}
        <div>
          <FooterHeading>{t.footer.getInTouch}</FooterHeading>
          <address className="space-y-3 text-sm not-italic">
            {addressLines.length > 0 && (
              <p className="flex gap-3">
                <MapPinIcon size={18} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-cream/85">
                  {addressLines.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                      {i === addressLines.length - 1 && isSet(site.maps.url) && (
                        <a
                          href={site.maps.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block font-semibold text-gold-300 underline underline-offset-4"
                        >
                          {t.footer.viewOnMap}
                        </a>
                      )}
                    </span>
                  ))}
                </span>
              </p>
            )}
            {isSet(contact.phone) && (
              <p>
                <a href={telHref()} className={linkClass}>
                  <PhoneIcon size={18} className="shrink-0 text-gold" />
                  {contact.phone}
                </a>
              </p>
            )}
            <p>
              <a
                href={whatsappHref(t.whatsapp.greeting)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <WhatsAppIcon size={18} className="shrink-0 text-gold" />
                {t.footer.chatOnWhatsApp}
              </a>
            </p>
            {isSet(contact.email) && (
              <p>
                <a href={mailtoHref()} className={`${linkClass} break-all`}>
                  <MailIcon size={18} className="shrink-0 text-gold" />
                  {contact.email}
                </a>
              </p>
            )}
            {(deliveryTime || businessHours.length > 0) && (
              <p className="flex gap-3">
                <ClockIcon size={18} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-cream/85">
                  {deliveryTime && (
                    <span className="block">
                      {format(t.footer.delivery, { time: deliveryTime })}
                    </span>
                  )}
                  {businessHours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            )}
          </address>
        </div>

        {/* Delivery areas */}
        <div>
          <FooterHeading>{t.footer.weDeliverTo}</FooterHeading>
          <ul className="flex flex-wrap gap-2 text-sm">
            {site.deliveryAreas.map((area) => (
              <li
                key={area.id}
                className="rounded-full border border-gold/50 px-3 py-1 text-cream/90"
              >
                {area.name[locale]}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-cream/70">{t.footer.notListed}</p>
        </div>
      </Container>

      <div className="border-t border-gold/30">
        <KolamDivider onDark className="pt-4" />
        <Container className="flex flex-col items-center justify-between gap-2 pb-6 text-center text-xs text-cream/70 sm:flex-row sm:text-left">
          <p>
            {format(t.footer.rights, { year: new Date().getFullYear(), name: site.name })}
          </p>
          {(isSet(legal.fssaiLicence) || isSet(legal.gstNumber)) && (
            <p>
              {[
                isSet(legal.fssaiLicence) &&
                  format(t.footer.fssai, { number: legal.fssaiLicence }),
                isSet(legal.gstNumber) &&
                  format(t.footer.gst, { number: legal.gstNumber }),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <p>{t.footer.madeWith}</p>
        </Container>
      </div>
    </footer>
  );
}
