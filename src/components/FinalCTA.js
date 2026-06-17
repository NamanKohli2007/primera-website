"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-44">
      {/* Soft draped-light backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(245,242,238,0.08),_transparent_60%)]" />
      <div className="pointer-events-none absolute -left-1/4 top-1/2 h-[120%] w-[80%] -translate-y-1/2 rotate-12 bg-[linear-gradient(115deg,_transparent,_rgba(245,242,238,0.04),_transparent)] blur-2xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal as="p" className="eyebrow mb-8 text-cream/40">
          The Last Word
        </Reveal>

        <Reveal
          as="h2"
          delay={0.05}
          className="wordmark text-[15vw] leading-none text-cream sm:text-[12vw] md:text-[9rem]"
        >
          PRIMERA
        </Reveal>

        <Reveal
          as="p"
          delay={0.12}
          className="mt-6 font-serif text-2xl italic text-cream/80 md:text-3xl"
        >
          Made To Be Missed.
        </Reveal>

        <Reveal
          as="div"
          delay={0.18}
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
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
        </Reveal>
      </div>
    </section>
  );
}
