import type { DayCode, OpeningHours } from "@/data/site";
import type { Locale } from "./config";

/** Replaces {name} placeholders: format("Hi {name}", { name: "Ravi" }) */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/** "05:30" → "5:30 am" (en) / "காலை 5:30" (ta) */
export function formatTime(locale: Locale, hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const time = `${hour12}:${String(m).padStart(2, "0")}`;
  if (locale === "ta") {
    const part = h < 12 ? "காலை" : h < 16 ? "மதியம்" : h < 19 ? "மாலை" : "இரவு";
    return `${part} ${time}`;
  }
  return `${time} ${h < 12 ? "am" : "pm"}`;
}

/** Time window, or "" when either end is missing (so it gets hidden) */
export function formatTimeRange(locale: Locale, from: string, to: string): string {
  if (!from || !to) return "";
  return `${formatTime(locale, from)} – ${formatTime(locale, to)}`;
}

const dayOrder: DayCode[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

/** e.g. "Mon – Sat: 9:00 am – 6:00 pm" using translated short day names */
export function formatOpeningHours(
  locale: Locale,
  hours: OpeningHours,
  dayNames: Record<DayCode, string>,
): string {
  const days = [...hours.days].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  const first = days[0];
  const last = days[days.length - 1];
  const consecutive =
    days.length > 2 &&
    dayOrder.indexOf(last) - dayOrder.indexOf(first) === days.length - 1;
  const dayText = consecutive
    ? `${dayNames[first]} – ${dayNames[last]}`
    : days.map((d) => dayNames[d]).join(", ");
  return `${dayText}: ${formatTimeRange(locale, hours.opens, hours.closes)}`;
}
