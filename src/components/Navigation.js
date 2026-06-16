"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Motion", href: "/motion" },
  { label: "Story", href: "/story" },
  { label: "Fabrics", href: "/#fabrics" },
];

/**
 * Navigation
 * variant="overlay" — transparent over a dark hero, turns solid on scroll
 *                     (homepage, Motion page).
 * variant="solid"   — always solid, for light-background pages where a
 *                     transparent bar would be invisible (Shop, Story).
 */
export default function Navigation({ variant = "overlay" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant === "solid") return; // always solid — no listener needed
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const solid = variant === "solid" || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        solid
          ? "border-b border-stone/60 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        {/* Logo — left */}
        <Link
          href="/"
          className={`wordmark text-xl md:text-2xl transition-colors duration-500 ${
            solid ? "text-charcoal" : "text-cream"
          }`}
        >
          PRIMERA
        </Link>

        {/* Links — center */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`group relative font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-500 ${
                  solid ? "text-charcoal/80 hover:text-charcoal" : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500 ease-luxe group-hover:w-full ${
                    solid ? "bg-charcoal" : "bg-cream"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart — right */}
        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className={`hidden font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-500 md:inline ${
              solid ? "text-charcoal/80 hover:text-charcoal" : "text-cream/80 hover:text-cream"
            }`}
          >
            Cart&nbsp;(0)
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 transition-all duration-300 ${solid ? "bg-charcoal" : "bg-cream"} ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 transition-all duration-300 ${solid ? "bg-charcoal" : "bg-cream"} ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 transition-all duration-300 ${solid ? "bg-charcoal" : "bg-cream"} ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur-md transition-[max-height] duration-500 ease-luxe md:hidden ${
          open ? "max-h-80 border-b border-stone/60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {[...LINKS, { label: "Cart (0)", href: "/shop" }].map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-sans text-sm uppercase tracking-wide2 text-charcoal/80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
