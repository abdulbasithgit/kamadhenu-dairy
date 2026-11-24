/**
 * Customer reviews. Wording lives in src/i18n/messages/{en,ta}.json → reviews.items.
 *
 * TODO: Every entry is a PLACEHOLDER. Replace the text with real reviews
 * (with the customer's permission), then set placeholder: false.
 */
import type { Dictionary } from "@/i18n/dictionary";

export interface Testimonial {
  id: keyof Dictionary["reviews"]["items"];
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  { id: "r1", placeholder: true },
  { id: "r2", placeholder: true },
  { id: "r3", placeholder: true },
  { id: "r4", placeholder: true },
];
