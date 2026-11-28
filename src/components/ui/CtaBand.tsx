import { WhatsAppIcon } from "@/components/icons";
import { localizedHref } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { whatsappHref } from "@/lib/contact";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { KolamDivider } from "./KolamDivider";

/**
 * Closing call-to-action band for inner pages:
 * "Try a free sample" (WhatsApp) + "Subscribe".
 */
export async function CtaBand({ title, text }: { title: string; text: string }) {
  const { locale, t } = await getI18n();
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-athangudi-forest py-14 text-center sm:py-16"
    >
      <Container className="max-w-3xl">
        <h2
          id="cta-title"
          className="text-section text-cream ta:text-[1.6rem] ta:sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lead text-cream/85 ta:text-base">
          {text}
        </p>
        <KolamDivider onDark className="my-6" />
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink
            href={whatsappHref(t.whatsapp.freeSample)}
            external
            variant="gold"
            size="lg"
          >
            <WhatsAppIcon size={20} />
            {t.common.tryFreeSample}
          </ButtonLink>
          <ButtonLink
            href={localizedHref(locale, "/subscribe")}
            size="lg"
            className="border border-cream/60 bg-transparent hover:bg-cream hover:text-navy"
          >
            {t.common.subscribeNow}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
