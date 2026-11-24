"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_STORAGE_KEY, otherLocale, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";

/**
 * Switches between English and Tamil on the same page, e.g. /en/products/ ↔ /ta/products/.
 * The choice is remembered (localStorage) and used when someone opens the site root.
 */
export function LanguageToggle({
  className,
  size = "sm",
  onNavigate,
}: {
  className?: string;
  size?: "sm" | "lg";
  onNavigate?: () => void;
}) {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  const target = otherLocale(locale);
  const rest = stripLocale(pathname);
  const href = `/${target}${rest === "/" ? "/" : rest}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={t.language.switchLabel}
      onClick={() => {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, target);
        } catch {
          // storage blocked – the URL still carries the language
        }
        onNavigate?.();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg border border-gold/60 font-semibold whitespace-nowrap text-navy transition-colors hover:bg-gold-100",
        size === "sm" ? "h-11 px-3 text-sm" : "h-12 w-full px-4 text-base",
        className,
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
        // hidden on 1280–1535px desktops, where the header is tightest
        className={size === "sm" ? "xl:max-2xl:hidden" : undefined}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
      </svg>
      {t.language.switchTo}
    </Link>
  );
}
