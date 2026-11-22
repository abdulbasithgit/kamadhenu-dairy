import { cn } from "@/lib/cn";

/** Eyebrow + serif heading + optional intro, used at the top of each section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-bold tracking-[0.2em] text-gold-700 uppercase">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl leading-tight font-semibold sm:text-4xl">{title}</Tag>
      {intro && <p className="mt-4 text-base leading-relaxed text-ink-muted">{intro}</p>}
    </div>
  );
}
