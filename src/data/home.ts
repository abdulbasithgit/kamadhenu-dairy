/**
 * Home page STRUCTURE (ids, icons, images, numbers).
 * All wording for these items lives in src/i18n/messages/{en,ta}.json
 * under the same ids – TypeScript checks that every id has a translation.
 */
import type { IconName } from "@/components/icons/iconMap";
import type { Dictionary } from "@/i18n/dictionary";

type Image = { src: string; position?: string };

export const heroSlides: { id: keyof Dictionary["hero"]["slides"]; image?: Image }[] = [
  { id: "milk", image: { src: "/images/packaging.jpg", position: "70% center" } },
  { id: "cows" }, // TODO: photo of cows grazing (portrait 4:5)
  { id: "delivery" }, // TODO: photo of morning delivery (portrait 4:5)
];

/** "Our story" photo (portrait 4:5). TODO: e.g. { src: "/images/founders.jpg" } */
export const brandIntroImage: Image | undefined = undefined;

export const promises: { id: keyof Dictionary["promise"]["items"]; icon: IconName }[] = [
  { id: "nativeBreed", icon: "cow" }, // TODO: name the breed(s) in the text – only if true
  { id: "noPreservatives", icon: "leaf" },
  { id: "fresh", icon: "clock" },
  { id: "glass", icon: "bottle" },
];

export const ethos: { id: keyof Dictionary["ethos"]["items"]; icon: IconName }[] = [
  { id: "purity", icon: "drop" },
  { id: "tradition", icon: "diya" },
  { id: "quality", icon: "medal" },
];

export const subscriptionSteps: {
  id: keyof Dictionary["how"]["steps"];
  icon: IconName;
}[] = [
  { id: "choose", icon: "bottle" },
  { id: "plan", icon: "calendar" },
  { id: "delivery", icon: "sunrise" },
  { id: "pay", icon: "wallet" }, // TODO: confirm payment terms in the text
];

export interface Stat {
  id: keyof Dictionary["stats"]["items"];
  value: number;
  suffix?: string;
  /** true = sample number, shown with a visible "Sample" label. Set false once real. */
  placeholder: boolean;
}

// TODO: replace ALL of these with real numbers, then set placeholder: false.
export const stats: Stat[] = [
  { id: "cows", value: 50, placeholder: true },
  { id: "families", value: 500, suffix: "+", placeholder: true },
  { id: "litres", value: 300, placeholder: true },
  { id: "villages", value: 10, placeholder: true },
];

export interface GalleryItem {
  id: keyof Dictionary["gallery"]["items"];
  /** Real photo path, or leave undefined for a labelled placeholder */
  src?: string;
  shape: "tall" | "wide" | "square";
}

export const gallery: GalleryItem[] = [
  { id: "grazing", shape: "tall" },
  { id: "calf", shape: "square" },
  { id: "shed", shape: "wide" },
  { id: "fodder", shape: "square" },
  { id: "milking", shape: "tall" },
  { id: "bottling", shape: "wide" },
  { id: "team", shape: "square" },
  { id: "ghee", shape: "tall" },
];

// TODO: list only certificates you actually hold. FSSAI number comes from site.ts.
export const certifications: (keyof Dictionary["certs"]["items"])[] = [
  "fssai",
  "labReport",
  "vetCheck",
  "more",
];
