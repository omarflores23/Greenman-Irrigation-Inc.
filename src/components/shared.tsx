import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Droplets,
  Leaf,
  Phone,
  Check,
  MapPin,
  Facebook,
} from "lucide-react";
import { getPhoto } from "@/data/greenmanGallery";
import {
  business,
  isPublicSite,
  canShowPhone,
  phoneHref,
  phoneLabel,
  navigation,
} from "@/data/business";
import { services } from "@/data/services";
import { Brand } from "./Header";

export function Photo({
  id,
  className = "",
  priority = false,
  caption = false,
}: {
  id: string;
  className?: string;
  priority?: boolean;
  caption?: boolean;
}) {
  const photo = getPhoto(id);
  if (!photo)
    return (
      <div className={`photo-neutral ${className}`}>
        <Leaf size={42} aria-hidden="true" />
        <span>Thoughtful care for your outdoor spaces.</span>
      </div>
    );
  return (
    <figure className={`photo ${className}`} data-photo-id={photo.id}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={512}
        height={910}
        sizes="(max-width: 600px) 85vw, (max-width: 1024px) 40vw, 400px"
        priority={priority}
        style={{ objectPosition: photo.objectPosition }}
      />
      {caption && <figcaption>{photo.alt}</figcaption>}
    </figure>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  images = [],
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  images?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`page-hero ${images.length ? "with-photos" : "image-neutral-hero"}`}
    >
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{eyebrow}</span>
        </nav>
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {eyebrow}
            </span>
            <h1>{title}</h1>
            <p>{description}</p>
            {children || (
              <div className="button-row">
                <Link className="button button-primary" href="/contact">
                  Let’s Talk About Your Property <ArrowUpRight size={17} />
                </Link>
              </div>
            )}
          </div>
          {images.length > 0 && (
            <div
              className={`page-hero-photos ${images.length === 1 ? "single" : ""}`}
            >
              {images.map((id, i) => (
                <Photo key={id} id={id} priority={i === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export function CTASection() {
  return (
    <section className="cta-section">
      <div className="container cta-grid">
        <div>
          <span className="eyebrow">Let’s make your outdoors thrive</span>
          <h2>
            Ready for a greener,
            <br />
            <em>healthier lawn?</em>
          </h2>
          <p>
            Tell us what you have in mind. We’ll take the next step together.
          </p>
          <div className="button-row">
            <Link className="button button-light" href="/contact">
              Request an Estimate <ArrowUpRight size={17} />
            </Link>
            <a className="button button-outline-light" href={phoneHref}>
              <Phone size={16} />
              {canShowPhone ? "Call GreenMan" : "Contact GreenMan"}
            </a>
          </div>
        </div>
        <div className="cta-photos">
          <Photo id="GM_05_finished-property-landscape" />
          <Photo id="GM_01_residential-estate-green-lawn" />
        </div>
      </div>
    </section>
  );
}
export function ServiceGrid({
  limit,
  compact = false,
  slugs,
}: {
  limit?: number;
  compact?: boolean;
  slugs?: string[];
}) {
  const list = services
    .filter(
      (s) =>
        (!isPublicSite || s.approval === "approved") &&
        (!slugs || slugs.includes(s.slug)),
    )
    .slice(0, limit);
  return (
    <div className={`service-grid ${compact ? "compact" : ""}`}>
      {list.map((s, i) => (
        <Link
          href={`/services/${s.slug}`}
          className="service-tile"
          key={s.slug}
        >
          <span className="service-tile-top">
            <span className="service-icon">
              <Droplets size={23} strokeWidth={1.5} />
            </span>
            <span className="service-index">
              {String(i + 1).padStart(2, "0")}
            </span>
          </span>
          <h3>{s.title}</h3>
          <p>{s.shortDescription}</p>
          <span className="text-link">
            Explore this service <ArrowUpRight size={17} />
          </span>
          {s.specialty && !isPublicSite && (
            <span className="approval-tag">
              Specialty offering · owner review
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <span>
            <Check size={16} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
export function ReviewInvitation() {
  const reviews = business.reviews.filter((r) => r.approved);
  return (
    <section className="section review-section">
      <div className="container review-grid">
        <div>
          <span className="eyebrow">Good work begins with listening</span>
          <h2>
            Your experience
            <br />
            matters to us.
          </h2>
        </div>
        <div>
          {reviews.length ? (
            reviews.map((r) => (
              <blockquote key={r.name}>
                <p>“{r.quote}”</p>
                <cite>{r.name}</cite>
              </blockquote>
            ))
          ) : (
            <>
              <p>
                A healthy landscape is personal. So is the service behind it.
                Tell us about your experience with GreenMan, or ask a question
                about your property.
              </p>
              <Link
                href="/contact?service=General+inquiry"
                className="text-link"
              >
                Share Your Experience <ArrowRight size={19} />
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="GreenMan home">
              <Brand />
            </Link>
            <p>
              Family-owned irrigation.
              <br />
              Thoughtful care for your landscape.
              <br />
              Rooted in Lynn, Massachusetts.
            </p>
            <div className="social-links">
              {(!isPublicSite || business.socialDestinationsVerified) && (
                <>
                  <a
                    href={business.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={18} />
                    Facebook
                  </a>
                  <a
                    href={business.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok <ArrowUpRight size={15} />
                  </a>
                </>
              )}
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation
              .filter((n) =>
                [
                  "/irrigation",
                  "/landscaping",
                  "/residential",
                  "/commercial",
                  "/maintenance-plans",
                  "/gallery",
                ].includes(n.href),
              )
              .map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
          </div>
          <div>
            <h3>Here to help</h3>
            {navigation
              .filter((n) =>
                [
                  "/about",
                  "/reviews",
                  "/faq",
                  "/service-areas",
                  "/contact",
                ].includes(n.href),
              )
              .map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            <Link href="/services">All Services</Link>
          </div>
          <div>
            <h3>Let’s connect</h3>
            <a href={phoneHref}>
              <Phone size={16} />
              {phoneLabel}
            </a>
            {!isPublicSite && <small>Phone awaits owner confirmation.</small>}
            <p>
              <MapPin size={16} />
              {business.location}
            </p>
            <Link className="footer-estimate" href="/contact">
              Request an Estimate <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.name}
          </span>
          <span>
            <Link href="/privacy">Privacy Policy</Link>
            <span>Made for greener days.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
