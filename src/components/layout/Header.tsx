"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { localizedHref, stripLocale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";
import { isSet, telHref, whatsappHref } from "@/lib/contact";
import { LanguageToggle } from "./LanguageToggle";

function isActive(path: string, href: string) {
  const p = path.replace(/\/+$/, "") || "/";
  return href === "/" ? p === "/" : p === href || p.startsWith(`${href}/`);
}

export function Header() {
  const { locale, t } = useI18n();
  const path = stripLocale(usePathname() ?? "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Tamil menu labels are longer, so the full desktop menu needs a wider screen.
  const desktopNav = locale === "ta" ? "hidden 2xl:block" : "hidden xl:block";
  const mobileOnly = locale === "ta" ? "2xl:hidden" : "xl:hidden";

  // Soft shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock page scroll, close on Escape, manage focus
  useEffect(() => {
    if (!menuOpen) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const logoProps = {
    href: localizedHref(locale, "/"),
    label: format(t.brand.homeLink, { name: site.name }),
    line1: t.brand.line1,
    line2: t.brand.line2,
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-gold/40 bg-cream/95 backdrop-blur-sm transition-shadow",
          scrolled && "shadow-soft",
        )}
      >
        {/* Thin gold double rule – Chettinad trim */}
        <div aria-hidden="true" className="h-1 border-b border-gold/60 bg-navy" />

        <Container className="flex h-18 items-center justify-between gap-3 lg:h-20 xl:gap-2 2xl:gap-3">
          <Logo {...logoProps} preload singleLineName size={52} className="min-w-0" />

          {/* Desktop navigation */}
          <nav aria-label={t.nav.mainLabel} className={desktopNav}>
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(path, item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={localizedHref(locale, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-md px-2 py-2 text-nav whitespace-nowrap text-navy transition-colors hover:text-gold-700 2xl:px-3",
                        "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:bg-gold after:transition-transform 2xl:after:inset-x-3",
                        active ? "after:scale-x-100" : "hover:after:scale-x-100",
                      )}
                    >
                      {t.nav[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle />
            <ButtonLink
              href={whatsappHref(t.whatsapp.greeting)}
              external
              variant="primary"
              size="sm"
              className="h-11 max-md:hidden"
            >
              <WhatsAppIcon size={18} />
              {t.common.orderOnWhatsApp}
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gold/60 text-navy hover:bg-gold-100",
                mobileOnly,
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={t.nav.openMenu}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu (off-canvas). Kept OUTSIDE <header>: the header's
          backdrop-blur would otherwise become the containing block for
          these fixed elements. */}
      <div
        className={cn(
          "fixed inset-0 z-50 overflow-hidden",
          mobileOnly,
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        inert={!menuOpen}
      >
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className={cn(
            "absolute inset-0 bg-navy-900/50 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className={cn(
            "absolute top-0 right-0 flex h-full w-[min(22rem,88vw)] flex-col border-l-4 border-gold bg-athangudi shadow-soft transition-transform duration-300 rich:bg-athangudi-sage",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-gold/40 p-4">
            <Logo {...logoProps} size={44} showText={false} />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label={t.nav.closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gold/60 text-navy hover:bg-gold-100"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <nav
            aria-label={t.nav.mobileLabel}
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = isActive(path, item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={localizedHref(locale, item.href)}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg border-l-2 px-4 py-3 text-lg font-medium text-navy transition-colors ta:text-base",
                        active
                          ? "border-gold bg-gold-100 font-semibold"
                          : "border-transparent hover:border-gold-300 hover:bg-cream-50",
                      )}
                    >
                      {t.nav[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-gold/40 p-4">
            <LanguageToggle size="lg" onNavigate={closeMenu} className="bg-cream-50" />
            <ButtonLink
              href={whatsappHref(t.whatsapp.greeting)}
              external
              variant="whatsapp"
              className="w-full"
            >
              <WhatsAppIcon size={18} />
              {t.common.orderOnWhatsApp}
            </ButtonLink>
            {isSet(site.contact.phone) && (
              <a
                href={telHref()}
                className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-navy"
              >
                <PhoneIcon size={16} />
                {site.contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
