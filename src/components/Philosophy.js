"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-cream py-28 md:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal as="p" className="eyebrow mb-10">
          Philosophy
        </Reveal>

        <Reveal
          as="h2"
          delay={0.05}
          className="font-serif text-3xl font-light leading-[1.25] text-charcoal sm:text-4xl md:text-5xl md:leading-[1.22]"
        >
          Some clothes fill your wardrobe.
          <br className="hidden sm:block" />{" "}
          <span className="text-charcoal/55">
            The best ones rarely stay there.
          </span>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto my-12 h-px w-16 bg-charcoal/25" />

        <Reveal
          as="p"
          delay={0.2}
          className="font-serif text-xl italic text-charcoal/70 md:text-2xl"
        >
          Made To Be Missed.
        </Reveal>

        <Reveal delay={0.28} className="mt-10 flex justify-center">
          <Image
            src="/Primera-bgremoved.png"
            alt="PRIMERA"
            width={60}
            height={60}
            className="h-[60px] w-[60px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
