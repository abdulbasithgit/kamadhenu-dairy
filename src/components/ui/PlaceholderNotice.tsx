import { cn } from "@/lib/cn";

/**
 * Dashed banner + small badge so visitors (and you) can never mistake
 * sample numbers or reviews for real ones. Remove once real data is in.
 */
export function PlaceholderNotice({
  children,
  className,
  onDark = false,
}: {
  children: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      role="note"
      className={cn(
        "mx-auto max-w-xl rounded-lg border-2 border-dashed px-4 py-2 text-center text-sm font-semibold",
        onDark
          ? "border-gold-300 bg-navy-900/60 text-gold-100"
          : "border-gold bg-gold-100 text-gold-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SampleBadge({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-dashed px-2 py-0.5 text-[0.7rem] font-bold tracking-wider uppercase",
        onDark ? "border-gold-300 text-gold-100" : "border-gold-700 text-gold-700",
      )}
    >
      Sample
    </span>
  );
}
