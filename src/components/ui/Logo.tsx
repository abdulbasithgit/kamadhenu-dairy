import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/basePath";

/** Round logo + optional wordmark. */
export function Logo({
  size = 52,
  showText = true,
  singleLineName = false,
  className,
  preload = false,
}: {
  size?: number;
  showText?: boolean;
  /** keep "Sri Chettinadu Kamadhenu" on one line from xl up (header only) */
  singleLineName?: boolean;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.name} – home`}
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
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display text-[0.95rem] font-semibold text-navy sm:text-lg",
              singleLineName && "xl:whitespace-nowrap",
            )}
          >
            Sri Chettinadu Kamadhenu
          </span>
          <span className="text-[0.65rem] font-bold tracking-[0.22em] text-gold-700 uppercase sm:text-xs">
            Dairy Farm
          </span>
        </span>
      )}
    </Link>
  );
}
