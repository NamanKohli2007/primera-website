import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FaqView from "@/components/FaqView";

export const metadata = {
  title: "FAQ — PRIMERA",
  description:
    "Everything you need to know about Primera and our fabrics — Modal and Bamboo blends, care, sizing, and delivery.",
};

export default function FaqPage() {
  return (
    <>
      <Navigation variant="solid" />
      <main className="bg-cream">
        {/* Hero */}
        <section className="px-6 pb-10 pt-36 text-center md:pb-16 md:pt-48">
          <h1 className="font-serif text-5xl font-light leading-none text-ink md:text-7xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-charcoal/60 md:text-base">
            Everything you need to know about Primera and our fabrics
          </p>
        </section>

        <FaqView />
      </main>
      <Footer />
    </>
  );
}
