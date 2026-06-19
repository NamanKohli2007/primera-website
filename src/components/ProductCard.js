"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import PriceTag from "@/components/PriceTag";

/**
 * ProductCard — the shared product tile (homepage Collection, /shop, /motion).
 * The whole card links through to the product's detail page.
 *
 * `surface` describes the SECTION background behind the card and controls the
 * colour of the text/swatches below the image:
 *   "light" → charcoal text  •  "dark" → cream text
 *
 * The image area's own darkness is driven by `product.cardDark`, so a dark
 * Motion card can sit on a light section (the homepage Motion tab) without
 * making the text below it unreadable.
 */
export default function ProductCard({ product, index = 0, surface = "light" }) {
  const surfaceDark = surface === "dark";
  const cardDark = !!product.cardDark;

  return (
    <Reveal delay={index * 0.15}>
      <Link href={product.href} className="group block cursor-pointer">
        {/* Placeholder image area */}
        <div
          className={`placeholder-sheen relative mb-5 aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br ${product.tone}`}
        >
          <div className="absolute inset-0 fabric-weave opacity-40" />
          <div
            className={`absolute left-4 top-4 z-10 font-sans text-[10px] uppercase tracking-[0.22em] ${
              cardDark ? "text-cream/40" : "text-charcoal/40"
            }`}
          >
            {product.tag}
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span
              className={`wordmark text-base ${
                cardDark ? "text-cream/15" : "text-charcoal/25"
              }`}
            >
              PRIMERA
            </span>
          </div>
          {/* Quick-add bar on hover */}
          <div
            className={`absolute inset-x-3 bottom-3 z-10 translate-y-4 rounded-full py-2.5 text-center font-sans text-[11px] uppercase tracking-wide2 opacity-0 backdrop-blur-sm transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 ${
              cardDark ? "bg-cream text-ink" : "bg-ink/90 text-cream"
            }`}
          >
            View Product
          </div>
        </div>

        {/* Name */}
        <h3
          className={`font-sans text-sm font-medium tracking-wide ${
            surfaceDark ? "text-cream" : "text-charcoal"
          }`}
        >
          {product.name}
        </h3>

        {/* Optional descriptor (Motion pieces) */}
        {product.cardNote && (
          <p
            className={`mt-1.5 font-sans text-xs leading-relaxed ${
              surfaceDark ? "text-cream/45" : "text-charcoal/50"
            }`}
          >
            {product.cardNote}
          </p>
        )}

        {/* Price */}
        <div className="mt-2">
          <PriceTag
            original={product.original}
            current={product.price}
            dark={surfaceDark}
            size="sm"
          />
        </div>

        {/* Colour swatches — 14px circles, decorative */}
        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="inline-block h-[14px] w-[14px] rounded-full"
              style={{
                backgroundColor: c.hex,
                border: c.border
                  ? `1px solid ${c.border}`
                  : surfaceDark
                  ? "1px solid rgba(245,242,238,0.28)"
                  : undefined,
              }}
            />
          ))}
        </div>
      </Link>
    </Reveal>
  );
}
