import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartView from "@/components/CartView";

export const metadata = {
  title: "Your Bag — PRIMERA",
};

export default function CartPage() {
  return (
    <>
      <Navigation variant="solid" />
      <main className="bg-cream">
        <CartView />
      </main>
      <Footer />
    </>
  );
}
