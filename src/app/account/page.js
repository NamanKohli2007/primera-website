import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AccountView from "@/components/AccountView";

export const metadata = {
  title: "My Account — PRIMERA",
};

export default function AccountPage() {
  return (
    <>
      <Navigation variant="solid" />
      <main className="bg-cream">
        <AccountView />
      </main>
      <Footer />
    </>
  );
}
