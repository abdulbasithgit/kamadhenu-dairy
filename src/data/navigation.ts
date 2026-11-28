import type { Dictionary } from "@/i18n/dictionary";

/** Menu items. Labels come from the translation files (nav.<key>). */
export interface NavItem {
  key: keyof Dictionary["nav"];
  /** Path without locale; the locale prefix is added automatically */
  href: string;
}

export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "farm", href: "/our-farm" },
  { key: "subscribe", href: "/subscribe" },
  { key: "recipes", href: "/recipes" },
  { key: "contact", href: "/contact" },
];

/** Extra links shown only in the footer */
export const footerExtraNav: NavItem[] = [{ key: "faq", href: "/faq" }];

/**
 * Pages that don't exist yet. Each gets a translated "Coming soon" page.
 * Remove an entry when its real page is built (e.g. "products" in Phase 3).
 */
export const comingSoonPages: { slug: string; key: keyof Dictionary["nav"] }[] = [
  { slug: "products", key: "products" },
  { slug: "our-farm", key: "farm" },
  { slug: "subscribe", key: "subscribe" },
  { slug: "recipes", key: "recipes" },
  { slug: "contact", key: "contact" },
  { slug: "faq", key: "faq" },
];
