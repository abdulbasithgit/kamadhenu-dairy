import { site } from "@/data/site";

/** Builds a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string = site.whatsappGreeting): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Turns form fields into a neat multi-line WhatsApp message.
 * Empty values are skipped.
 */
export function formatWhatsappMessage(
  title: string,
  fields: Record<string, string | number | undefined | null>,
): string {
  const lines = Object.entries(fields)
    .filter(
      ([, value]) => value !== undefined && value !== null && `${value}`.trim() !== "",
    )
    .map(([label, value]) => `• ${label}: ${value}`);
  return [title, "", ...lines].join("\n");
}
