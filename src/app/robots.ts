import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Required so /robots.txt is written as a static file with output: "export"
export const dynamic = "force-static";

/** Generated as /robots.txt at build time. Controlled by site.previewMode. */
export default function robots(): MetadataRoute.Robots {
  if (site.previewMode) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" } };
}
