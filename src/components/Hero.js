"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FabricCanvas from "@/components/FabricCanvas";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const scrollRef = useRef(null);
  const [started, setStarted] = useState(false);

  // Kick off the cinematic entrance. On a first visit the loading screen is
  // showing, so we delay the entrance to begin as it fades out — handing the
  // centred logo over to the hero. On repeat visits it begins almost at once.
  useEffect(() => {
    let firstVisit = true;
    try {
      firstVisit = !sessionStorage.getItem("primera_intro_seen");
    } catch {
      /* ignore */
    }
    const id = setTimeout(() => setStarted(true), firstVisit ? 1700 : 200);
    return () => clearTimeout(id);
  }, []);

  // Gentle parallax fade on the scroll hint
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
      {/* Animated flowing fabric (already running underneath) */}
      <FabricCanvas />

      {/* Faint logo watermark — crossfades in as the handoff logo fades out */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 0.07 : 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/Primera-bgremoved.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          priority
          className="h-auto w-[200px] select-none md:w-[460px]"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>

      {/* Depth vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(10,10,8,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

      {/* Cinematic dark cover — brightens away to reveal the fabric */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15] bg-ink"
        initial={{ opacity: 1 }}
        animate={{ opacity: started ? 0 : 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Handoff logo — continues from the loading screen, then fades away */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[16] flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: started ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      >
        <Image
          src="/Primera-bgremoved.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          priority
          className="h-[260px] w-[260px] md:h-[380px] md:w-[380px]"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <motion.span
          className="mb-8 font-sans text-[11px] uppercase tracking-[0.4em] text-cream/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 3.2, ease: "easeOut" }}
        >
          Premium Everyday Essentials
        </motion.span>

        <motion.h1
          className="wordmark text-[18vw] leading-[0.9] text-cream sm:text-[15vw] md:text-[12vw] lg:text-[10.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.9, ease: "easeOut" }}
        >
          PRIMERA
        </motion.h1>

        <motion.p
          className="mt-4 font-serif text-2xl italic text-gold md:text-3xl"
          initial={{ opacity: 0, y: 18 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.85, delay: 2.7, ease: EASE }}
        >
          Made To Be Missed.
        </motion.p>

        <motion.p
          className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-cream/65 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 3.45, ease: "easeOut" }}
        >
          Everyday essentials crafted from premium plant-based fibres.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.75, delay: 3.8, ease: EASE }}
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

      {/* Scroll hint — outer fades in with the entrance, inner fades on scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 4.2, ease: "easeOut" }}
      >
        <div ref={scrollRef} className="flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/40">
            Scroll
          </span>
          <span className="block h-10 w-px overflow-hidden bg-cream/15">
            <span className="block h-4 w-px animate-[scrollLine_2.2s_ease-in-out_infinite] bg-cream/70" />
          </span>
        </div>
      </motion.div>

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
