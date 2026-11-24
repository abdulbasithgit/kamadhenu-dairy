"use client";

import type { ReactNode } from "react";

export function DismissPreviewButton({
  storageKey,
  label,
  children,
}: {
  storageKey: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        try {
          localStorage.setItem(storageKey, "1");
        } catch {
          // storage blocked (private mode) – just hide for this page view
        }
        document.documentElement.setAttribute("data-preview-dismissed", "");
      }}
      className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gold-100 hover:bg-white/10 focus-visible:outline-gold-300"
    >
      {children}
    </button>
  );
}
