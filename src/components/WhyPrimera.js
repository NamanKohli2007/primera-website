"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Reveal from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1];

const REASONS = [
  {
    n: "01",
    title: "Premium Plant-Based Fibres",
    body: "Premium plant-based fabrics — soft, drapey Modal and breathable, lightweight Bamboo — spun to fall softer, breathe better, and only improve with every wear and wash.",
  },
  {
    n: "02",
    title: "Thoughtfully Developed",
    body: "Every piece is refined over countless iterations — fit, weight, and hand-feel obsessed over until nothing is left to add or remove.",
  },
  {
    n: "03",
    title: "Made To Be Missed",
    body: "The essentials you reach for first. So often worn, washed, and worn again that they're rarely in the wardrobe at all.",
  },
];

function ReasonColumn({ reason, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const base = index * 0.22; // column stagger: 01, then 02, then 03
  const target = parseInt(reason.n, 10);
  const [num, setNum] = useState(0);

  // Count up 00 → final number once the column scrolls into view
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 0.6,
      delay: base,
      ease: "easeOut",
      onUpdate: (v) => setNum(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, base]);

  return (
    <div
      ref={ref}
      className="group flex h-full flex-col border-t border-charcoal/15 pt-7"
    >
      <span className="font-serif text-5xl font-light tabular-nums text-gold/70 transition-colors duration-500 group-hover:text-gold md:text-6xl">
        {String(num).padStart(2, "0")}
      </span>
      <motion.h3
        className="mt-6 font-serif text-2xl font-light text-charcoal md:text-[1.7rem]"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.6, delay: base + 0.7, ease: EASE }}
      >
        {reason.title}
      </motion.h3>
      <motion.p
        className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-charcoal/60"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.6, delay: base + 0.95, ease: EASE }}
      >
        {reason.body}
      </motion.p>
    </div>
  );
}

export default function WhyPrimera() {
  return (
    <section id="why" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal as="p" className="eyebrow mb-16 text-center md:mb-24">
          Why Primera
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {REASONS.map((reason, i) => (
            <ReasonColumn key={reason.n} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
