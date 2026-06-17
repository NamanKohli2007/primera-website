import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import ReviewsSection from "@/components/ReviewsSection";
import { essentials, getProduct } from "@/lib/products";
import { ESSENTIALS_REVIEWS } from "@/lib/reviews";

export function generateStaticParams() {
  return essentials.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct("essentials", params.slug);
  if (!product) return { title: "Not Found — PRIMERA" };
  return {
    title: `${product.name} — PRIMERA`,
    description: product.summary,
  };
}

export default function EssentialsProductPage({ params }) {
  const product = getProduct("essentials", params.slug);
  if (!product) notFound();

  return (
    <>
      <Navigation variant="solid" />
      <main className="bg-cream">
        <ProductDetail product={product} />
        <ReviewsSection reviews={ESSENTIALS_REVIEWS} />
      </main>
      <Footer />
    </>
  );
}
