"use client";
import Link from "next/link";
import { useRef } from "react";
import {
  Droplets,
  Menu,
  X,
  Phone,
  MapPin,
  ArrowUpRight,
  ChevronDown,
  Facebook,
} from "lucide-react";
type Props = {
  review: boolean;
  phoneHref: string;
  phoneLabel: string;
  phoneVisible: boolean;
  socialVisible: boolean;
  services: { title: string; slug: string }[];
};
export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Droplets aria-hidden="true" size={29} strokeWidth={1.7} />
      </span>
      <span>
        <strong>
          GreenMan<span className="brand-dot">.</span>
        </strong>
        <small>IRRIGATION INC.</small>
      </span>
    </span>
  );
}
export default function Header({
  review,
  phoneHref,
  phoneLabel,
  phoneVisible,
  socialVisible,
  services,
}: Props) {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  return (
    <>
      {review && (
        <div className="review-banner">
          Private website review{" "}
          <span>
            · Photos, services & business details await owner approval
          </span>
        </div>
      )}
      <div className="utility">
        <div className="container utility-inner">
          <span>Family-owned. Locally rooted.</span>
          <span>
            <MapPin size={13} aria-hidden="true" /> Lynn, Massachusetts
          </span>
          <div>
            <a href={phoneHref}>
              <Phone size={13} aria-hidden="true" />
              {phoneLabel}
              {review && phoneVisible && (
                <small> · owner confirmation pending</small>
              )}
            </a>
            {socialVisible && (
              <a
                href="https://www.facebook.com/p/GreenMan-Irrigation-Inc-100054579468900/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GreenMan Facebook"
              >
                <Facebook size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" aria-label="GreenMan Irrigation home">
            <Brand />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <details className="nav-dropdown">
              <summary>
                Services <ChevronDown size={13} />
              </summary>
              <div className="mega-menu">
                <div>
                  <span className="eyebrow">
                    A little care. A greener landscape.
                  </span>
                  <Link
                    href="/services"
                    onClick={(e) =>
                      e.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    All Irrigation Services <ArrowUpRight size={18} />
                  </Link>
                  <Link
                    href="/irrigation"
                    onClick={(e) =>
                      e.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    Irrigation Overview
                  </Link>
                  <Link
                    href="/residential"
                    onClick={(e) =>
                      e.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    Residential
                  </Link>
                  <Link
                    href="/commercial"
                    onClick={(e) =>
                      e.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    Commercial
                  </Link>
                  <Link
                    href="/maintenance-plans"
                    onClick={(e) =>
                      e.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    Seasonal Maintenance
                  </Link>
                </div>
                <div className="mega-services">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={(e) =>
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open")
                      }
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
            <Link href="/landscaping">Landscaping</Link>
            <Link href="/gallery">Our Work</Link>
            <details className="nav-dropdown">
              <summary>
                About <ChevronDown size={13} />
              </summary>
              <div className="small-menu">
                {[
                  ["/about", "Our Story"],
                  ["/reviews", "Customer Experiences"],
                  ["/faq", "Frequently Asked Questions"],
                  ["/service-areas", "Service Areas"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={(e) =>
                      e.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>
          <Link className="button button-primary header-cta" href="/contact">
            Request an Estimate <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-menu-toggle icon-button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            onClick={() => menu.current?.showModal()}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={menu}
        className="mobile-menu"
        aria-label="Website navigation"
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ["/", "Home"],
            ["/services", "All Services"],
            ["/irrigation", "Irrigation"],
            ["/landscaping", "Landscaping"],
            ["/residential", "Residential"],
            ["/commercial", "Commercial"],
            ["/maintenance-plans", "Seasonal Care"],
            ["/about", "About GreenMan"],
            ["/gallery", "Our Work"],
            ["/reviews", "Reviews"],
            ["/faq", "FAQ"],
            ["/service-areas", "Service Areas"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={close}>
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
        <Link className="button button-primary" href="/contact" onClick={close}>
          Request an Estimate
        </Link>
        <a className="mobile-phone" href={phoneHref} onClick={close}>
          <Phone size={17} />
          {phoneLabel}
        </a>
      </dialog>
    </>
  );
}
