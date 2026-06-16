"use client";

import Reveal from "@/components/Reveal";

const CLIPS = [
  { quote: "This feels insane.", name: "First touch", tone: "from-[#34332f] to-[#1f1e1b]" },
  { quote: "What is this made from?", name: "The reveal", tone: "from-[#383631] to-[#201f1c]" },
  { quote: "I'd wear this every day.", name: "The verdict", tone: "from-[#312f2b] to-[#1c1b19]" },
];

function PlayIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/30 backdrop-blur-sm transition-all duration-500 ease-luxe group-hover:scale-110 group-hover:border-cream/60 group-hover:bg-cream/5">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="ml-0.5">
        <path d="M0 0L14 8L0 16V0Z" fill="#FAF8F5" fillOpacity="0.85" />
      </svg>
    </span>
  );
}

export default function TouchTest() {
  return (
    <section id="touch-test" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl md:mb-20">
          <Reveal as="p" className="eyebrow mb-4 text-cream/40">
            The Touch Test
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="font-serif text-4xl font-light leading-tight text-cream md:text-5xl"
          >
            You can&apos;t photograph a feeling.
            <br />
            <span className="text-cream/50">So we filmed the reaction.</span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLIPS.map((clip, i) => (
            <Reveal key={clip.quote} delay={i * 0.1} className="group cursor-pointer">
              <div
                className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm bg-gradient-to-br ${clip.tone} p-7`}
              >
                <div className="absolute inset-0 fabric-weave opacity-[0.15]" />

                {/* Top label */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-cream/40">
                    {clip.name}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-cream/40">
                    0{i + 1}
                  </span>
                </div>

                {/* Centre play */}
                <div className="relative z-10 flex flex-1 items-center justify-center">
                  <PlayIcon />
                </div>

                {/* Quote */}
                <p className="relative z-10 font-serif text-2xl italic leading-snug text-cream md:text-[1.75rem]">
                  “{clip.quote}”
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
