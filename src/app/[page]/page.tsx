import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Sprout,
  Leaf,
  HeartHandshake,
  CalendarDays,
  Building2,
  House,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  PageHero,
  Photo,
  SectionHeading,
  ServiceGrid,
  CTASection,
  CheckList,
  ReviewInvitation,
} from "@/components/shared";
import ProjectGallery from "@/components/ProjectGallery";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";
import BeforeAfter from "@/components/BeforeAfter";
import { faqs } from "@/data/faqs";
import { visiblePhotos, greenmanGallery } from "@/data/greenmanGallery";
import { business, isPublicSite, phoneHref, phoneLabel } from "@/data/business";
const pages: Record<string, { title: string; description: string }> = {
  services: {
    title: "Irrigation Services in Lynn, MA",
    description:
      "Explore installation, sprinkler repairs, seasonal care, smart controls, and system inspections. Find the right conversation for your property.",
  },
  irrigation: {
    title: "Irrigation Care for a Healthier Landscape",
    description:
      "Explore the design, repairs, and routine attention that help your lawn and planting beds receive the water they need.",
  },
  landscaping: {
    title: "Landscaping & Outdoor Spaces",
    description:
      "Discover planting beds, decorative stone, and landscape preparation in the supplied GreenMan visual collection. Discuss possibilities for your outdoor space.",
  },
  residential: {
    title: "Residential Irrigation in Lynn, MA",
    description:
      "Thoughtful irrigation planning, sprinkler troubleshooting, and seasonal attention for the place you call home.",
  },
  commercial: {
    title: "Commercial Irrigation Inquiries",
    description:
      "Discuss irrigation needs for managed properties, shared landscapes, and commercial sites with GreenMan.",
  },
  "maintenance-plans": {
    title: "Seasonal Irrigation Maintenance",
    description:
      "A season-by-season approach to spring activation, mid-season attention, and winter preparation in northeastern Massachusetts.",
  },
  about: {
    title: "About Our Family-Owned Business",
    description:
      "Meet the values behind GreenMan Irrigation, a family-owned business rooted in Lynn, Massachusetts.",
  },
  gallery: {
    title: "Field Footage & Landscape Gallery",
    description:
      "Browse 22 authentic supplied video stills, with descriptive captions, category filters, and source timestamps.",
  },
  reviews: {
    title: "Customer Experiences",
    description:
      "Share your experience with GreenMan Irrigation. We welcome real feedback and questions about your landscape.",
  },
  faq: {
    title: "Irrigation Frequently Asked Questions",
    description:
      "Practical answers to questions about sprinkler repair, winterization, irrigation controllers, and seasonal lawn care in Massachusetts.",
  },
  "service-areas": {
    title: "Lynn, MA & Service Availability",
    description:
      "GreenMan Irrigation is based in Lynn, Massachusetts. Share your property location to ask about service availability.",
  },
  contact: {
    title: "Contact GreenMan & Request an Estimate",
    description:
      "Tell GreenMan about your irrigation or landscaping needs. Request an estimate, discuss a system issue, or ask about service availability.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How GreenMan handles website inquiries, contact information, and service request details.",
  },
};
export function generateStaticParams() {
  return [...Object.keys(pages), "our-work"].map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const p = pages[page];
  return p
    ? {
        title: p.title,
        description: p.description,
        alternates: { canonical: `/${page}` },
        openGraph: {
          title: p.title,
          description: p.description,
          url: `/${page}`,
        },
      }
    : {};
}
type SearchParams = Record<string, string | string[] | undefined>;
export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { page } = await params;
  if (page === "our-work") redirect("/gallery");
  if (!pages[page]) notFound();
  const query: SearchParams =
    page === "contact" || page === "gallery" ? await searchParams : {};
  switch (page) {
    case "services":
      return (
        <>
          <PageHero
            eyebrow="All irrigation services"
            title="Good care starts with the right service."
            description={pages.services.description}
            images={["GM_08_sprinkler-operating-closeup"]}
          />
          <section className="section">
            <div className="container">
              <SectionHeading
                eyebrow="From new systems to seasonal attention"
                title="Explore your irrigation options."
              >
                Learn what each service involves, the signs to watch for, and
                the questions to ask. We’ll confirm the right scope for your
                property before work is agreed.
              </SectionHeading>
              <ServiceGrid />
              {!isPublicSite && (
                <p className="editorial-note">
                  The service range is prepared for owner review. Specialty
                  offerings, certifications, and exact availability require
                  confirmation.
                </p>
              )}
              {isPublicSite && (
                <p>
                  Contact us to discuss currently available services for your
                  property.
                </p>
              )}
            </div>
          </section>
          <CTASection />
        </>
      );
    case "irrigation":
      return (
        <>
          <PageHero
            eyebrow="Irrigation"
            title="The right water. In the right places."
            description={pages.irrigation.description}
            images={[
              "GM_08_sprinkler-operating-closeup",
              "GM_03_garden-irrigation-watering",
            ]}
          />
          <section className="section">
            <div className="container split-section">
              <div>
                <SectionHeading
                  eyebrow="A system shaped around your property"
                  title="Your lawn and your garden have different needs."
                >
                  Effective irrigation starts with understanding the landscape.
                  Soil, plant types, slopes, sun, and water supply all influence
                  the plan.
                </SectionHeading>
                <CheckList
                  items={[
                    "Consider water coverage across separate zones.",
                    "Match sprinkler heads and schedules to the landscape.",
                    "Address leaks, pressure changes, and worn components.",
                    "Review seasonal timing and controller settings.",
                  ]}
                />
              </div>
              <div className="audience-cards">
                <Link href="/residential">
                  <House />
                  <h3>For your home</h3>
                  <p>
                    A more personal approach to your lawn, garden, and outdoor
                    routines.
                  </p>
                  <span className="text-link">
                    Residential Irrigation <ArrowUpRight size={18} />
                  </span>
                </Link>
                <Link href="/commercial">
                  <Building2 />
                  <h3>For your property</h3>
                  <p>
                    Discuss site needs, access, and coordination for managed
                    landscapes.
                  </p>
                  <span className="text-link">
                    Commercial Inquiries <ArrowUpRight size={18} />
                  </span>
                </Link>
              </div>
            </div>
          </section>
          <section className="section soft-section">
            <div className="container">
              <SectionHeading
                eyebrow="Keep your system working together"
                title="Installation, attention, and ongoing care."
              />
              <ServiceGrid />
            </div>
          </section>
          <section className="section">
            <div className="container narrow">
              <SectionHeading
                eyebrow="Good questions make a better plan"
                title="Irrigation, explained."
              />
              <FAQAccordion items={faqs.slice(0, 5)} />
            </div>
          </section>
          <CTASection />
        </>
      );
    case "landscaping":
      return (
        <>
          <PageHero
            eyebrow="Landscaping"
            title="Make room for a more beautiful outdoors."
            description="Planting beds, textured stone, and a thoughtfully prepared landscape. Explore the possibilities and tell us what you have in mind."
            images={[
              "GM_05_stone-and-plant-border",
              "GM_05_landscape-rock-garden",
            ]}
          />
          <section className="section">
            <div className="container">
              <SectionHeading
                eyebrow="Water and landscape, working together"
                title="A considered approach to every outdoor detail."
              >
                Irrigation and landscaping decisions belong in the same
                conversation. Plant placement, soil preparation, and watering
                needs can be considered together as you plan a project.
              </SectionHeading>
              <div className="three-grid">
                {[
                  [
                    Sprout,
                    "Landscape preparation",
                    "Discuss ground conditions, site preparation, and the practical steps that come before planting.",
                  ],
                  [
                    Leaf,
                    "Planting beds & decorative stone",
                    "Explore the balance of greenery, texture, and borders in the supplied garden footage.",
                  ],
                  [
                    House,
                    "Lawn & landscape enhancements",
                    "Tell us how you want to use your outdoor space, and ask which enhancements GreenMan can support.",
                  ],
                ].map(([Icon, title, text]) => {
                  const I = Icon as typeof Leaf;
                  return (
                    <article className="benefit-card" key={String(title)}>
                      <I size={30} />
                      <h3>{String(title)}</h3>
                      <p>{String(text)}</p>
                    </article>
                  );
                })}
              </div>
              {!isPublicSite && (
                <p className="editorial-note">
                  These project topics await confirmation of the landscaping
                  services GreenMan offers. Photographs illustrate visible
                  scenes rather than verified contractual scope.
                </p>
              )}
            </div>
          </section>
          <section className="section sage-section">
            <div className="container">
              <SectionHeading
                eyebrow="Texture, greenery, and possibility"
                title="Take a look around."
              >
                Garden beds, green outdoor spaces, and preparation scenes from
                the original supplied footage.
              </SectionHeading>
              <div className="landscape-gallery">
                {[
                  "GM_03_landscape-garden-beds",
                  "GM_05_finished-property-landscape",
                  "GM_06_residential-yard-preparation",
                  "GM_07_new-home-ground-prep",
                ].map((id) => (
                  <Photo key={id} id={id} caption />
                ))}
              </div>
              <Link
                href="/gallery?category=Landscaping"
                className="button button-primary"
              >
                View Landscaping Gallery <ArrowUpRight size={17} />
              </Link>
            </div>
          </section>
          <section className="section">
            <div className="container split-section">
              <div>
                <SectionHeading
                  eyebrow="A broader view of outdoor spaces"
                  title="Special spaces. Thoughtful conversations."
                >
                  The supplied footage includes a rooftop green surface. It’s
                  part of the visual collection, rather than evidence of a
                  verified green-roof service or certification.
                </SectionHeading>
                <p>
                  Have a project with unusual site conditions? Tell us what
                  you’re considering. Availability and suitability need a
                  separate conversation before a scope is agreed.
                </p>
                <Link
                  href="/contact?service=Landscaping+inquiry"
                  className="text-link"
                >
                  Discuss Your Landscape <ArrowUpRight size={18} />
                </Link>
              </div>
              <Photo id="GM_05_rooftop-green-surface" caption />
            </div>
          </section>
          <CTASection />
        </>
      );
    case "residential":
      return (
        <>
          <PageHero
            eyebrow="Residential irrigation"
            title="A healthier landscape. A happier place to call home."
            description={pages.residential.description}
            images={[
              "GM_01_residential-estate-green-lawn",
              "GM_01_active-sprinklers-residential",
            ]}
          />
          <section className="section">
            <div className="container split-section">
              <div>
                <SectionHeading
                  eyebrow="Your property is personal"
                  title="Let’s start with how you use your outdoors."
                >
                  A new garden, an existing sprinkler system, or a lawn that’s
                  getting too much water in one spot and too little in another.
                  Your needs shape the conversation.
                </SectionHeading>
                <p>
                  We’ll discuss the landscape, your existing system, and the
                  changes you’d like to make. A clear scope and practical
                  recommendations help you plan with confidence.
                </p>
              </div>
              <CheckList
                items={[
                  "New-home irrigation planning and installation inquiries",
                  "Sprinkler repairs, leaks, and uneven watering",
                  "Controller upgrades and scheduling questions",
                  "Spring activation and winter preparation",
                  "Garden and planting-bed watering",
                  "Seasonal system performance checks",
                ]}
              />
            </div>
          </section>
          <section className="section soft-section">
            <div className="container">
              <SectionHeading
                eyebrow="Care that fits your home"
                title="Explore residential irrigation care."
              />
              <ServiceGrid limit={6} compact />
            </div>
          </section>
          <InquirySection
            title="Tell us about your home."
            property="residential"
          />
          <CTASection />
        </>
      );
    case "commercial":
      return (
        <>
          <PageHero
            eyebrow="Commercial irrigation"
            title="Thoughtful irrigation for the properties you manage."
            description="Discuss system needs, property access, and seasonal coordination. We’ll confirm whether GreenMan is the right fit for your site."
          />
          <section className="section">
            <div className="container">
              <SectionHeading
                eyebrow="Start with the whole property"
                title="A clear conversation about your site."
              >
                Shared landscapes have different access, scheduling, and
                maintenance needs. Tell us about your system, your stakeholders,
                and the conditions on the ground.
              </SectionHeading>
              <div className="three-grid">
                {[
                  "Property owners & managers",
                  "Condominiums & shared communities",
                  "Apartments, offices & retail sites",
                  "General contractors",
                  "Landscape management teams",
                  "Other managed outdoor spaces",
                ].map((t) => (
                  <article key={t} className="audience-card">
                    <Building2 size={25} />
                    <h3>{t}</h3>
                    <p>
                      Discuss site requirements and confirm service availability
                      before planning work.
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="section sage-section">
            <div className="container split-section">
              <div>
                <SectionHeading
                  eyebrow="Practical planning for shared spaces"
                  title="Coordinate the details before the work begins."
                />
                <p>
                  Installation inquiries, troubleshooting, controller settings,
                  and seasonal preparation can be discussed alongside access
                  requirements and the needs of the people using the property.
                </p>
                <p>
                  Specialty services and any required credentials must be
                  verified before work is agreed.
                </p>
              </div>
              <CheckList
                items={[
                  "Share site plans or system records if available.",
                  "Identify access windows and site contacts.",
                  "Describe recurring issues and current maintenance.",
                  "Agree on the scope, timing, and communication.",
                ]}
              />
            </div>
          </section>
          <InquirySection
            title="Let’s discuss your property."
            property="commercial"
          />
          <CTASection />
        </>
      );
    case "maintenance-plans":
      return (
        <>
          <PageHero
            eyebrow="Seasonal maintenance"
            title="A little attention, through every season."
            description={pages["maintenance-plans"].description}
            images={["GM_03_garden-irrigation-watering"]}
          />
          <section className="section">
            <div className="container">
              <SectionHeading
                eyebrow="A Northeast landscape has changing needs"
                title="Spring, summer, and a careful winter pause."
              />
              <div className="three-grid">
                {[
                  [
                    "Spring",
                    "Bring the system back into focus.",
                    "Once freezing conditions have passed, discuss activation, visible leaks, and watering schedules.",
                  ],
                  [
                    "Summer",
                    "Adjust as the landscape changes.",
                    "Heat, rainfall, and growing plants can change the watering needs of different zones.",
                  ],
                  [
                    "Fall",
                    "Plan ahead for freezing weather.",
                    "Ask about winter preparation before sustained freezing temperatures arrive.",
                  ],
                ].map(([season, title, text]) => (
                  <article className="season-card" key={season}>
                    <span className="eyebrow">{season}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          {(!isPublicSite || business.plansApproved) && (
            <section className="section sage-section">
              <div className="container">
                <SectionHeading
                  eyebrow="A conversation about ongoing care"
                  title="Explore a season-long approach."
                >
                  These care-plan concepts are provided for discussion.
                  Availability, inclusions, and pricing need owner confirmation;
                  they are not published offers.
                </SectionHeading>
                <div className="plan-grid">
                  {[
                    {
                      title: "Seasonal Essentials",
                      desc: "A starting point for the two seasonal transitions.",
                      items: [
                        "Spring system start-up",
                        "Fall winterization",
                        "Basic system condition review",
                      ],
                    },
                    {
                      title: "Complete Season Care",
                      desc: "A broader conversation about ongoing performance.",
                      items: [
                        "Spring system start-up",
                        "Fall winterization",
                        "Mid-season system check",
                        "Controller scheduling adjustments",
                        "Maintenance recommendations",
                      ],
                    },
                  ].map((p) => (
                    <article className="plan-card" key={p.title}>
                      <span className="approval-tag">
                        Concept · owner approval pending
                      </span>
                      <CalendarDays size={32} />
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <CheckList items={p.items} />
                      <Link
                        href={`/contact?service=Seasonal+care+inquiry&plan=${encodeURIComponent(p.title)}`}
                        className="button button-primary"
                      >
                        Ask About This Plan <ArrowUpRight size={17} />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
          <section className="section">
            <div className="container narrow">
              <SectionHeading
                eyebrow="Preparing for the seasons"
                title="Seasonal care questions."
              />
              <FAQAccordion
                items={faqs.filter((f) =>
                  /winter|spring|turn on|inspect/i.test(f.question),
                )}
              />
            </div>
          </section>
          <CTASection />
        </>
      );
    case "about":
      return (
        <>
          <PageHero
            eyebrow="About GreenMan"
            title="Local roots. Personal attention. Greener possibilities."
            description="GreenMan Irrigation is a family-owned irrigation business based in Lynn, Massachusetts. We believe a good service experience begins with a good conversation."
            images={[
              "GM_04_equipment-trailer-evening",
              "GM_06_crew-construction-materials",
            ]}
          />
          <section className="section">
            <div className="container split-section">
              <div>
                <SectionHeading
                  eyebrow="A family-owned approach"
                  title="Your landscape deserves care that feels personal."
                />
                <p>
                  We’re here to understand what you need from your outdoor
                  space, explain the practical options, and help you make an
                  informed decision.
                </p>
                <p>
                  From the first question to seasonal follow-up, our approach
                  centers on clear communication, attention to the property, and
                  responsible irrigation practices.
                </p>
              </div>
              <div className="quote-card">
                <HeartHandshake size={40} />
                <h3>Good work begins with trust.</h3>
                <p>
                  That means listening first, discussing the scope clearly, and
                  treating your property with care.
                </p>
                <span className="eyebrow">The GreenMan approach</span>
              </div>
            </div>
          </section>
          <section className="section sage-section">
            <div className="container">
              <SectionHeading
                eyebrow="What guides the conversation"
                title="Simple values, put into practice."
              />
              <div className="four-grid">
                {[
                  [
                    MessageCircle,
                    "Clear communication",
                    "Ask questions, understand the recommendations, and agree on the next step.",
                  ],
                  [
                    Leaf,
                    "Responsible watering",
                    "Consider plant needs, weather, and system condition together.",
                  ],
                  [
                    House,
                    "Care for your property",
                    "Plan the details with respect for the space and the people who use it.",
                  ],
                  [
                    HeartHandshake,
                    "Long-term relationships",
                    "Seasonal needs and follow-up questions are part of looking after a landscape.",
                  ],
                ].map(([Icon, title, text]) => {
                  const I = Icon as typeof Leaf;
                  return (
                    <article className="benefit-card" key={String(title)}>
                      <I size={29} />
                      <h3>{String(title)}</h3>
                      <p>{String(text)}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
          {business.team.filter((t) => t.approved).length > 0 && (
            <section className="section">
              <div className="container">
                <SectionHeading
                  eyebrow="The people behind the care"
                  title="Meet the team."
                />
                {business.team
                  .filter((t) => t.approved)
                  .map((t) => (
                    <article key={t.name}>
                      <h3>{t.name}</h3>
                      <p>{t.role}</p>
                      <p>{t.bio}</p>
                    </article>
                  ))}
              </div>
            </section>
          )}
          <ReviewInvitation />
          <CTASection />
        </>
      );
    case "gallery":
      return (
        <>
          <PageHero
            eyebrow="Our visual collection"
            title="A closer look at greener spaces."
            description="Sprinklers in motion. Texture in a planting bed. The ground before a landscape takes shape. Explore the original supplied video frames."
          />
          <section className="section gallery-section">
            <div className="container">
              <p className="gallery-note">
                Captions describe visible scenes. Images are supplied video
                stills, not verified project case studies.
                {!isPublicSite &&
                  " Publication permission and final project captions await owner review."}
              </p>
              <ProjectGallery
                key={
                  typeof query.category === "string" ? query.category : "all"
                }
                photos={visiblePhotos}
                initialCategory={
                  typeof query.category === "string"
                    ? query.category
                    : undefined
                }
              />
              {business.beforeAfterPairs
                .filter((p) => p.approved)
                .map((pair) => {
                  const before = greenmanGallery.find(
                    (p) =>
                      p.id === pair.before &&
                      p.publicationStatus === "approved",
                  );
                  const after = greenmanGallery.find(
                    (p) =>
                      p.id === pair.after && p.publicationStatus === "approved",
                  );
                  return before && after ? (
                    <BeforeAfter
                      key={pair.caption}
                      before={before}
                      after={after}
                      caption={pair.caption}
                    />
                  ) : null;
                })}
            </div>
          </section>
          <CTASection />
        </>
      );
    case "reviews":
      return (
        <>
          <PageHero
            eyebrow="Customer experiences"
            title="Your experience is part of our story."
            description="Good service is a conversation. If you’ve worked with GreenMan, we’d love to hear what mattered to you."
          />
          <ReviewInvitation />
          <section className="section sage-section">
            <div className="container narrow">
              <SectionHeading
                eyebrow="Honest feedback. Helpful conversations."
                title="Tell us how it went."
              />
              <p>
                We publish customer feedback only with permission. Share your
                experience through the contact form and let us know whether
                you’d like to discuss it privately or give permission for a
                future testimonial.
              </p>
              <p>
                Have a service question instead? You’re welcome to ask. There
                are no published ratings or review quotations on this page until
                genuine, approved feedback is available.
              </p>
              <Link
                className="button button-primary"
                href="/contact?service=General+inquiry"
              >
                Share Feedback <ArrowUpRight size={17} />
              </Link>
            </div>
          </section>
          <CTASection />
        </>
      );
    case "faq":
      return (
        <>
          <PageHero
            eyebrow="Frequently asked questions"
            title="Good questions. Clearer next steps."
            description="Explore practical irrigation guidance for northeastern Massachusetts. Your property may need a closer look for specific recommendations."
          />
          <section className="section">
            <div className="container narrow">
              <FAQAccordion items={faqs} searchable />
            </div>
          </section>
          <CTASection />
        </>
      );
    case "service-areas":
      return (
        <>
          <PageHero
            eyebrow="Service availability"
            title="Rooted in Lynn. Ready for your questions."
            description="GreenMan Irrigation is based in Lynn, Massachusetts. Tell us where your property is located, and we’ll confirm service availability."
          />
          <section className="section">
            <div className="container split-section">
              <div>
                <SectionHeading
                  eyebrow="Lynn, Massachusetts"
                  title="Local care begins with your location."
                />
                <p>
                  Share your address or ZIP code, the type of property, and what
                  you need help with. We’ll discuss whether service is available
                  at your site before arrangements are made.
                </p>
                <p>
                  Massachusetts landscapes change with the seasons. Winter
                  freezing, summer heat, and rainfall all play a part in a
                  practical irrigation plan.
                </p>
                {business.serviceAreasApproved && (
                  <CheckList items={business.serviceAreas} />
                )}
                <Link href="/contact" className="button button-primary">
                  Ask About Your Property <ArrowUpRight size={17} />
                </Link>
              </div>
              <div className="location-card">
                <MapPin size={50} strokeWidth={1.3} />
                <span className="eyebrow">Our local roots</span>
                <h2>Lynn, MA</h2>
                <p>
                  One family-owned business.
                  <br />
                  One personal conversation at a time.
                </p>
              </div>
            </div>
          </section>
          <CTASection />
        </>
      );
    case "contact":
      return (
        <>
          <PageHero
            eyebrow="Contact GreenMan"
            title="Tell us about your outdoors."
            description="A new project, a sprinkler question, or a landscape idea. Share a few details and your preferred way to connect."
          >
            <div className="contact-hero-links">
              <a href={phoneHref}>
                <Phone size={19} />
                {phoneLabel}
              </a>
              <span>Or send a service inquiry below.</span>
            </div>
          </PageHero>
          <section className="section">
            <div className="container contact-layout">
              <div className="contact-form-card">
                <SectionHeading
                  eyebrow="Let’s start a conversation"
                  title="Request an estimate."
                />
                <ContactForm
                  publicMode={isPublicSite}
                  defaultService={
                    typeof query.service === "string"
                      ? query.service
                      : undefined
                  }
                />
              </div>
              <aside className="contact-aside">
                <Photo id="GM_05_finished-property-landscape" />
                <h2>What happens next?</h2>
                <ol>
                  <li>Share what you need and how to reach you.</li>
                  <li>
                    GreenMan reviews your inquiry when delivery is configured.
                  </li>
                  <li>
                    Discuss availability, a property visit, and next steps.
                  </li>
                </ol>
                <div className="contact-detail">
                  <MapPin size={20} />
                  <div>
                    <strong>Based in Lynn, Massachusetts</strong>
                    <p>Ask about availability at your property.</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <Phone size={20} />
                  <div>
                    <a href={phoneHref}>{phoneLabel}</a>
                    {!isPublicSite && (
                      <p>Listed number · owner confirmation pending.</p>
                    )}
                  </div>
                </div>
                <p className="small-note">
                  This form requests contact. It does not book a visit or
                  guarantee appointment availability.
                </p>
              </aside>
            </div>
          </section>
        </>
      );
    case "privacy":
      return (
        <>
          <PageHero
            eyebrow="Privacy policy"
            title="Your information, handled with care."
            description="This policy describes how this website handles information you choose to send in a service inquiry."
          />
          <section className="section">
            <div className="container narrow legal-copy">
              <h2>Information you provide</h2>
              <p>
                The service request form collects your name, email address,
                phone number, property location, requested service, project
                description, and contact preference. A preferred date is
                optional. Do not include sensitive financial information or
                confidential documents.
              </p>
              <h2>How inquiries are used</h2>
              <p>
                Your information is used to review and respond to your request,
                discuss availability, and arrange potential service. When email
                delivery is configured, the inquiry is sent to the
                owner-configured inbox through the Resend email service. The
                site does not report success if that service has not accepted
                the message.
              </p>
              <h2>Storage and security</h2>
              <p>
                The application does not keep a separate inquiry database or
                accept photo uploads. Delivered messages may remain in the
                business inbox and email-provider records according to their
                configured retention policies. Operational rate limits use a
                temporary identifier to protect the form from abuse. Hosting
                providers may retain access and error logs.
              </p>
              <h2>Cookies and analytics</h2>
              <p>
                This implementation has no advertising trackers, analytics
                integrations, or marketing cookies. If those features are added,
                this policy must be reviewed before publication.
              </p>
              <h2>Your choices</h2>
              <p>
                You can choose not to use the form and contact GreenMan by an
                approved alternative channel. To request access, correction, or
                deletion of inquiry information, contact GreenMan and describe
                your request. Retention details and privacy contact channels
                must be confirmed by the owner before public launch.
              </p>
              <h2>External links</h2>
              <p>
                Social links open third-party websites that have their own
                privacy policies. GreenMan does not control their information
                practices.
              </p>
              <h2>Questions</h2>
              <p>
                <Link className="text-link" href="/contact">
                  Contact GreenMan about privacy <ArrowUpRight size={16} />
                </Link>
              </p>
            </div>
          </section>
        </>
      );
  }
}
function InquirySection({
  title,
  property,
}: {
  title: string;
  property: "residential" | "commercial";
}) {
  return (
    <section className="section">
      <div className="container narrow">
        <SectionHeading eyebrow="Let’s talk about your needs" title={title} />
        <div className="contact-form-card">
          <ContactForm publicMode={isPublicSite} defaultProperty={property} />
        </div>
      </div>
    </section>
  );
}
