import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { essentials } from "@/lib/products";

export const metadata = {
  title: "Shop Essentials — PRIMERA",
  description:
    "The Primera Essentials collection — everyday pieces crafted from premium plant-based fibres.",
};

export default function ShopPage() {
  return (
    <>
      <Navigation variant="solid" />

      <main className="bg-cream">
        {/* Header */}
        <section className="px-6 pb-12 pt-36 md:px-10 md:pb-16 md:pt-48">
          <div className="mx-auto max-w-7xl">
            <Reveal as="p" className="eyebrow mb-5">
              Primera Essentials
            </Reveal>
            <Reveal
              as="h1"
              delay={0.05}
              className="font-serif text-5xl font-light leading-none text-ink md:text-7xl"
            >
              The Essentials
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-charcoal/65"
            >
              The pieces you reach for most, crafted from premium plant-based
              fibres. Made to be worn, washed, and worn again.
            </Reveal>
          </div>
        </section>

        {/* Product grid */}
        <section className="px-6 pb-28 md:px-10 md:pb-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-7">
              {essentials.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
