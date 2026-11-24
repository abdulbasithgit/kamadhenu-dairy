import { ImageIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Clearly-labelled stand-in for a photo that still needs to be supplied.
 * Every usage is listed in the README "Images to supply" section.
 */
export function Placeholder({
  label,
  className,
}: {
  /** Translated text, e.g. "Farm photo – replace" */
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-gold-300 bg-cream-200/70 p-4 text-center text-gold-700",
        className,
      )}
    >
      <ImageIcon size={32} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
