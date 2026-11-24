/**
 * Products (structure only). Names and descriptions live in
 * src/i18n/messages/{en,ta}.json → products.items.<slug>.
 *
 * TODO: confirm every pack size and add real prices (price: null shows "Price on request").
 */
import type { Dictionary } from "@/i18n/dictionary";

export type ProductSlug = keyof Dictionary["products"]["items"];
export type ProductCategory =
  "milk" | "curd" | "ghee" | "butter" | "paneer" | "buttermilk";

export interface ProductSize {
  amount: number;
  unit: keyof Dictionary["units"];
  /** Price in ₹. null = not decided yet (shown as "Price on request"). */
  price: number | null;
}

export interface Product {
  slug: ProductSlug;
  category: ProductCategory;
  sizes: ProductSize[];
  /** Real photo. Leave undefined to show a labelled placeholder. */
  image?: { src: string; position?: string };
  featured: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    slug: "a2-milk",
    category: "milk",
    sizes: [
      { amount: 500, unit: "ml", price: null },
      { amount: 1, unit: "l", price: null },
    ],
    image: { src: "/images/packaging.jpg", position: "70% center" },
    featured: true,
  },
  {
    slug: "thick-curd",
    category: "curd",
    sizes: [
      { amount: 200, unit: "g", price: null },
      { amount: 500, unit: "g", price: null },
    ],
    featured: true,
  },
  {
    slug: "cow-ghee",
    category: "ghee",
    sizes: [
      { amount: 200, unit: "ml", price: null },
      { amount: 500, unit: "ml", price: null },
      { amount: 1, unit: "l", price: null },
    ],
    featured: true,
  },
  {
    slug: "white-butter",
    category: "butter",
    sizes: [
      { amount: 100, unit: "g", price: null },
      { amount: 250, unit: "g", price: null },
    ],
    featured: false,
  },
  {
    slug: "paneer",
    category: "paneer",
    sizes: [{ amount: 200, unit: "g", price: null }],
    featured: false,
    isNew: true,
  },
  {
    slug: "spiced-buttermilk",
    category: "buttermilk",
    sizes: [
      { amount: 200, unit: "ml", price: null },
      { amount: 500, unit: "ml", price: null },
    ],
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
