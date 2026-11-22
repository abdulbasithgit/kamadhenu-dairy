import { cn } from "@/lib/cn";

/** Eyebrow + serif heading + optional intro, used at the top of each section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  as: Tag = "h2",
  onDark = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  onDark?: boolean;
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
        <p
          className={cn(
            "mb-2 text-xs font-bold tracking-[0.2em] uppercase",
            onDark ? "text-gold-300" : "text-gold-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-3xl leading-tight font-semibold sm:text-4xl",
          onDark && "text-cream",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            onDark ? "text-cream/85" : "text-ink-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
