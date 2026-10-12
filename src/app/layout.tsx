import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/shared";
import {
  business,
  isPublicSite,
  canShowPhone,
  phoneHref,
  phoneLabel,
} from "@/data/business";
import { services } from "@/data/services";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: "GreenMan Irrigation | Family-Owned Irrigation in Lynn, MA",
    template: "%s | GreenMan Irrigation",
  },
  description:
    "Family-owned irrigation care rooted in Lynn, Massachusetts. Explore irrigation, landscape care, and seasonal service with GreenMan.",
  robots: isPublicSite
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: "GreenMan Irrigation",
    description: "Beautiful lawns start with better irrigation.",
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: business.domain,
    description:
      "Family-owned irrigation business based in Lynn, Massachusetts.",
    ...(business.phone.approved ? { telephone: business.phone.display } : {}),
    ...(business.address.approved
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.street,
            addressLocality: business.address.city,
            addressRegion: business.address.state,
            postalCode: business.address.zip,
            addressCountry: "US",
          },
        }
      : {}),
  };
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header
          review={!isPublicSite}
          phoneHref={phoneHref}
          phoneLabel={phoneLabel}
          phoneVisible={canShowPhone}
          socialVisible={!isPublicSite || business.socialDestinationsVerified}
          services={services
            .filter((s) => !isPublicSite || s.approval === "approved")
            .map(({ title, slug }) => ({ title, slug }))}
        />
        <main id="main">{children}</main>
        <Footer />
        <div className="mobile-contact">
          <a href={phoneHref}>
            <Phone size={17} />
            {canShowPhone ? "Call GreenMan" : "Contact"}
          </a>
          <Link href="/contact">
            Request an Estimate <ArrowUpRight size={17} />
          </Link>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
