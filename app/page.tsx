import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickFacts from "./components/QuickFacts";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuickFacts />
      <Services />
      <Industries />
      <Features />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
