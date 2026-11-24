import { cn } from "@/lib/cn";
import { LeafAccent } from "./LeafAccent";

/** Eyebrow (with leaf accent) + serif heading + optional intro. */
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
            "mb-2 flex items-center gap-2 text-caption font-semibold tracking-[0.18em] uppercase ta:text-sm",
            align === "center" && "justify-center",
            onDark ? "text-gold-300" : "text-gold-700",
          )}
        >
          <LeafAccent className={onDark ? "text-sage-300" : undefined} />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-section ta:text-[1.6rem] ta:sm:text-3xl",
          onDark && "text-cream",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-body", onDark ? "text-cream/85" : "text-ink-muted")}>
          {intro}
        </p>
      )}
    </div>
  );
}
