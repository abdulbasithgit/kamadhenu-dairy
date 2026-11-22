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
import { whatsappLink } from "@/lib/whatsapp";

const socialIcons: Record<
  SocialPlatform,
  { label: string; Icon: ComponentType<{ size?: number }> }
> = {
  instagram: { label: "Instagram", Icon: InstagramIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  youtube: { label: "YouTube", Icon: YouTubeIcon },
};

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 font-display text-lg font-semibold text-gold-300">{children}</h2>
  );
}

export function Footer() {
  const { address, contact } = site;
  const socials = Object.entries(site.social) as [SocialPlatform, string][];

  return (
    <footer className="mt-auto bg-navy text-cream">
      <div aria-hidden="true" className="h-1.5 border-y border-gold bg-navy-900" />

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-block rounded-lg bg-cream p-3">
            <Logo size={56} />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/85">
            {site.description}
          </p>
          <p className="mt-3 text-sm font-semibold tracking-wide text-gold-300">
            {site.tagline}
          </p>
          <ul className="mt-5 flex gap-3" aria-label="Social media">
            {socials.map(([platform, href]) => {
              const { label, Icon } = socialIcons[platform];
              return (
                <li key={platform}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold-300 transition-colors hover:bg-gold hover:text-navy-900 focus-visible:outline-gold"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <FooterHeading>Quick links</FooterHeading>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
            {[...mainNav, ...footerExtraNav].map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-cream/85 transition-colors hover:text-gold-300 focus-visible:outline-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <FooterHeading>Get in touch</FooterHeading>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex gap-3">
              <MapPinIcon size={18} className="mt-0.5 shrink-0 text-gold" />
              <span className="text-cream/85">
                {address.line1}
                <br />
                {address.line2}, {address.district}
                <br />
                {address.state} – {address.postalCode}
              </span>
            </p>
            <p>
              <a
                href={contact.phoneHref}
                className="flex gap-3 text-cream/85 hover:text-gold-300 focus-visible:outline-gold"
              >
                <PhoneIcon size={18} className="shrink-0 text-gold" />
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-cream/85 hover:text-gold-300 focus-visible:outline-gold"
              >
                <WhatsAppIcon size={18} className="shrink-0 text-gold" />
                Chat on WhatsApp
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.email}`}
                className="flex gap-3 break-all text-cream/85 hover:text-gold-300 focus-visible:outline-gold"
              >
                <MailIcon size={18} className="shrink-0 text-gold" />
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <ClockIcon size={18} className="mt-0.5 shrink-0 text-gold" />
              <span className="text-cream/85">Delivery: {site.hours.delivery}</span>
            </p>
          </address>
        </div>

        {/* Delivery areas */}
        <div>
          <FooterHeading>We deliver to</FooterHeading>
          <ul className="flex flex-wrap gap-2 text-sm">
            {site.deliveryAreas.map((area) => (
              <li
                key={area.name}
                className="rounded-full border border-gold/50 px-3 py-1 text-cream/90"
              >
                {area.name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-cream/70">
            Not on the list? Message us – we are growing our routes.
          </p>
        </div>
      </Container>

      <div className="border-t border-gold/30">
        <KolamDivider className="pt-4 text-gold/70" />
        <Container className="flex flex-col items-center justify-between gap-2 pb-6 text-xs text-cream/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Made with care in Chettinad, Tamil Nadu.</p>
        </Container>
      </div>
    </footer>
  );
}
