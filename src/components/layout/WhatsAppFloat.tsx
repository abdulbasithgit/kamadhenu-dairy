import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/whatsapp";

/** Floating WhatsApp button, bottom-right on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-cream bg-whatsapp text-white shadow-soft ring-1 ring-gold transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon size={28} />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-md bg-navy px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-white opacity-0 shadow-softer transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        Chat with us
      </span>
    </a>
  );
}
