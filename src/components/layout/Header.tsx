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
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/whatsapp";

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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

        <Container className="flex h-18 items-center justify-between gap-4 lg:h-20">
          <Logo preload singleLineName size={52} className="min-w-0" />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-md px-3 py-2 text-[0.95rem] font-semibold text-navy transition-colors hover:text-gold-700",
                        "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:bg-gold after:transition-transform",
                        active ? "after:scale-x-100" : "hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Language toggle goes here in Phase 5 */}
            <ButtonLink
              href={whatsappLink()}
              external
              variant="primary"
              size="sm"
              className="max-sm:hidden"
            >
              <WhatsAppIcon size={18} />
              Order on WhatsApp
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gold/60 text-navy hover:bg-gold-100 xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
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
          "fixed inset-0 z-50 overflow-hidden xl:hidden",
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
          aria-label="Menu"
          className={cn(
            "absolute top-0 right-0 flex h-full w-[min(22rem,88vw)] flex-col border-l-4 border-gold bg-athangudi shadow-soft transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-gold/40 p-4">
            <Logo size={44} showText={false} />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gold/60 text-navy hover:bg-gold-100"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-lg border-l-2 px-4 py-3 font-display text-lg text-navy transition-colors",
                        active
                          ? "border-gold bg-gold-100 font-semibold"
                          : "border-transparent hover:border-gold-300 hover:bg-cream-50",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-gold/40 p-4">
            <ButtonLink
              href={whatsappLink()}
              external
              variant="whatsapp"
              className="w-full"
            >
              <WhatsAppIcon size={18} />
              Order on WhatsApp
            </ButtonLink>
            <a
              href={site.contact.phoneHref}
              className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-navy"
            >
              <PhoneIcon size={16} />
              {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
