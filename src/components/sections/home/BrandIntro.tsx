import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { brandIntro } from "@/data/home";

export function BrandIntro() {
  return (
    <Section
      labelledBy="intro-title"
      containerClassName="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16"
    >
      <FadeIn className="order-2 md:order-1">
        <ArchFrame className="mx-auto aspect-[4/5] w-full max-w-xs md:max-w-sm">
          <Placeholder label={brandIntro.imageLabel} className="border-0" />
        </ArchFrame>
      </FadeIn>

      <FadeIn className="order-1 md:order-2" delay={0.1}>
        <p className="mb-2 text-xs font-bold tracking-[0.2em] text-gold-700 uppercase">
          {brandIntro.eyebrow}
        </p>
        <h2 id="intro-title" className="text-3xl leading-tight font-semibold sm:text-4xl">
          {brandIntro.title}
        </h2>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
          {brandIntro.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link
          href="/about"
          className="group mt-7 inline-flex items-center gap-2 border-b-2 border-gold pb-1 font-semibold text-navy hover:text-gold-700"
        >
          Read our story
          <ArrowRightIcon
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </FadeIn>
    </Section>
  );
}
