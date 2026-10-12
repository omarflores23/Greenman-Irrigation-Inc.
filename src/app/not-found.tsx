import Link from "next/link";
import { Sprout, ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found container">
      <Sprout size={55} strokeWidth={1.4} />
      <span className="eyebrow">404 · A little off the garden path</span>
      <h1>
        Let’s get you back
        <br />
        to greener ground.
      </h1>
      <p>
        We couldn’t find that page. Explore our services or tell us what you’re
        looking for.
      </p>
      <div className="button-row">
        <Link href="/" className="button button-primary">
          Back to Home <ArrowUpRight size={17} />
        </Link>
        <Link href="/contact" className="button button-secondary">
          Contact GreenMan
        </Link>
      </div>
    </section>
  );
}
