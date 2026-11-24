import { GiftIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localizedHref } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { whatsappHref } from "@/lib/contact";

export async function FreeSampleBanner() {
  const { locale, t } = await getI18n();
  return (
    <section
      aria-labelledby="sample-title"
      className="bg-cream py-16 sm:py-20 rich:bg-sage-50"
    >
      <Container>
        <div className="relative overflow-hidden rounded-lg bg-navy p-1.5 shadow-soft rich:bg-forest-800">
          <div className="relative rounded-md border border-gold/70 px-6 py-10 text-center sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-athangudi opacity-[0.07] mix-blend-screen"
            />
            <span className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold-300">
              <GiftIcon size={30} />
            </span>
            <h2
              id="sample-title"
              className="relative mx-auto max-w-2xl text-section text-cream ta:text-[1.6rem] ta:sm:text-3xl"
            >
              {t.sample.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lead text-cream/85 ta:text-base">
              {t.sample.text}
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={whatsappHref(t.whatsapp.freeSample)}
                external
                variant="gold"
                size="lg"
              >
                <WhatsAppIcon size={20} />
                {t.sample.request}
              </ButtonLink>
              <ButtonLink
                href={localizedHref(locale, "/subscribe")}
                size="lg"
                className="border border-cream/60 bg-transparent hover:bg-cream hover:text-navy"
              >
                {t.sample.plans}
              </ButtonLink>
            </div>
            <p className="relative mt-5 text-sm text-cream/70">{t.sample.terms}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
