/**
 * SITE CONSTANTS – the ONLY place for business details.
 * Change a value here and it updates everywhere on the site.
 *
 * Rules:
 *  - Leave a field EMPTY ("" / null / []) until you have the real value.
 *    Empty fields are hidden on the site automatically (never shown as "TODO").
 *  - Nothing here has been invented as fact. Lines marked TODO need your input.
 *  - Visible wording (headings, buttons, sentences) lives in
 *    src/i18n/messages/en.json and ta.json, not here.
 */

export type SocialPlatform = "instagram" | "facebook" | "youtube";
export type ColorTheme = "light-green" | "rich-green";
export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface OpeningHours {
  days: DayCode[];
  /** 24-hour "HH:MM", e.g. "09:00" */
  opens: string;
  /** 24-hour "HH:MM", e.g. "18:00" */
  closes: string;
}

export interface DeliveryArea {
  id: string;
  /** Place names are shown in the visitor's language */
  name: { en: string; ta: string };
  pincodes: string[];
}

export interface SiteConfig {
  /** Review build: noindex meta, robots.txt Disallow, "Preview version" banner. Set false at launch. */
  previewMode: boolean;
  /**
   * Colour option for the client to compare:
   *  "light-green" (A) – cream + soft sage sections, forest green footer
   *  "rich-green"  (B) – forest green hero / stats / footer, sage elsewhere
   */
  colorTheme: ColorTheme;

  /** Brand name – kept in English in both languages */
  name: string;
  shortName: string;
  /**
   * Live site address including any sub-path, no trailing slash.
   * Every canonical link, Open Graph URL, hreflang link and the sitemap use it.
   */
  url: string;
  /**
   * Main town you serve, used in copy such as "homes in and around {area}".
   * Keep it in line with deliveryAreas below.
   */
  serviceArea: { en: string; ta: string };

  ownerName: string;
  foundedYear: number | null;

  contact: {
    /** As you want it displayed, e.g. "+91 98765 43210" */
    phone: string;
    /** International format, digits only, no + or spaces, e.g. "919876543210" */
    whatsapp: string;
    email: string;
  };

  address: {
    line1: string;
    line2: string;
    district: string;
    state: string;
    postalCode: string;
    country: string;
  };

  maps: {
    /** Google Maps share link (Share → Copy link) */
    url: string;
    /** Google Maps embed URL (Share → Embed a map → the src="…" value) */
    embedUrl: string;
  };

  hours: {
    /** Office / phone hours. Empty array = hidden. */
    business: OpeningHours[];
    /** Morning delivery window, 24-hour "HH:MM". Empty = hidden. */
    delivery: { from: string; to: string };
  };

  payments: {
    /** e.g. "kamadhenu@okaxis" */
    upiId: string;
  };

  legal: {
    fssaiLicence: string;
    gstNumber: string;
  };

  social: Record<SocialPlatform, string>;

  /**
   * Google Sheet / Apps Script URL that will receive orders (later phase).
   * Comes from the NEXT_PUBLIC_ORDER_SHEET_URL environment variable, not from this file.
   */
  orderSheetEndpoint: string;

  /** Set true once deliveryAreas are confirmed (hides the "example areas" notice) */
  deliveryAreasConfirmed: boolean;
  deliveryAreas: DeliveryArea[];
}

export const site: SiteConfig = {
  previewMode: true,
  colorTheme: "light-green",

  name: "Sri Chettinadu Kamadhenu Dairy Farm",
  shortName: "Kamadhenu Dairy",
  // Preview address for now. TODO at launch: your real domain, e.g. "https://www.example.in"
  url: "https://abdulbasithgit.github.io/kamadhenu-dairy",
  serviceArea: { en: "Karaikudi", ta: "காரைக்குடி" },

  // TODO
  ownerName: "",
  // TODO: only if confirmed (the logo mock-up says 1928 – please verify)
  foundedYear: null,

  contact: {
    phone: "", // TODO
    whatsapp: "", // TODO – digits only, e.g. "919876543210"
    email: "", // TODO
  },

  address: {
    line1: "", // TODO
    line2: "", // TODO: village / town
    district: "", // TODO
    state: "Tamil Nadu",
    postalCode: "", // TODO
    country: "IN",
  },

  maps: {
    url: "", // TODO
    embedUrl: "", // TODO
  },

  hours: {
    // TODO, e.g. [{ days: ["mon", "tue", "wed", "thu", "fri", "sat"], opens: "09:00", closes: "18:00" }]
    business: [],
    // TODO, e.g. { from: "05:30", to: "07:30" }
    delivery: { from: "", to: "" },
  },

  payments: {
    upiId: "", // TODO
  },

  legal: {
    fssaiLicence: "", // TODO
    gstNumber: "", // TODO (only if registered)
  },

  // TODO: full profile links, e.g. "https://www.instagram.com/yourpage"
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  orderSheetEndpoint: process.env.NEXT_PUBLIC_ORDER_SHEET_URL ?? "",

  // TODO: confirm areas and pincodes, then set to true
  deliveryAreasConfirmed: false,
  // Examples from the Chettinad region only – not confirmed
  deliveryAreas: [
    {
      id: "karaikudi",
      name: { en: "Karaikudi", ta: "காரைக்குடி" },
      pincodes: ["630001", "630002", "630003"],
    },
    {
      id: "devakottai",
      name: { en: "Devakottai", ta: "தேவகோட்டை" },
      pincodes: ["630302"],
    },
    {
      id: "kanadukathan",
      name: { en: "Kanadukathan", ta: "கானாடுகாத்தான்" },
      pincodes: ["630103"],
    },
    {
      id: "pallathur",
      name: { en: "Pallathur", ta: "பள்ளத்தூர்" },
      pincodes: ["630107"],
    },
  ],
};
