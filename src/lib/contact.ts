/**
 * Contact helpers – the only place that builds tel:, wa.me and mailto: links.
 * All values come from src/data/site.ts.
 */
import { site } from "@/data/site";

/** True when a site.ts value has been filled in (empty / "TODO…" values are hidden) */
export function isSet(value: string | null | undefined): value is string {
  return (
    typeof value === "string" && value.trim() !== "" && !/^todo\b/i.test(value.trim())
  );
}

/** tel: link from a display number like "+91 98765 43210" */
export function telHref(phone: string = site.contact.phone): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * wa.me link with a pre-filled message.
 * If no WhatsApp number is set yet, it opens WhatsApp with the message and lets
 * the visitor choose a chat – so buttons still work in the preview.
 */
export function whatsappHref(message: string): string {
  const number = isSet(site.contact.whatsapp)
    ? site.contact.whatsapp.replace(/\D/g, "")
    : "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(email: string = site.contact.email): string {
  return `mailto:${email}`;
}

/**
 * Turns form fields into a neat multi-line WhatsApp message. Empty values are skipped.
 * (Used by the subscribe / contact forms in later phases.)
 */
export function formatWhatsappMessage(
  title: string,
  fields: Record<string, string | number | undefined | null>,
): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && `${v}`.trim() !== "")
    .map(([label, v]) => `• ${label}: ${v}`);
  return [title, "", ...lines].join("\n");
}
