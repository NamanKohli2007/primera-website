"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const FABRICS = [
  {
    key: "Modal",
    headline: "Modal — the second-skin softness.",
    description:
      "Spun from regenerated beech, modal is prized for a silk-like drape and a softness that deepens over time. It holds colour beautifully, resists pilling, and stays smooth wash after wash — the quiet luxury that lives closest to the skin.",
    tags: ["Silk-like drape", "Colour-fast", "Pill-resistant", "Breathable", "Gets softer with age"],
    tone: "from-[#efe9e1] to-[#d9cdbc]",
  },
  {
    key: "Bamboo",
    headline: "Bamboo — engineered by nature.",
    description:
      "Naturally thermo-regulating and moisture-wicking, bamboo fibre keeps you cool when it's warm and warm when it's cool. Fast-growing and low-impact, it's a fabric that feels as considered as it is conscientious.",
    tags: ["Thermo-regulating", "Moisture-wicking", "Naturally fresh", "Low-impact", "Featherlight"],
    tone: "from-[#e7e0d4] to-[#cabba6]",
  },
  {
    key: "The Blend",
    headline: "The Blend — our signature hand-feel.",
    description:
      "Our proprietary bamboo–modal blend marries the cool resilience of bamboo with the buttery drape of modal. The result is a fabric with weight, recovery, and a hand-feel that's unmistakably PRIMERA — made to be missed.",
    tags: ["Best of both", "Structured drape", "Shape recovery", "All-day comfort", "Signature feel"],
    tone: "from-[#e9e2d8] to-[#c7b8a3]",
  },
];

export default function FabricExplorer() {
  const [active, setActive] = useState(0);
  const fabric = FABRICS[active];

  return (
    <section id="fabrics" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <Reveal as="p" className="eyebrow mb-4">
            Fabric Explorer
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="font-serif text-4xl font-light text-charcoal md:text-5xl"
          >
            Feel it, fibre by fibre.
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={0.1} className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-charcoal/12 bg-ivory/60 p-1.5">
            {FABRICS.map((f, i) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(i)}
                className={`relative rounded-full px-6 py-2.5 font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-300 ${
                  active === i ? "text-cream" : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="fabric-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-charcoal"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.key}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12">
            {/* Visual */}
            <div
              className={`placeholder-sheen relative min-h-[280px] overflow-hidden rounded-sm bg-gradient-to-br ${fabric.tone} md:min-h-[420px]`}
            >
              <div className="absolute inset-0 fabric-weave opacity-40" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={fabric.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="wordmark text-2xl text-charcoal/30">
                    {fabric.key}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fabric.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-serif text-3xl font-light leading-snug text-charcoal md:text-4xl">
                    {fabric.headline}
                  </h3>
                  <p className="mt-6 max-w-md font-sans text-[15px] font-light leading-relaxed text-charcoal/65">
                    {fabric.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {fabric.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-charcoal/15 bg-cream px-4 py-2 font-sans text-[11px] uppercase tracking-wide2 text-charcoal/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
