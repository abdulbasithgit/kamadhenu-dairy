import { cn } from "@/lib/cn";

/**
 * Kolam-inspired section divider: a looping four-petal motif drawn
 * around a grid of dots (pulli), flanked by thin gold rules.
 * Purely decorative.
 */
export function KolamDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 py-2 text-gold", className)}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg width="88" height="32" viewBox="0 0 88 32" fill="none">
        {/* Pulli (dots) */}
        <g fill="currentColor">
          <circle cx="44" cy="4" r="1.6" />
          <circle cx="44" cy="28" r="1.6" />
          <circle cx="32" cy="16" r="1.6" />
          <circle cx="56" cy="16" r="1.6" />
          <circle cx="36" cy="8" r="1.1" />
          <circle cx="52" cy="8" r="1.1" />
          <circle cx="36" cy="24" r="1.1" />
          <circle cx="52" cy="24" r="1.1" />
          <circle cx="6" cy="16" r="1.4" />
          <circle cx="82" cy="16" r="1.4" />
        </g>
        {/* Looping line around the dots */}
        <path
          d="M44 16c-6-8-6-12 0-14 6 2 6 6 0 14zm0 0c6 8 6 12 0 14-6-2-6-6 0-14zm0 0c-8 6-12 6-14 0 2-6 6-6 14 0zm0 0c8-6 12-6 14 0-2 6-6 6-14 0z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M14 16c4-5 8-5 12 0-4 5-8 5-12 0zM62 16c4-5 8-5 12 0-4 5-8 5-12 0z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  );
}
