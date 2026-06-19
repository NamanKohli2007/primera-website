"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1];

const QUOTE =
  "I couldn't find clothing that felt the way I wanted it to feel, so I built it myself.";
const QUOTE_WORDS = QUOTE.split(" ");

const quoteContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const quoteWord = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function FounderStory() {
  return (
    <section id="story" className="bg-[#31372C] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:gap-24">
        {/* Left — placeholder image grid */}
        <Reveal className="order-2 md:order-1">
          <div className="grid grid-cols-2 grid-rows-6 gap-3 md:gap-4">
            <div className="placeholder-sheen relative col-span-2 row-span-3 overflow-hidden rounded-sm bg-gradient-to-br from-[#3d4433] to-[#363c2c]">
              <div className="absolute inset-0 fabric-weave opacity-30" />
              <span className="wordmark absolute bottom-4 left-4 text-sm text-cream/25">
                PRIMERA
              </span>
            </div>
            <div className="placeholder-sheen relative row-span-3 overflow-hidden rounded-sm bg-gradient-to-br from-[#3d4433] to-[#363c2c]">
              <div className="absolute inset-0 fabric-weave opacity-30" />
            </div>
            <div className="placeholder-sheen relative row-span-3 overflow-hidden rounded-sm bg-gradient-to-br from-[#3d4433] to-[#363c2c]">
              <div className="absolute inset-0 fabric-weave opacity-30" />
            </div>
          </div>
        </Reveal>

        {/* Right — quote + story */}
        <div className="order-1 md:order-2">
          <Reveal as="p" className="eyebrow mb-8 text-gold">
            The Founder
          </Reveal>

          {/* Quote writes itself in, word by word */}
          <motion.blockquote
            variants={quoteContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="font-serif text-3xl font-light italic leading-snug text-gold md:text-4xl"
          >
            {QUOTE_WORDS.map((w, i) => {
              const text =
                (i === 0 ? "“" : "") +
                w +
                (i === QUOTE_WORDS.length - 1 ? "”" : "");
              return (
                <Fragment key={i}>
                  <motion.span variants={quoteWord} className="inline-block">
                    {text}
                  </motion.span>{" "}
                </Fragment>
              );
            })}
          </motion.blockquote>

          <Reveal delay={0.12} className="my-9 h-px w-14 bg-gold/40" />

          <Reveal
            as="p"
            delay={0.16}
            className="max-w-md font-sans text-[15px] font-light leading-relaxed text-cream/80"
          >
            PRIMERA began with a simple frustration — everyday basics that
            looked the part but never felt it. So we started from the fibre up,
            developing plant-based fabrics that feel extraordinary against the
            skin.
          </Reveal>

          <Reveal
            as="p"
            delay={0.22}
            className="mt-5 max-w-md font-sans text-[15px] font-light leading-relaxed text-cream/80"
          >
            No seasonal noise, no logos shouting for attention. Just essentials
            engineered to be worn, washed, and reached for again — the pieces
            you miss the moment they&apos;re in the laundry.
          </Reveal>

          <Reveal delay={0.28} className="mt-9">
            <p className="font-serif text-xl text-cream">The PRIMERA Studio</p>
            <p className="font-sans text-[12px] uppercase tracking-wide2 text-cream/50">
              Founder &amp; Maker
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
