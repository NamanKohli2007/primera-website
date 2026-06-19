import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { motion } from "@/lib/products";

export const metadata = {
  title: "Shop Motion — PRIMERA",
  description:
    "Primera Motion — plant-based performance essentials engineered for movement.",
};

export default function MotionPage() {
  return (
    <>
      <Navigation />

      <main className="bg-[#0C1731]">
        {/* Header */}
        <section className="relative overflow-hidden px-6 pb-12 pt-40 md:px-10 md:pb-16 md:pt-56">
          {/* Soft energetic glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,_rgba(245,242,238,0.10),_transparent_55%)]" />

          <div className="relative mx-auto max-w-7xl">
            <Reveal as="p" className="eyebrow mb-5 text-[#C0DAE7]/70">
              Engineered for Movement
            </Reveal>
            <Reveal
              as="h1"
              delay={0.05}
              className="wordmark text-6xl leading-[0.95] text-cream md:text-8xl"
            >
              PRIMERA MOTION
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-[#C0DAE7]/80"
            >
              Performance essentials built from plant-based technical fabrics.
              Breathable, durable, and quietly relentless — made to move the way
              you do.
            </Reveal>
          </div>
        </section>

        {/* Product grid */}
        <section className="relative px-6 pb-28 md:px-10 md:pb-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:mx-auto md:max-w-3xl md:grid-cols-2 md:gap-x-7">
              {motion.map((product, i) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={i}
                  surface="dark"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
