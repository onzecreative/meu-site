"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickFacts from "./components/QuickFacts";
import ServicesSticky from "./components/ServicesSticky";
import Industries from "./components/Industries";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

const DEFAULT_HERO = {
  type: "image",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
  title: "Seu negócio.\nAcelerado no digital.",
  subtitleIndicator: "ECOSSISTEMA COMPLETO DE MARKETING DIGITAL",
  bottomLeftText:
    "Soluções avançadas de gestão, automações com IA, consultoria estratégica e desenvolvimento de websites para levar sua empresa ao próximo nível.",
  bottomRightText: "Fale conosco",
  bottomRightUrl: "/contato",
};

export default function Home() {
  const [heroData, setHeroData] = useState(DEFAULT_HERO);

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((res) => { if (res?.title) setHeroData(res); })
      .catch(console.error);
  }, []);

  return (
    <main className="relative min-h-screen" style={{ background: "#030305" }}>
      <Navbar />
      <Hero data={heroData} />
      <QuickFacts />
      <ServicesSticky />
      <Industries />
      <Features />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
