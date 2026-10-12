import type { MetadataRoute } from "next";
import { business, isPublicSite } from "@/data/business";
import { services } from "@/data/services";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/irrigation",
    "/landscaping",
    "/residential",
    "/commercial",
    "/maintenance-plans",
    "/about",
    "/gallery",
    "/reviews",
    "/faq",
    "/service-areas",
    "/contact",
    "/privacy",
    ...services
      .filter((s) => !isPublicSite || s.approval === "approved")
      .map((s) => `/services/${s.slug}`),
  ];
  return routes.map((path) => ({
    url: business.domain + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
