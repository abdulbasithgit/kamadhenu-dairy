import { cn } from "@/lib/cn";

/** Small pair of leaves – a green nature accent beside eyebrows. Decorative. */
export function LeafAccent({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 text-leaf", className)}
    >
      <path
        d="M11,13 C11,7 7,3 1,2 C1,8 5,12 11,13 Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M11,13 C11,7 15,3 21,2 C21,8 17,12 11,13 Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  );
}
