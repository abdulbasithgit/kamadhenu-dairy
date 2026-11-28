import Image from "next/image";
import type { ReactNode } from "react";
import { withBasePath } from "@/lib/basePath";
import { ArchFrame } from "./ArchFrame";
import { Container } from "./Container";
import { LeafAccent } from "./LeafAccent";
import { Placeholder } from "./Placeholder";

/**
 * Top-of-page hero for inner pages – a smaller, static version of the home
 * hero (same tile background and arch photo frame). Fixed aspect ratio on the
 * photo, so nothing shifts while it loads.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  placeholderLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image?: { src: string; position?: string };
  imageAlt: string;
  placeholderLabel: string;
  /** Extra content under the lead (badges, buttons) */
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className="border-b border-gold/30 bg-athangudi rich:bg-athangudi-forest"
    >
      <Container className="grid items-center gap-8 py-10 sm:py-14 md:grid-cols-[1.4fr_1fr] md:gap-12 lg:py-16">
        <div>
          <p className="mb-3 flex items-center gap-2 text-caption font-semibold tracking-[0.18em] text-gold-700 uppercase rich:text-gold-300 ta:text-sm">
            <LeafAccent className="rich:text-sage-300" />
            {eyebrow}
          </p>
          <h1
            id="page-title"
            className="text-page rich:text-cream ta:text-[1.6rem] ta:font-semibold ta:sm:text-4xl"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-prose text-lead text-ink-muted rich:text-cream/85 ta:text-base ta:sm:text-lg">
            {lead}
          </p>
          {children}
        </div>
        <ArchFrame className="mx-auto aspect-[4/5] w-full max-w-[13rem] bg-cream-50 sm:max-w-[15rem] md:max-w-[17rem]">
          {image ? (
            <Image
              src={withBasePath(image.src)}
              alt={imageAlt}
              fill
              preload
              sizes="(min-width: 768px) 272px, 240px"
              className="object-cover"
              style={{ objectPosition: image.position ?? "center" }}
            />
          ) : (
            <Placeholder label={placeholderLabel} className="border-0" />
          )}
        </ArchFrame>
      </Container>
    </section>
  );
}
