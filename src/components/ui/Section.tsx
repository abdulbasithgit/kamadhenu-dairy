import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Section background "tones". Option A (light-green) is the default;
 * the `rich:` classes apply only when site.colorTheme = "rich-green" (Option B).
 */
const tones = {
  /** plain page background */
  cream: "bg-cream rich:bg-sage-50",
  /** soft green section */
  sage: "bg-sage-50 rich:bg-sage-100",
  /** Athangudi-tile pattern */
  tile: "bg-athangudi rich:bg-athangudi-sage",
  /** strong dark section (stats) */
  strong: "bg-navy text-cream rich:bg-forest-800",
} as const;

export type SectionTone = keyof typeof tones;

/** Standard page section: consistent vertical rhythm and background tones. */
export function Section({
  id,
  tone = "cream",
  className,
  containerClassName,
  labelledBy,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  /** id of the section heading, for screen readers */
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
