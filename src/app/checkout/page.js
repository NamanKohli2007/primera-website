import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CheckoutView from "@/components/CheckoutView";

export const metadata = {
  title: "Checkout — PRIMERA",
};

export default function CheckoutPage() {
  return (
    <>
      <Navigation variant="solid" />
      <main className="bg-cream">
        <CheckoutView />
      </main>
      <Footer />
    </>
  );
}
