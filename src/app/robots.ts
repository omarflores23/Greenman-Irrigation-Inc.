import type { MetadataRoute } from "next";
import { isPublicSite, business } from "@/data/business";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPublicSite ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    sitemap: business.domain + "/sitemap.xml",
  };
}
