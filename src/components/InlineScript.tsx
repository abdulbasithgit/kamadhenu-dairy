"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";

/**
 * Inline script that runs on the initial page load, before the first paint.
 *
 * Rendering a <script> directly inside a component makes React warn
 * ("Encountered a script tag while rendering React component") because such
 * scripts never run on the client. Inserting it through useServerInsertedHTML
 * puts it in the server HTML only, so the warning goes away and the script
 * still runs before hydration. (Approach from the Next.js "Preventing flash
 * before hydration" guide.)
 */
export function InlineScript({ code }: { code: string }) {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script dangerouslySetInnerHTML={{ __html: code }} />;
  });
  return null;
}
