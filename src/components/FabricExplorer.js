"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const FABRICS = [
  {
    key: "Modal Blend",
    headline: "Exceptionally soft. Naturally.",
    description:
      "Modal is a plant-based fibre derived from beech tree pulp, selected for its exceptional softness, breathability, and the way it drapes naturally against the skin. Our Modal blend is engineered to move with you, hold its shape, and feel noticeably better wash after wash.",
    tags: [
      "Ultra-soft hand feel",
      "Breathable",
      "Shape retention",
      "Gets softer with age",
    ],
    tone: "from-[#efe9e1] to-[#d9cdbc]",
  },
  {
    key: "Bamboo Blend",
    headline: "Lightweight. Breathable. Built for movement.",
    description:
      "Bamboo is one of the most breathable plant-based fibres available — naturally moisture-wicking, lightweight, and smooth against the skin. Our Bamboo blend gives each piece a fluid drape and an effortless comfort that holds up through everyday wear and movement.",
    tags: [
      "Moisture-wicking",
      "Temperature regulating",
      "Lightweight",
      "Natural drape",
    ],
    tone: "from-[#e7e0d4] to-[#cabba6]",
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
                className={`rounded-full px-6 py-2.5 font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-300 ${
                  active === i
                    ? "bg-charcoal text-cream"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {f.key}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel — keyed by active tab so it remounts and fades on switch */}
        <Reveal delay={0.15}>
          <motion.div
            key={fabric.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12"
          >
            {/* Visual */}
            <div
              className={`placeholder-sheen relative min-h-[280px] overflow-hidden rounded-sm bg-gradient-to-br ${fabric.tone} md:min-h-[420px]`}
            >
              <div className="absolute inset-0 fabric-weave opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="wordmark text-2xl text-charcoal/30">
                  {fabric.key}
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
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
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
