import { Mulish, Noto_Sans_Tamil, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
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
export const fontVariables = `${playfair.variable} ${mulish.variable} ${notoTamil.variable}`;
