"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Label from "../components/ui/Label";
import { Shield, Truck, Globe2, Network, TrendingUp } from "lucide-react";
import FinalCTA from "../components/FinalCTA";
import { getSectionData } from "@/lib/services/section.service";

const DEFAULT_HERO = { title: "Tailored Logistics.", subtitle: "OUR SERVICES", image: "https://picsum.photos/seed/warehouse/1600/900", secondTitle: "For a Global World." };
const DEFAULT_CAPABILITIES = { title: "End-to-End Solutions", description: "Integrated supply chain models designed to reduce overhead and increase speed.", items: [
  { title: "National & International Freight", desc: "From local deliveries to cross-border transport, we offer reliable freight solutions tailored to your schedule.", image: "https://picsum.photos/seed/trucks2/1200/800", bullets: ["Multi-modal shipping", "Customs-ready", "Door-to-door delivery"] },
  { title: "Regional Distribution", desc: "Efficient short-haul transit ensuring that localized supply chains run seamlessly without costly delays.", image: "https://picsum.photos/seed/boxes/1200/800", bullets: ["Last-mile delivery", "Warehousing", "Inventory management"] },
  { title: "Cold Chain Logistics", desc: "Temperature-controlled transport to keep sensitive goods strictly within compliance from origin to destination.", image: "https://picsum.photos/seed/ice/1200/800", bullets: ["HACCP compliant", "Real-time temperature tracking", "Dedicated pharmaceutical fleet"] },
] };
const DEFAULT_PROCESS = { title: "The Process", items: [
  { num: "01", name: "Discovery", desc: "We assess your needs and KPIs." },
  { num: "02", name: "Solution Design", desc: "We build a custom logistics plan." },
  { num: "03", name: "Onboarding", desc: "We integrate your systems and team." },
  { num: "04", name: "Operations", desc: "We execute with full visibility." },
  { num: "05", name: "Optimization", desc: "We continuously improve performance." },
] };

export default function ServicosPage() {
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [capabilities, setCapabilities] = useState(DEFAULT_CAPABILITIES);
  const [process, setProcess] = useState(DEFAULT_PROCESS);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    getSectionData("servicos-hero", DEFAULT_HERO).then(setHero);
    getSectionData("servicos-capabilities", DEFAULT_CAPABILITIES).then(setCapabilities);
    getSectionData("servicos-process", DEFAULT_PROCESS).then(setProcess);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="w-full pt-40 pb-24 md:pb-32 px-[16px] md:px-[40px] max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            className="text-[#1A1A1A] max-w-[600px] leading-[0.95]"
          >
            {hero.title}
          </motion.h1>
          <div className="mt-8 md:mt-0">
            <Label text={hero.subtitle} className="mb-2" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
          className="w-full h-[400px] md:h-[600px] rounded-[16px] overflow-hidden mb-16"
        >
          <img src={hero.image} alt={hero.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.25 }}
            className="w-full md:w-1/2 text-[#1A1A1A] mt-8 md:mt-0 text-[36px] md:text-[56px] leading-[1.1]"
          >
            {hero.secondTitle}
          </motion.h2>
        </div>
      </section>

      <section className="w-full bg-[#1C1817] py-[120px] md:py-[160px] text-white">
        <div className="max-w-7xl mx-auto px-[16px] md:px-[40px] flex flex-col md:flex-row gap-16 md:gap-8 relative">
          <div className="w-full md:w-[40%] flex flex-col relative">
            <div className="md:sticky md:top-32 flex flex-col items-start pr-0 md:pr-12">
              <Label text="Core Capabilities" />
              <h2 className="text-white mb-6 max-w-[400px]">{capabilities.title}</h2>
              <p className="text-white/70 max-w-[340px]">{capabilities.description}</p>
            </div>
          </div>

          <div className="w-full md:w-[60%] flex flex-col gap-24">
            {capabilities.items.map((service:any, i:number) => {
              const num = (i + 1).toString().padStart(2, "0");
              return (
                <div key={i} className="flex flex-col items-start w-full group">
                  <Label text={num} />
                  <h3 className="text-white mb-8 leading-tight">{service.title}</h3>
                  <div className="w-full overflow-hidden rounded-[16px] bg-[#2a130c] mb-8">
                    <img src={service.image} alt={service.title} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <p className="text-white/70 text-[18px] mb-8">{service.desc}</p>
                  <ul className="flex flex-col gap-3">
                    {service.bullets?.map((bullet:string, j:number) => (
                      <li key={j} className="flex items-center gap-3 text-white/90">
                        <div className="w-1.5 h-1.5 bg-primary rounded-[56px]" />
                        <span className="font-bold">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-[120px] md:py-[160px]">
        <div className="max-w-7xl mx-auto px-[16px] md:px-[40px] flex flex-col items-center">
          <Label text="HOW IT WORKS" />
          <h2 className="text-[#1A1A1A] mb-24 md:mb-32">{process.title || "The Process"}</h2>

          <div className="relative w-full max-w-4xl flex flex-col">
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#CFCAC9] -translate-x-[1px]" />

            {process.items.map((step:any, i:number) => {
              const isEven = i % 2 !== 0;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", bounce: 0.25, duration: 0.6 }} className={`relative flex w-full mb-16 md:mb-24 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="absolute left-[24px] md:left-1/2 top-0 w-3 h-3 bg-primary rounded-[56px] -translate-x-1.5 md:-translate-x-1.5 mt-2" />
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 flex flex-col ${isEven ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right md:items-end'}`}>
                    <Label text={step.num} className={`!mb-4 ${!isEven && 'md:flex-row-reverse'}`} />
                    <h3 className="text-[#1A1A1A] text-[28px] mb-3">{step.name}</h3>
                    <p className={`text-[#363130] text-[16px] max-w-[300px] ${!isEven && 'md:text-right'}`}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
