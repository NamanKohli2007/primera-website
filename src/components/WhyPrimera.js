"use client";

import Reveal from "@/components/Reveal";

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

export default function WhyPrimera() {
  return (
    <section id="why" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal as="p" className="eyebrow mb-16 text-center md:mb-24">
          Why Primera
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.n} delay={i * 0.12} className="group">
              <div className="flex h-full flex-col border-t border-charcoal/15 pt-7">
                <span className="font-serif text-5xl font-light text-charcoal/25 transition-colors duration-500 group-hover:text-charcoal/45 md:text-6xl">
                  {reason.n}
                </span>
                <h3 className="mt-6 font-serif text-2xl font-light text-charcoal md:text-[1.7rem]">
                  {reason.title}
                </h3>
                <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-charcoal/60">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
