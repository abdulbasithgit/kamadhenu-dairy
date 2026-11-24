import { WhatsAppIcon } from "@/components/icons";
import { getI18n } from "@/i18n/server";
import { whatsappHref } from "@/lib/contact";

/** Floating WhatsApp button, bottom-right on every page. */
export async function WhatsAppFloat() {
  const { t } = await getI18n();
  return (
    <a
      href={whatsappHref(t.whatsapp.greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.floatLabel}
      className="group fixed right-4 bottom-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-cream bg-whatsapp text-white shadow-soft ring-1 ring-gold transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon size={28} />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-md bg-navy px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-white opacity-0 shadow-softer transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        {t.whatsapp.float}
      </span>
    </a>
  );
}
