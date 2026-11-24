import { DM_Sans, Fraunces, Noto_Sans_Tamil } from "next/font/google";

/**
 * Brand typography
 * - Fraunces: headings (variable; SOFT axis gives the rounded, friendly "organic" feel)
 * - DM Sans:  body, navigation, buttons, forms, product info, labels
 * - Noto Sans Tamil: all Tamil text (Fraunces / DM Sans have no Tamil letters)
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  axes: ["opsz"],
  display: "swap",
});

// Not preloaded: the browser only downloads it when Tamil text is on the page.
const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
  preload: false,
});

/** Put on <html> so the CSS font variables are available everywhere. */
export const fontVariables = `${fraunces.variable} ${dmSans.variable} ${notoTamil.variable}`;
