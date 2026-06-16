"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { essentials, motion as motionProducts } from "@/lib/products";

const TABS = [
  { id: "essentials", label: "Essentials", items: essentials, href: "/shop" },
  { id: "motion", label: "Motion", items: motionProducts, href: "/motion" },
];

export default function Collection() {
  const [active, setActive] = useState("essentials");
  const current = TABS.find((t) => t.id === active);

  return (
    <section id="collection" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal as="p" className="eyebrow mb-4">
              The Collection
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="font-serif text-4xl font-light text-charcoal md:text-5xl"
            >
              Pieces you reach for.
            </Reveal>
          </div>
          <Reveal as="div" delay={0.1}>
            <Link
              href={current.href}
              className="group inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-charcoal/70 transition-colors hover:text-charcoal"
            >
              View all
              <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal as="div" delay={0.1} className="mb-12 flex items-center gap-8 md:mb-16">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`relative pb-2 font-sans text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                {tab.label}
                <span
                  className={`absolute -bottom-0 left-0 h-px bg-charcoal transition-all duration-500 ease-luxe ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </Reveal>

        {/* Grid — keyed by active tab so it remounts and fades in on switch */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-7 ${
            active === "essentials"
              ? "md:grid-cols-3"
              : "md:mx-auto md:max-w-3xl md:grid-cols-2"
          }`}
        >
          {current.items.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
