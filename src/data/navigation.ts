/**
 * Main navigation. `key` will be used for Tamil translations in Phase 5.
 */
export interface NavItem {
  key: string;
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "farm", label: "Our Farm", href: "/our-farm" },
  { key: "subscribe", label: "Subscribe", href: "/subscribe" },
  { key: "recipes", label: "Recipes", href: "/recipes" },
  { key: "contact", label: "Contact", href: "/contact" },
];

/** Extra links shown only in the footer */
export const footerExtraNav: NavItem[] = [{ key: "faq", label: "FAQ", href: "/faq" }];
