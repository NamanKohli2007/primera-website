import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Collection from "@/components/Collection";
import TouchTest from "@/components/TouchTest";
import WhyPrimera from "@/components/WhyPrimera";
import FounderStory from "@/components/FounderStory";
import FabricExplorer from "@/components/FabricExplorer";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Collection />
        <TouchTest />
        <WhyPrimera />
        <FounderStory />
        <FabricExplorer />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
