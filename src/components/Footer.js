"use client";

import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Primera Tee", href: "/shop" },
      { label: "The Henley", href: "/shop" },
      { label: "Primera Shorts", href: "/shop" },
      { label: "The Trousers", href: "/shop" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Motion", href: "/motion" },
      { label: "Our Story", href: "/story" },
      { label: "Fabrics", href: "/#fabrics" },
      { label: "The Touch Test", href: "/#touch-test" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Stockists", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone/70 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Logo + line */}
          <div>
            <Link href="/" className="wordmark text-2xl text-charcoal">
              PRIMERA
            </Link>
            <p className="mt-4 max-w-xs font-serif text-lg italic text-charcoal/55">
              Made To Be Missed.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 font-sans text-[11px] uppercase tracking-[0.25em] text-charcoal/45">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-charcoal/70 transition-colors duration-300 hover:text-charcoal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone/70 pt-8 sm:flex-row">
          <p className="font-sans text-[12px] text-charcoal/45">
            © {new Date().getFullYear()} PRIMERA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-sans text-[12px] text-charcoal/45 transition-colors hover:text-charcoal"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-sans text-[12px] text-charcoal/45 transition-colors hover:text-charcoal"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-sans text-[12px] text-charcoal/45 transition-colors hover:text-charcoal"
            >
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
