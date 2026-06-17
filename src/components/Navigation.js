"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const LINKS = [
  { label: "Essentials", href: "/shop" },
  { label: "Motion", href: "/motion" },
  { label: "Story", href: "/story" },
  { label: "Fabrics", href: "/#fabrics" },
  { label: "FAQ", href: "/faq" },
];

function BagIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

/**
 * Navigation
 * variant="overlay" — transparent over a dark hero, turns solid on scroll
 *                     (homepage, Motion page).
 * variant="solid"   — always solid, for light-background pages where a
 *                     transparent bar would be invisible (Shop, Story, etc).
 */
export default function Navigation({ variant = "overlay" }) {
  const { count, openCart, hydrated } = useCart();
  const { user, hydrated: authHydrated } = useAuth();
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
  const showBadge = hydrated && count > 0;

  return (
    <header
      className={`fixed inset-x-0 top-9 z-50 transition-all duration-500 ease-luxe ${
        solid
          ? "border-b border-stone/60 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        {/* Logo — left */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 wordmark text-xl md:text-2xl transition-colors duration-500 ${
            solid ? "text-charcoal" : "text-cream"
          }`}
        >
          <Image
            src="/Primera-bgremoved.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 shrink-0 object-contain"
          />
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

        {/* Account + bag + mobile toggle — right */}
        <div className="flex items-center gap-5">
          {authHydrated &&
            (user ? (
              <Link
                href="/account"
                aria-label="My account"
                className={`hidden items-center gap-1.5 font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-500 md:inline-flex ${
                  solid ? "text-charcoal/80 hover:text-charcoal" : "text-cream/85 hover:text-cream"
                }`}
              >
                <PersonIcon />
                <span className="max-w-[7rem] truncate">
                  {user.firstName || "Account"}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className={`hidden font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-500 md:inline ${
                  solid ? "text-charcoal/80 hover:text-charcoal" : "text-cream/85 hover:text-cream"
                }`}
              >
                Sign In
              </Link>
            ))}

          <button
            type="button"
            onClick={openCart}
            aria-label={showBadge ? `Open bag, ${count} item${count > 1 ? "s" : ""}` : "Open bag"}
            className={`relative transition-colors duration-500 ${
              solid ? "text-charcoal/80 hover:text-charcoal" : "text-cream/85 hover:text-cream"
            }`}
          >
            <BagIcon />
            {showBadge && (
              <span
                className={`absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 font-sans text-[10px] font-medium leading-none ${
                  solid ? "bg-charcoal text-cream" : "bg-cream text-ink"
                }`}
              >
                {count}
              </span>
            )}
          </button>

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
          {LINKS.map((link) => (
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
          {authHydrated && (
            <li>
              <Link
                href={user ? "/account" : "/login"}
                onClick={() => setOpen(false)}
                className="block py-3 font-sans text-sm uppercase tracking-wide2 text-charcoal/80"
              >
                {user ? "My Account" : "Sign In"}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
