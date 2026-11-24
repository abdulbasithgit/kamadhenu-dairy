"use client";

import { useLayoutEffect, type ReactNode } from "react";

const ATTR = "data-preview-dismissed";

function isDismissed(storageKey: string) {
  try {
    return localStorage.getItem(storageKey) !== null;
  } catch {
    return false;
  }
}

export function DismissPreviewButton({
  storageKey,
  label,
  children,
}: {
  storageKey: string;
  label: string;
  children: ReactNode;
}) {
  // The inline script hides the banner on a full page load. This covers client-side
  // navigations (e.g. switching language), where React re-renders <html> and the
  // script doesn't run again. Layout effects run before paint, so there's no flash.
  useLayoutEffect(() => {
    if (isDismissed(storageKey)) document.documentElement.setAttribute(ATTR, "");
  });

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
        document.documentElement.setAttribute(ATTR, "");
      }}
      className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gold-100 hover:bg-white/10 focus-visible:outline-gold-300"
    >
      {children}
    </button>
  );
}
