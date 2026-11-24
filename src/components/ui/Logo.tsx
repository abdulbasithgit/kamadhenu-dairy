import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/basePath";

/**
 * Round logo + optional wordmark. The wordmark is the brand name, kept in
 * English in both languages (lang="en" so Tamil font rules don't apply).
 */
export function Logo({
  href,
  label,
  line1,
  line2,
  size = 52,
  showText = true,
  singleLineName = false,
  className,
  preload = false,
}: {
  /** Localised home link, e.g. "/ta/" */
  href: string;
  /** Accessible name, e.g. "Sri Chettinadu Kamadhenu Dairy Farm – home" */
  label: string;
  line1: string;
  line2: string;
  size?: number;
  showText?: boolean;
  /** keep line 1 on one line from xl up (header only) */
  singleLineName?: boolean;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-3", className)}
      aria-label={label}
    >
      <Image
        src={withBasePath("/images/logo-small.png")}
        alt=""
        width={size}
        height={size}
        preload={preload}
        sizes={`${size}px`}
        className="shrink-0 rounded-full shadow-softer ring-1 ring-gold-300"
      />
      {showText && (
        <span lang="en" className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display text-[0.95rem] font-semibold text-navy sm:text-lg",
              singleLineName && "xl:text-base xl:whitespace-nowrap 2xl:text-lg",
            )}
          >
            {line1}
          </span>
          <span className="text-[0.65rem] font-bold tracking-[0.22em] text-gold-700 uppercase sm:text-xs">
            {line2}
          </span>
        </span>
      )}
    </Link>
  );
}
