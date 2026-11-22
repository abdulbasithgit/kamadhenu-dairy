/**
 * Business details – edit this file to change contact info everywhere on the site.
 *
 * Anything marked TODO is a placeholder. Please replace it with real, verified
 * details before going live. Nothing here has been invented as fact.
 */

export type SocialPlatform = "instagram" | "facebook" | "youtube";

export interface DeliveryArea {
  name: string;
  pincodes: string[];
}

export const site = {
  name: "Sri Chettinadu Kamadhenu Dairy Farm",
  shortName: "Kamadhenu Dairy",
  tagline: "Purity • Tradition • Quality",
  description:
    "Fresh A2 milk from native cows, delivered in glass bottles to your doorstep in the Chettinad region of Tamil Nadu.",

  // TODO: replace with your real domain once bought (used for SEO, sitemap, Open Graph)
  url: "https://www.example.com",

  // TODO: founding year – leave null until confirmed (the logo mock-up says 1928; please verify)
  foundedYear: null as number | null,

  contact: {
    // TODO: real phone number
    phoneDisplay: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    // TODO: WhatsApp number in international format, digits only (no +, no spaces)
    whatsapp: "910000000000",
    // TODO: real email
    email: "hello@example.com",
  },

  address: {
    // TODO: full postal address
    line1: "TODO: Farm address line 1",
    line2: "TODO: Village / Town",
    district: "TODO: District",
    state: "Tamil Nadu",
    postalCode: "TODO",
    country: "IN",
    // TODO: paste the Google Maps share link for the farm
    mapsUrl: "https://maps.google.com/",
  },

  // TODO: confirm delivery and office hours
  hours: {
    delivery: "TODO: e.g. 5:30 am – 7:30 am, every day",
    office: "TODO: e.g. Mon – Sat, 9 am – 6 pm",
  },

  // TODO: replace with your real profile links. Remove a line to hide that icon.
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
  } satisfies Partial<Record<SocialPlatform, string>>,

  // TODO: confirm every area and pincode you actually deliver to.
  // These are examples from the Chettinad region only.
  deliveryAreas: [
    { name: "Karaikudi", pincodes: ["630001", "630002", "630003"] },
    { name: "Devakottai", pincodes: ["630302"] },
    { name: "Kanadukathan", pincodes: ["630103"] },
    { name: "Pallathur", pincodes: ["630107"] },
  ] satisfies DeliveryArea[],

  /** Default message used by every "Order on WhatsApp" button */
  whatsappGreeting:
    "Hello Sri Chettinadu Kamadhenu Dairy Farm, I would like to know more about your A2 milk.",
} as const;
