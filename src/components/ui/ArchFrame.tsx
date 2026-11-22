import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Chettinad doorway-style arch frame with a double gold border.
 * Put a next/image (with `fill`) or a <Placeholder> inside.
 */
export function ArchFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("arch rounded-b-lg border border-gold p-1.5", className)}>
      <div className="relative h-full w-full overflow-hidden arch rounded-b-md border border-gold-300">
        {children}
      </div>
    </div>
  );
}
