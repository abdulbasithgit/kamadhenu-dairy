/**
 * Products. Edit names, descriptions and sizes here.
 *
 * TODO: confirm every pack size and add real prices (price: null shows "Price on request").
 * Phase 3 adds nutrition tables and longer descriptions for the detail pages.
 */

export type ProductCategory =
  "milk" | "curd" | "ghee" | "butter" | "paneer" | "buttermilk";

export interface ProductSize {
  label: string;
  /** Price in ₹. null = not decided yet (shown as "Price on request"). */
  price: number | null;
}

export interface Product {
  slug: string;
  name: string;
  tamilName: string;
  category: ProductCategory;
  shortDescription: string;
  sizes: ProductSize[];
  /** Real photo. Leave undefined to show a labelled placeholder. */
  image?: { src: string; alt: string; position?: string };
  /** Text on the placeholder box until a real photo is supplied. */
  placeholderLabel: string;
  featured: boolean;
  isNew?: boolean;
}

export const categoryLabels: Record<ProductCategory, string> = {
  milk: "Milk",
  curd: "Curd",
  ghee: "Ghee",
  butter: "Butter",
  paneer: "Paneer",
  buttermilk: "Buttermilk",
};

export const products: Product[] = [
  {
    slug: "a2-milk",
    name: "Premium A2 Milk",
    tamilName: "A2 பால்",
    category: "milk",
    shortDescription:
      "Whole milk from our native cows, chilled soon after milking and delivered in glass bottles.",
    sizes: [
      { label: "500 ml", price: null },
      { label: "1 litre", price: null },
    ],
    image: {
      src: "/images/packaging.jpg",
      alt: "Premium A2 Milk in a glass bottle and a carton",
      position: "70% center",
    },
    placeholderLabel: "A2 milk bottle photo – replace",
    featured: true,
  },
  {
    slug: "thick-curd",
    name: "Thick Curd",
    tamilName: "தயிர்",
    category: "curd",
    shortDescription:
      "Set the old way from our own milk – mild, creamy and good with every meal.",
    sizes: [
      { label: "200 g", price: null },
      { label: "500 g", price: null },
    ],
    placeholderLabel: "Curd pot photo – replace",
    featured: true,
  },
  {
    slug: "cow-ghee",
    name: "Pure Cow Ghee",
    tamilName: "நெய்",
    category: "ghee",
    shortDescription:
      "Golden ghee made from the cream of our cows' milk, with a rich, nutty aroma.",
    sizes: [
      { label: "200 ml", price: null },
      { label: "500 ml", price: null },
      { label: "1 litre", price: null },
    ],
    placeholderLabel: "Ghee jar photo – replace",
    featured: true,
  },
  {
    slug: "white-butter",
    name: "Fresh White Butter",
    tamilName: "வெண்ணெய்",
    category: "butter",
    shortDescription: "Soft, unsalted white butter, churned in small batches.",
    sizes: [
      { label: "100 g", price: null },
      { label: "250 g", price: null },
    ],
    placeholderLabel: "White butter photo – replace",
    featured: false,
  },
  {
    slug: "paneer",
    name: "Soft Paneer",
    tamilName: "பனீர்",
    category: "paneer",
    shortDescription: "Fresh, soft paneer for curries, tikkas and snacks.",
    sizes: [{ label: "200 g", price: null }],
    placeholderLabel: "Paneer photo – replace",
    featured: false,
    isNew: true,
  },
  {
    slug: "spiced-buttermilk",
    name: "Spiced Buttermilk",
    tamilName: "மோர்",
    category: "buttermilk",
    shortDescription:
      "Neer mor with curry leaves, ginger and a little green chilli – a cooling summer drink.",
    sizes: [
      { label: "200 ml", price: null },
      { label: "500 ml", price: null },
    ],
    placeholderLabel: "Buttermilk glass photo – replace",
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
