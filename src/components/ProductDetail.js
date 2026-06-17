"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import PriceTag from "@/components/PriceTag";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function DetailSection({ title, children }) {
  return (
    <div className="border-t border-stone/70 py-8 md:py-10">
      <h2 className="eyebrow mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function ProductDetail({ product }) {
  const { addItem, openCart } = useCart();
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [needSize, setNeedSize] = useState(false);

  const backHref = product.category === "motion" ? "/motion" : "/shop";
  const backLabel = product.category === "motion" ? "Motion" : "Essentials";
  const selectedColor = product.colors[colorIndex];

  const handleAdd = () => {
    if (!size) {
      setNeedSize(true);
      return;
    }
    addItem(product, { color: selectedColor.name, size, quantity: 1 });
    openCart();
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36"
    >
      {/* Breadcrumb */}
      <motion.div variants={fade} custom={0}>
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-charcoal/60 transition-colors hover:text-charcoal"
        >
          <span className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1">
            ←
          </span>
          {backLabel}
        </Link>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:gap-16">
        {/* Image area */}
        <motion.div variants={fade} custom={1} className="md:sticky md:top-28 md:self-start">
          <div
            className={`placeholder-sheen relative aspect-[4/5] overflow-hidden rounded-sm bg-gradient-to-br ${product.tone}`}
          >
            <div className="absolute inset-0 fabric-weave opacity-40" />
            <div
              className={`absolute left-5 top-5 z-10 font-sans text-[10px] uppercase tracking-[0.22em] ${
                product.cardDark ? "text-cream/40" : "text-charcoal/40"
              }`}
            >
              {product.tag}
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Image
                src="/Primera-bgremoved.png"
                alt=""
                aria-hidden="true"
                width={120}
                height={120}
                className="h-auto w-[120px] opacity-[0.08]"
              />
            </div>
          </div>
        </motion.div>

        {/* Purchase panel */}
        <motion.div variants={fade} custom={2} className="flex flex-col">
          <p className="eyebrow mb-4">{product.tag}</p>
          <h1 className="font-serif text-4xl font-light leading-[1.05] text-ink md:text-6xl">
            {product.name}
          </h1>
          {product.summary && (
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-charcoal/65">
              {product.summary}
            </p>
          )}
          <div className="mt-5">
            <PriceTag
              original={product.original}
              current={product.price}
              size="lg"
            />
          </div>

          {/* Colour selector */}
          <div className="mt-9">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/50">
                Colour
              </span>
              <span className="font-sans text-[13px] text-charcoal/70">
                {selectedColor.name}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {product.colors.map((c, i) => {
                const isSel = i === colorIndex;
                return (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={isSel}
                    onClick={() => setColorIndex(i)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                      isSel
                        ? "ring-1 ring-charcoal ring-offset-2 ring-offset-cream"
                        : "ring-1 ring-transparent hover:ring-stone"
                    }`}
                  >
                    <span
                      className="block h-6 w-6 rounded-full"
                      style={{
                        backgroundColor: c.hex,
                        border: c.border ? `1px solid ${c.border}` : undefined,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/50">
                Size
              </span>
              {needSize && (
                <span className="font-sans text-[12px] text-charcoal/70">
                  Please select a size
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {product.sizes.map((s) => {
                const isSel = s === size;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setNeedSize(false);
                    }}
                    className={`h-11 min-w-[3rem] rounded-sm border px-4 font-sans text-[13px] tracking-wide transition-all duration-300 ${
                      isSel
                        ? "border-ink bg-ink text-cream"
                        : "border-stone text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAdd}
            className="btn-solid mt-9 w-full bg-ink text-cream hover:bg-charcoal"
          >
            Add to Cart
          </button>
          <p className="mt-4 font-sans text-[12px] text-charcoal/45">
            Free delivery over ₹4999 · 30-day returns
          </p>

          {/* Why You'll Reach For It */}
          <div className="mt-12">
            <h2 className="eyebrow mb-5">Why You&rsquo;ll Reach For It</h2>
            <ul className="space-y-3.5">
              {product.why.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-sans text-[15px] leading-relaxed text-charcoal/75"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-charcoal/40" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Detail sections */}
      <motion.div variants={fade} custom={3} className="mt-20 max-w-3xl md:mt-28">
        <DetailSection title="The Fabric">
          <p className="font-sans text-[15px] leading-[1.8] text-charcoal/75">
            {product.fabric}
          </p>
        </DetailSection>
        <DetailSection title="Fit & Details">
          <p className="font-sans text-[15px] leading-[1.8] text-charcoal/75">
            {product.fitDetails}
          </p>
        </DetailSection>
        <DetailSection title="Care">
          <p className="font-sans text-[15px] leading-[1.8] text-charcoal/75">
            {product.care}
          </p>
        </DetailSection>
      </motion.div>
    </motion.div>
  );
}
