import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { motion, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return motion.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct("motion", params.slug);
  if (!product) return { title: "Not Found — PRIMERA" };
  return {
    title: `${product.name} — PRIMERA`,
    description: product.summary,
  };
}

export default function MotionProductPage({ params }) {
  const product = getProduct("motion", params.slug);
  if (!product) notFound();

  return (
    <>
      <Navigation variant="solid" />
      <main className="bg-cream">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
