/**
 * About page STRUCTURE (ids, icons, images, years).
 * All wording lives in src/i18n/messages/{en,ta}.json under "about",
 * using the same ids – TypeScript checks that every id has a translation.
 * The owner's name comes from src/data/site.ts (ownerName); the founding
 * year from site.foundedYear (shown only when set).
 */
import type { IconName } from "@/components/icons/iconMap";
import type { Dictionary } from "@/i18n/dictionary";

type Image = { src: string; position?: string };
type About = Dictionary["about"];

/** Page hero photo (portrait 4:5). TODO: e.g. { src: "/images/about-farm.jpg" } */
export const aboutHeroImage: Image | undefined = undefined;

/** "Our story" photo of the family (landscape 4:3). TODO */
export const storyImage: Image | undefined = undefined;

/** Owner photo (square). TODO */
export const ownerPhoto: Image | undefined = undefined;

export const missionVision: { id: keyof About["mission"]["items"]; icon: IconName }[] = [
  { id: "mission", icon: "sunrise" },
  { id: "vision", icon: "leaf" },
];

// TODO: if you want to name the breed(s) you keep (e.g. in "nativeCows"), only do so if true.
export const a2Points: { id: keyof About["a2"]["items"]; icon: IconName }[] = [
  { id: "whatIs", icon: "drop" },
  { id: "nativeCows", icon: "cow" },
  { id: "honest", icon: "shield" },
];

export interface TimelineItem {
  /** Text comes from about.timeline.items.<id> in the JSON files */
  id: keyof About["timeline"]["items"];
  /** Real year only – leave null to show the item without a year */
  year: number | null;
}

/**
 * Farm milestones. The whole timeline section is HIDDEN while this list is empty.
 * TODO: add real milestones only, e.g.
 *   { id: "start", year: null },
 *   { id: "firstDelivery", year: null },
 *   { id: "today", year: null },
 * and write their text in about.timeline.items (en.json + ta.json).
 */
export const timeline: TimelineItem[] = [];
