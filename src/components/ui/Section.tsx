import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

const tones = {
  cream: "bg-cream",
  light: "bg-cream-50",
  tile: "bg-athangudi",
  navy: "bg-navy text-cream",
} as const;

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
  tone?: keyof typeof tones;
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
