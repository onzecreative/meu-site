"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickFacts from "./components/QuickFacts";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

const DEFAULT_HERO = {
  type: "url",
  videoUrl: "https://framerusercontent.com/modules/assets/NP0sbX2IFOAoZFpm3e8rHkzbWERtiU_lv1cyDTfzBnybTT_Howq0lJ0E0fnyjdTCqMRwI_98S1oOlRR5tNKMnpgY8ab_wOYy0WNg1za9IXHSL3owoQp0QzvgEYKYacBFuei03KaVXToo0k24gdCP67799OuHrWXaBdzxtcbRiBrbZZensQW7Q1yJcgfi8aOmGrwcUiulS7ct7FaD90gfWHQrf5we363JQZb5EAJ_71WE9pT0odIjb2B3x8iE-hsQmZ_MCUbPPfKGzBSjTNRgoFo0qO3EuTgF6r9ZFkpkLwWtL-2-rUgAue5rWKgNidmisUe8g7Pwmhx7PXjENJqNjuyVmwbOwCoIGnThx-w5hu0vEQh-BX6RDdvZQr_pc9DYFKeP83JtZuvyf49g2jcIOxL0U1ydeWOlFl2ykCUcTXkYnyFX6LaN6U6qI5WEy0jgjzbVeWJoDgM4hUYGTYEKqYhY4H2cibAekPKxOuUsvLC3GnVgUxet4egkUg.mp4",
  title: "Precision in Motion.\nLogistics Reimagined.",
  subtitleIndicator: "DRIVEN BY EXCELLENCE.",
  bottomLeftText: "Providing end-to-end supply chain visibility for global enterprises and regional distributors.",
  bottomRightText: "Get a Quote",
  bottomRightUrl: "/contato"
};

export default function Home() {
  const [heroData, setHeroData] = useState(DEFAULT_HERO);

  useEffect(() => {
    // Dynamic Fetch
    fetch("/api/admin/hero")
      .then(r => r.json())
      .then(res => {
        if (res && res.title) setHeroData(res);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero data={heroData} />
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
