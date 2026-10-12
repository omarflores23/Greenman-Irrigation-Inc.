import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import { services } from "@/data/services";
import { isPublicSite } from "@/data/business";
import {
  PageHero,
  SectionHeading,
  CTASection,
  CheckList,
} from "@/components/shared";
import FAQAccordion from "@/components/FAQAccordion";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? {
        title: `${s.title} in Lynn, MA`,
        description: s.shortDescription,
        alternates: { canonical: `/services/${slug}` },
        robots:
          isPublicSite && s.approval !== "approved"
            ? { index: false, follow: false }
            : undefined,
        openGraph: {
          title: `${s.title} | GreenMan Irrigation`,
          description: s.shortDescription,
          url: `/services/${slug}`,
        },
      }
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  if (isPublicSite && s.approval !== "approved") notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.shortDescription,
    provider: { "@type": "LocalBusiness", name: "GreenMan Irrigation, Inc." },
  };
  return (
    <>
      <PageHero
        eyebrow={s.title}
        title={
          s.title === "Winterization"
            ? "Prepare your system for the colder months."
            : s.title === "Sprinkler Repair"
              ? "Help your sprinklers get back on track."
              : s.title === "Irrigation Installation"
                ? "A healthier landscape starts with a thoughtful plan."
                : s.title
        }
        description={s.intro}
        images={s.imageIds.slice(0, 2)}
      >
        <div className="button-row">
          <Link
            className="button button-primary"
            href={`/contact?service=${encodeURIComponent(s.title)}`}
          >
            Ask About {s.title} <ArrowUpRight size={17} />
          </Link>
          <Link href="/services" className="text-link">
            All Services
          </Link>
        </div>
      </PageHero>
      {s.specialty && (
        <div className="container">
          <p className="notice specialty-note">
            <ClipboardCheck size={20} />
            Specialty service: availability, suitability, and any required
            credentials must be confirmed before work is offered or agreed.
          </p>
        </div>
      )}
      <section className="section">
        <div className="container split-section">
          <div>
            <SectionHeading
              eyebrow="Recognize the signs"
              title="When to start a conversation."
            />
            <p>
              A few observations can help explain what’s happening at your
              property. Share what you’ve noticed; recommendations depend on the
              actual system and site.
            </p>
            <CheckList items={s.problems} />
          </div>
          <div className="benefits-panel">
            <span className="eyebrow">A practical approach</span>
            <h2>What thoughtful care considers.</h2>
            <CheckList items={s.benefits} />
          </div>
        </div>
      </section>
      <section className="section sage-section">
        <div className="container">
          <SectionHeading
            eyebrow="A clear path forward"
            title={`How ${s.title.toLowerCase()} is approached.`}
          />
          <ol className="three-grid service-steps">
            {s.steps.map((step, i) => (
              <li key={step.title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <SectionHeading
            eyebrow="Before you plan the next step"
            title={`${s.title} questions.`}
          />
          <FAQAccordion items={s.faqs} />
          <Link href="/faq" className="text-link">
            More Irrigation Questions <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      {s.imageIds.length > 0 && (
        <div className="container">
          <p className="editorial-note">
            Photography illustrates irrigation or groundwork scenes. It does not
            establish that this specific service is shown.
          </p>
        </div>
      )}
      {s.approval === "approved" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <CTASection />
    </>
  );
}
