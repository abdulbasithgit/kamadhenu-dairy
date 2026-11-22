import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { KolamDivider } from "@/components/ui/KolamDivider";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

/**
 * PHASE 1 preview page – shows the theme, fonts and shared components.
 * Replaced by the full home page in Phase 2.
 */
export default function HomePage() {
  return (
    <>
      <section className="bg-athangudi">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-gold-700 uppercase">
              {site.tagline}
            </p>
            <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
              Pure A2 milk from our native cows to your doorstep
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
              Fresh every morning, in glass bottles, the way milk used to be.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/subscribe" size="lg">
                Subscribe Now <ArrowRightIcon size={18} />
              </ButtonLink>
              <ButtonLink href="/contact" variant="gold" size="lg">
                Try a Free Sample
              </ButtonLink>
            </div>
          </div>

          <ArchFrame className="mx-auto aspect-[4/5] w-full max-w-sm bg-cream-50">
            <Image
              src="/images/packaging.jpg"
              alt="Sri Chettinadu Kamadhenu A2 milk in glass bottles and a carton"
              fill
              preload
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover object-[70%_center]"
            />
          </ArchFrame>
        </Container>
      </section>

      <KolamDivider className="my-6" />

      <Container className="pb-20">
        <SectionHeading
          eyebrow="Phase 1 preview"
          title="Theme & building blocks"
          intro="This page only exists to preview colours, fonts, the kolam divider, arch frames and placeholders. The real home page sections arrive in Phase 2."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Navy", "bg-navy", "#1F3354"],
            ["Gold", "bg-gold", "#B8964E"],
            ["Cream", "bg-cream border border-gold-300", "#F7F2E7"],
            ["Leaf", "bg-leaf", "#4E7A3A"],
            ["Ink", "bg-ink", "#1E1E1E"],
          ].map(([name, cls, hex]) => (
            <div key={name} className="rounded-lg bg-cream-50 p-3 shadow-softer">
              <div className={`h-16 rounded-md ${cls}`} />
              <p className="mt-2 text-sm font-semibold text-navy">{name}</p>
              <p className="text-xs text-ink-muted">{hex}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <ArchFrame className="aspect-[3/4]">
            <Placeholder label="Farm photo – replace" />
          </ArchFrame>
          <ArchFrame className="aspect-[3/4]">
            <Placeholder label="Cows grazing – replace" />
          </ArchFrame>
          <div className="aspect-[3/4] overflow-hidden rounded-lg">
            <Placeholder label="Product photo – replace" />
          </div>
        </div>

        <p lang="ta" className="mt-10 text-center font-tamil text-lg text-navy">
          தூய்மை • பாரம்பரியம் • தரம்
        </p>
      </Container>
    </>
  );
}
