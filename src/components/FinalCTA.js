"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-28 md:py-44"
    >
      {/* Soft draped-light backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(245,242,238,0.08),_transparent_60%)]" />
      <div className="pointer-events-none absolute -left-1/4 top-1/2 h-[120%] w-[80%] -translate-y-1/2 rotate-12 bg-[linear-gradient(115deg,_transparent,_rgba(245,242,238,0.04),_transparent)] blur-2xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          className="eyebrow mb-8 text-cream/40"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          The Last Word
        </motion.p>

        <motion.h2
          className="wordmark text-[15vw] leading-none text-cream sm:text-[12vw] md:text-[9rem]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          PRIMERA
        </motion.h2>

        <motion.p
          className="mt-6 font-serif text-2xl italic text-gold md:text-3xl"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
        >
          Made To Be Missed.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
        >
          <Link
            href="/shop"
            className="btn-solid bg-cream text-ink hover:bg-cream/85"
          >
            Shop Essentials
          </Link>
          <Link
            href="/motion"
            className="btn-outline border-cream/40 text-cream hover:border-cream hover:bg-cream/5"
          >
            Shop Motion
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
