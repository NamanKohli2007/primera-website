"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import FabricCanvas from "@/components/FabricCanvas";

const EASE = [0.22, 1, 0.36, 1];

const LINE_1 = "Some clothes fill your wardrobe.".split(" ");
const LINE_2 = "The best ones rarely stay there.".split(" ");

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Word({ text, className = "" }) {
  return (
    <Fragment>
      <motion.span
        variants={wordVariant}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>{" "}
    </Fragment>
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  // Fake CSS parallax — a separate background div (dark colour + fabric canvas)
  // is translated at 0.3x the section's scroll offset, so it visibly lags
  // behind the text, which scrolls normally. The div is 140% tall (top -20%)
  // so the movement never exposes an empty edge.
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative overflow-hidden bg-[#1e1e1c] py-44 md:py-60"
    >
      {/* Moving background — dark panel + faint fabric canvas. Translated by the
          scroll listener above so it lags the text for a parallax sense of
          depth. The fabric canvas rides along inside it. */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[-20%] h-[140%] w-full"
        style={{
          background: "#1e1e1c",
          transform: "translateY(0)",
          animation: "none",
        }}
      >
        <FabricCanvas speed={0.3} opacity={0.15} />
      </div>

      {/* Seamless blends: hero (#1a1a18) → background at the top, background →
          collection (#F5F2EE) at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#1a1a18] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-[#F5F2EE]" />

      {/* Content — a completely separate layer (z-2) that scrolls normally */}
      <div className="relative z-[2] mx-auto max-w-4xl px-6 text-center">
        <Reveal
          as="p"
          className="mb-12 font-sans text-[11px] uppercase tracking-[0.3em] text-cream/40"
        >
          Philosophy
        </Reveal>

        {/* Headline reveals word by word as it scrolls into view */}
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="font-serif text-3xl font-light leading-[1.25] text-cream sm:text-4xl md:text-5xl md:leading-[1.2]"
        >
          {LINE_1.map((w, i) => (
            <Word key={`a-${i}`} text={w} />
          ))}
          <br className="hidden sm:block" />
          {LINE_2.map((w, i) => (
            <Word key={`b-${i}`} text={w} className="italic text-cream/75" />
          ))}
        </motion.h2>

        {/* Divider between the statement and the supporting lines */}
        <Reveal delay={0.15} className="mx-auto my-12 h-px w-16 bg-gold/40" />

        <Reveal
          as="p"
          delay={0.1}
          className="font-sans text-[11px] uppercase leading-relaxed tracking-[0.25em] text-cream/50 md:text-xs"
        >
          They&rsquo;re being worn, washed, and worn again.
        </Reveal>

        {/* Closing statement — the most important line, in gold */}
        <Reveal
          as="p"
          delay={0.2}
          className="mt-14 font-serif text-4xl font-light italic text-gold sm:text-5xl md:text-6xl"
        >
          Made To Be Missed.
        </Reveal>
      </div>
    </section>
  );
}
