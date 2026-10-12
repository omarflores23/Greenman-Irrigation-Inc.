import { createContactHandler, getEmailConfig } from "@/lib/contact";
import { contactRateLimiter } from "@/lib/rate-limit";
import { services } from "@/data/services";
import { business, isPublicSite } from "@/data/business";

export const runtime = "nodejs";

export const POST = createContactHandler({
  getConfig: getEmailConfig,
  limiter: contactRateLimiter,
  allowedOrigin: process.env.CONTACT_SITE_ORIGIN?.trim() || business.domain,
  allowedServices: [
    ...services
      .filter((service) => !isPublicSite || service.approval === "approved")
      .map((service) => service.slug),
    "general-inquiry",
    "landscaping",
    "maintenance-plan",
  ].filter(
    (slug) =>
      !isPublicSite ||
      slug === "general-inquiry" ||
      services.some(
        (service) => service.slug === slug && service.approval === "approved",
      ),
  ),
});
