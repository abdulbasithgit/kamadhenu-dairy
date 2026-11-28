import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

// Required so /robots.txt is written as a static file with output: "export"
export const dynamic = "force-static";

/** Generated as /robots.txt at build time. Controlled by site.previewMode. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.previewMode
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
