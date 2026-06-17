"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FabricCanvas from "@/components/FabricCanvas";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const scrollRef = useRef(null);

  // Gentle parallax drift on the hint indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const o = Math.min(window.scrollY / 400, 1);
      el.style.opacity = String(1 - o);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Animated flowing fabric */}
      <FabricCanvas />

      {/* Still logo watermark — a faint ghost of the mark, sitting between
          the flowing canvas (back) and the text content (front). White
          silhouette reads best against the dark hero; it never animates. */}
      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
        <Image
          src="/Primera-bgremoved.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          priority
          className="h-auto w-[200px] select-none opacity-[0.07] md:w-[460px]"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* Depth vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(10,10,8,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex flex-col items-center px-6 text-center"
      >
        <motion.span
          variants={item}
          className="mb-8 font-sans text-[11px] uppercase tracking-[0.4em] text-cream/50"
        >
          Premium Everyday Essentials
        </motion.span>

        <motion.h1
          variants={item}
          className="wordmark text-[18vw] leading-[0.9] text-cream sm:text-[15vw] md:text-[12vw] lg:text-[10.5rem]"
        >
          PRIMERA
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-serif text-2xl italic text-cream/90 md:text-3xl"
        >
          Made To Be Missed.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-cream/65 md:text-base"
        >
          Everyday essentials crafted from premium plant-based fibres.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
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
      </motion.div>

      {/* Scroll hint */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/40">
          Scroll
        </span>
        <span className="block h-10 w-px overflow-hidden bg-cream/15">
          <span className="block h-4 w-px animate-[scrollLine_2.2s_ease-in-out_infinite] bg-cream/70" />
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(150%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </section>
  );
}
