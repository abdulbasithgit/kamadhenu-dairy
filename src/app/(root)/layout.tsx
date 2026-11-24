import type { Metadata } from "next";
import { site } from "@/data/site";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: site.name,
  robots: site.previewMode ? { index: false, follow: false } : undefined,
};

/** Minimal root layout for "/" – it only forwards visitors to /en/ or /ta/. */
export default function RootRedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full items-center justify-center bg-athangudi font-sans">
        {children}
      </body>
    </html>
  );
}
