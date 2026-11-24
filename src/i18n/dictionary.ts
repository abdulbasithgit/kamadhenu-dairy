import en from "./messages/en.json";
import taJson from "./messages/ta.json";
import type { Locale } from "./config";

/** Shape of every translation file – en.json is the reference. */
export type Dictionary = typeof en;

// Type check: ta.json must have every key that en.json has (build fails otherwise).
const ta: Dictionary = taJson;

const dictionaries: Record<Locale, Dictionary> = { en, ta };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
