import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Droplets,
  Leaf,
  CalendarDays,
  HeartHandshake,
  ShieldCheck,
  Sprout,
  Settings2,
  ClipboardCheck,
  MessageCircle,
  Search,
  Wrench,
  RefreshCw,
} from "lucide-react";
import {
  Photo,
  SectionHeading,
  CTASection,
  ServiceGrid,
  ReviewInvitation,
} from "@/components/shared";
import SystemExplorer from "@/components/SystemExplorer";
export const metadata: Metadata = {
  title: "GreenMan Irrigation | Beautiful Lawns, Better Irrigation in Lynn, MA",
  alternates: { canonical: "/" },
};
const primaryServices = [
  {
    title: "Irrigation",
    kicker: "Water well. Grow beautifully.",
    description:
      "From a new system to a sprinkler that needs attention, discover irrigation care tailored to your landscape.",
    href: "/irrigation",
    image: "GM_01_residential-lawn-sprinkler",
    icon: Droplets,
  },
  {
    title: "Landscaping",
    kicker: "Bring your outdoors to life.",
    description:
      "Explore planting beds, decorative stone, and outdoor spaces that work in harmony with your irrigation.",
    href: "/landscaping",
    image: "GM_05_landscape-rock-garden",
    icon: Leaf,
  },
  {
    title: "Seasonal Care",
    kicker: "A little attention, all season.",
    description:
      "Learn about spring activation, summer checkups, and preparing your irrigation system for colder weather.",
    href: "/maintenance-plans",
    image: "GM_03_garden-irrigation-watering",
    icon: CalendarDays,
  },
];
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Family-owned · Lynn, Massachusetts
            </span>
            <h1>
              Beautiful lawns
              <br />
              start with
              <br />
              <em>better irrigation.</em>
            </h1>
            <p>
              Thoughtful irrigation, healthy landscapes, and the personal
              attention of a local, family-owned business.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/contact">
                Request an Estimate <ArrowUpRight size={18} />
              </Link>
              <Link className="button button-text" href="/services">
                Explore Our Services <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <HeartHandshake size={19} />
                Personal service
              </span>
              <span>
                <Sprout size={19} />
                Property-minded care
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-orbit" aria-hidden="true" />
            <div className="hero-photo-one">
              <Photo id="GM_01_residential-estate-green-lawn" priority />
            </div>
            <div className="hero-photo-two">
              <Photo id="GM_01_active-sprinklers-residential" priority />
            </div>
            <div className="hero-caption">
              <span className="hero-caption-icon">
                <Leaf size={21} />
              </span>
              <span>
                Good care. Greener days.
                <small>A glimpse of the supplied field footage</small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="values-ribbon">
        <div className="container">
          <span>
            <Droplets size={20} />
            Reliable irrigation
          </span>
          <span>
            <Leaf size={20} />
            Healthy landscapes
          </span>
          <span>
            <HeartHandshake size={20} />
            Family-owned service
          </span>
          <span>
            <MapIcon />
            Locally rooted
          </span>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Your landscape, thoughtfully cared for"
              title="One outdoor space. So many possibilities."
            >
              A practical approach to the water, the ground, and the care that
              brings it all together.
            </SectionHeading>
            <Link href="/services" className="text-link">
              View All Services <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="primary-services">
            {primaryServices.map((s) => (
              <Link key={s.title} href={s.href} className="primary-service">
                <div className="primary-service-media">
                  <Photo id={s.image} />
                  <span className="round-link" aria-hidden="true">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <div className="primary-service-copy">
                  <span className="service-label">
                    <s.icon size={17} />
                    {s.kicker}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <span className="text-link">
                    Learn More <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section sage-section">
        <div className="container split-section">
          <div className="about-photo">
            <Photo id="GM_06_residential-yard-preparation" caption />
            <span className="photo-side-note">
              The care starts
              <br />
              from the ground up.
            </span>
          </div>
          <div>
            <SectionHeading
              eyebrow="Rooted in community"
              title="Family-owned irrigation services built on trust."
            >
              Your property deserves attention, clear communication, and a
              solution that makes sense for the way you use your outdoor space.
            </SectionHeading>
            <p>
              GreenMan Irrigation is a family-owned business based in Lynn,
              Massachusetts. We approach every conversation with a simple goal:
              understand your landscape and help you make a confident next step.
            </p>
            <div className="inline-value">
              <HeartHandshake size={28} />
              <div>
                <h3>A personal approach</h3>
                <p>
                  Talk about your goals with people who care about the details.
                </p>
              </div>
            </div>
            <Link className="button button-primary" href="/about">
              Meet GreenMan <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section inspection-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Start with a closer look"
              title="Know what your irrigation system needs."
            >
              Uneven coverage? A mystery leak? A system check helps turn
              questions into a clear plan.
            </SectionHeading>
            <Link
              href="/contact?service=System+Inspections"
              className="button button-primary"
            >
              Request an Inspection <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="four-grid inspection-grid">
            {[
              [
                Droplets,
                "Heads, valves & pipes",
                "Look for leaks, damaged heads, and parts that aren’t performing as expected.",
              ],
              [
                Sprout,
                "Coverage & zones",
                "Understand where water lands and how it reaches different parts of your landscape.",
              ],
              [
                Settings2,
                "Controllers & schedules",
                "Review settings, seasonal timing, and the practical needs of your plants.",
              ],
              [
                ClipboardCheck,
                "Overall performance",
                "Bring the pieces together to identify sensible repairs or adjustments.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Droplets;
              return (
                <article className="benefit-card" key={String(title)}>
                  <I size={31} strokeWidth={1.5} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section forest-section">
        <div className="container">
          <SectionHeading
            eyebrow="Small details. Lasting relationships."
            title="A better experience, from the first conversation."
            centered
          />
          <div className="four-grid">
            {[
              [
                HeartHandshake,
                "Family-owned service",
                "Personal attention and a conversation grounded in your needs.",
              ],
              [
                Droplets,
                "Practical irrigation care",
                "An approach shaped around your soil, plants, and property.",
              ],
              [
                ShieldCheck,
                "Respect for your property",
                "Thoughtful planning and care for the space you call yours.",
              ],
              [
                RefreshCw,
                "Long-term system care",
                "Seasonal questions and maintenance matter beyond the first visit.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Droplets;
              return (
                <article className="benefit-card" key={String(title)}>
                  <I size={32} strokeWidth={1.5} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="A little knowledge goes a long way"
            title="Good irrigation is about more than sprinklers."
          >
            Explore the parts of a system and how they work together to support
            your landscape.
          </SectionHeading>
          <SystemExplorer />
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Care for every part of your system"
              title="Find the right place to start."
            />
            <Link href="/services" className="text-link">
              All Irrigation Services <ArrowUpRight size={18} />
            </Link>
          </div>
          <ServiceGrid
            slugs={[
              "irrigation-installation",
              "sprinkler-repair",
              "drip-irrigation",
              "spring-startup",
              "winterization",
              "smart-irrigation",
            ]}
            compact
          />
          <Link href="/landscaping" className="landscape-feature">
            <Photo id="GM_05_stone-and-plant-border" />
            <div>
              <span className="eyebrow">Beyond the sprinkler system</span>
              <h3>A landscape that feels like you.</h3>
              <p>
                Discover the planting beds, stone borders, and outdoor spaces in
                our visual collection.
              </p>
              <span className="text-link">
                Explore Landscaping <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <ReviewInvitation />
      <section className="section sage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Simple steps. Clear communication."
            title="From your first question to your next greener season."
            centered
          />
          <ol className="process-grid">
            {[
              [
                MessageCircle,
                "Tell us what you need",
                "Share your goals, your concerns, and a little about your property.",
              ],
              [
                Search,
                "Take a closer look",
                "Discuss a property visit and understand the existing conditions.",
              ],
              [
                ClipboardCheck,
                "Find a sensible solution",
                "Review recommendations, scope, and the next steps together.",
              ],
              [
                Wrench,
                "Get the work underway",
                "Agree on the work and coordinate the details before it begins.",
              ],
              [
                RefreshCw,
                "Keep the care going",
                "Ask about seasonal attention and maintaining system performance.",
              ],
            ].map(([Icon, title, text], i) => {
              const I = Icon as typeof Droplets;
              return (
                <li key={String(title)}>
                  <span className="process-number">0{i + 1}</span>
                  <I size={24} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="A closer look at the outdoors"
              title="Real scenes. Fresh inspiration."
            >
              Explore the original video frames supplied for the GreenMan
              website. Descriptive scenes, without unverified project claims.
            </SectionHeading>
            <Link href="/gallery" className="text-link">
              Explore the Gallery <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="featured-work">
            <Link href="/gallery?category=Landscaping">
              <Photo id="GM_05_stone-and-plant-border" caption />
            </Link>
            <Link href="/gallery?category=Irrigation">
              <Photo id="GM_08_sprinkler-watering-new-site" caption />
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
function MapIcon() {
  return <Sprout size={20} />;
}
