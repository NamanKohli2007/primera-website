"use client";

import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "The Primera Tee", href: "/shop/primera-tee" },
      { label: "The Primera Henley", href: "/shop/henley" },
      { label: "The Primera Trousers", href: "/shop/trousers" },
      { label: "Motion", href: "/motion" },
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
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Size Guide", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone/70 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Logo + line */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 wordmark text-2xl text-charcoal"
            >
              <Image
                src="/Primera-bgremoved.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain"
              />
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
