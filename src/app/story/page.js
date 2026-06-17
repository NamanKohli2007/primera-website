import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Our Story — PRIMERA",
  description:
    "Primera was born from a simple goal: create clothing that feels exceptional to wear. This is the story.",
};

// The article, broken into editorial movements. The pull quote and the
// closing line are pulled out of the flow and given their own treatment.
const OPENING = [
  "Three years ago, I became obsessed with fitness.",
  "Like most people, I focused on training, nutrition, and recovery. But eventually, that curiosity expanded into something I had never paid much attention to before: the clothes I was wearing every day.",
  "As I researched fabrics, synthetic materials, and the growing conversation around microplastics, I started questioning why comfortable, high-quality clothing made from thoughtfully selected materials was so difficult to find.",
  "At the same time, I realized something else.",
  "Most clothing brands were competing on logos, trends, and marketing. Very few were obsessed with the fabric itself.",
  "What frustrated me most was that I could never find clothing that checked every box.",
  "Some fabrics were soft but lacked durability. Others performed well but felt synthetic. Many looked good online but didn't feel special once you put them on.",
  "I wasn't looking for another T-shirt.",
  "I was looking for clothing that I would genuinely want to wear every day. The kind of piece you instinctively reach for when everything else is hanging beside it.",
  "After testing fabric after fabric, I experienced something I hadn't felt before. Certain premium plant-based fabrics simply felt different. Softer. More comfortable. More enjoyable to wear.",
  "Once I experienced that difference, it became impossible to ignore.",
];

const MIDDLE = [
  "So I decided to build the brand I wished existed.",
  "Primera was born from a simple goal: create clothing that feels exceptional to wear.",
  "I spent months studying fabrics, sourcing materials, and comparing mills. Dozens of fabric swatches were ordered and tested before a single product was approved. Different blends, constructions, and finishes were compared, washed, worn, and refined repeatedly.",
  "What I discovered was that not all fabrics are created equal. Even within the same category, quality varies dramatically depending on sourcing, manufacturing, and finishing.",
  "That's why every Primera fabric is selected with one question in mind:",
];

const CLOSING_PARAS = [
  "The result is a collection crafted from premium plant-based fibres and carefully selected materials chosen for their softness, comfort, breathability, and everyday performance.",
  "Primera isn't built around trends.",
  "It's built around the pieces you reach for most.",
];

const paraClass =
  "font-sans text-[17px] leading-[1.85] text-ink/80 md:text-[18px]";

export default function StoryPage() {
  return (
    <>
      <Navigation variant="solid" />

      <main className="bg-cream">
        {/* Hero */}
        <section className="px-6 pb-14 pt-36 text-center md:pb-20 md:pt-52">
          <Reveal className="mb-8 flex justify-center">
            <Image
              src="/Primera-bgremoved.png"
              alt="PRIMERA"
              width={80}
              height={80}
              priority
              className="h-20 w-20"
            />
          </Reveal>
          <Reveal as="p" className="eyebrow mb-6">
            The PRIMERA Story
          </Reveal>
          <Reveal
            as="h1"
            delay={0.05}
            className="font-serif text-6xl font-light leading-none text-ink md:text-8xl"
          >
            Our Story
          </Reveal>
          <Reveal
            as="div"
            delay={0.12}
            className="mx-auto mt-10 h-px w-16 bg-charcoal/20"
          />
        </section>

        {/* Article */}
        <article className="mx-auto max-w-[680px] px-6 pb-28 md:pb-36">
          <div className="space-y-7 md:space-y-8">
            {OPENING.map((p, i) => (
              <Reveal key={i} as="p" amount={0.4} className={paraClass}>
                {p}
              </Reveal>
            ))}
          </div>

          {/* Pull quote */}
          <Reveal as="figure" amount={0.5} className="my-16 text-center md:my-24">
            <div className="mx-auto mb-9 h-px w-12 bg-charcoal/25" />
            <blockquote className="font-serif text-3xl italic leading-[1.3] text-ink md:text-[2.6rem] md:leading-[1.25]">
              &ldquo;I couldn&rsquo;t find clothing that felt the way I wanted it
              to feel.&rdquo;
            </blockquote>
            <div className="mx-auto mt-9 h-px w-12 bg-charcoal/25" />
          </Reveal>

          <div className="space-y-7 md:space-y-8">
            {MIDDLE.map((p, i) => (
              <Reveal key={i} as="p" amount={0.4} className={paraClass}>
                {p}
              </Reveal>
            ))}
          </div>

          {/* Guiding question */}
          <Reveal
            as="p"
            amount={0.5}
            className="my-11 text-center font-serif text-2xl italic text-ink/90 md:my-14 md:text-[1.7rem]"
          >
            Would I genuinely choose to wear this myself?
          </Reveal>

          <div className="space-y-7 md:space-y-8">
            {CLOSING_PARAS.map((p, i) => (
              <Reveal key={i} as="p" amount={0.4} className={paraClass}>
                {p}
              </Reveal>
            ))}
          </div>

          {/* Closing statement */}
          <Reveal as="div" amount={0.5} className="mt-20 text-center md:mt-28">
            <div className="mx-auto mb-10 h-px w-16 bg-charcoal/20" />
            <p className="font-serif text-5xl font-light leading-none text-ink md:text-7xl">
              Made To Be Missed.
            </p>
          </Reveal>
        </article>
      </main>

      <Footer />
    </>
  );
}
