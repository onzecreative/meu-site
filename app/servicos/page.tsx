"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Label from "../components/ui/Label";
import { Shield, Truck, Globe2, Network, TrendingUp } from "lucide-react";
import FinalCTA from "../components/FinalCTA";

// Shared data from home for Core Capabilities
const coreCapabilities = [
  {
    title: "National & International Freight",
    desc: "From local deliveries to cross-border transport, we offer reliable freight solutions tailored to your schedule.",
    image: "https://picsum.photos/seed/trucks2/1200/800",
    bullets: ["Multi-modal shipping", "Customs-ready", "Door-to-door delivery"],
  },
  {
    title: "Regional Distribution",
    desc: "Efficient short-haul transit ensuring that localized supply chains run seamlessly without costly delays.",
    image: "https://picsum.photos/seed/boxes/1200/800",
    bullets: ["Last-mile delivery", "Warehousing", "Inventory management"],
  },
  {
    title: "Cold Chain Logistics",
    desc: "Temperature-controlled transport to keep sensitive goods strictly within compliance from origin to destination.",
    image: "https://picsum.photos/seed/ice/1200/800",
    bullets: ["HACCP compliant", "Real-time temperature tracking", "Dedicated pharmaceutical fleet"],
  },
];

const apartFeatures = [
  { icon: Shield, name: "Certified Reliability", desc: "ISO 9001 processes & time-definite performance." },
  { icon: Truck, name: "Own Fleet + Trusted Partners", desc: "Flexibility and control for consistent delivery." },
  { icon: Globe2, name: "Dual-Hub Operations", desc: "Rotterdam & Houston coverage ensures global reach and regional precision." },
  { icon: Network, name: "Client-Centric Integrations", desc: "API-based tracking, order management & EDI support." },
  { icon: TrendingUp, name: "Scalable for Growth", desc: "Modular service plans for evolving business needs." },
];

const processSteps = [
  { num: "01", name: "Discovery", desc: "We assess your needs and KPIs." },
  { num: "02", name: "Solution Design", desc: "We build a custom logistics plan." },
  { num: "03", name: "Onboarding", desc: "We integrate your systems and team." },
  { num: "04", name: "Operations", desc: "We execute with full visibility." },
  { num: "05", name: "Optimization", desc: "We continuously improve performance." },
];

export default function ServicosPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const apartRef = useRef(null);
  const apartInView = useInView(apartRef, { once: true, margin: "-100px" });

  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SERVIÇOS --- */}
      <section className="w-full pt-40 pb-24 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#1A1A1A] max-w-[600px] leading-[0.95]"
          >
            Tailored Logistics.
          </motion.h1>
          <div className="mt-8 md:mt-0">
            <Label text="OUR SERVICES" className="mb-2" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-16"
        >
          <img src="https://picsum.photos/seed/warehouse/1600/900" alt="LogiNord Warehouse" className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2 text-[#1A1A1A] mt-8 md:mt-0 text-[36px] md:text-[56px] leading-[1.1]"
          >
            For a Global World.
          </motion.h2>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="w-full bg-[#1A0500] py-24 md:py-32 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-8 relative">
          
          <div className="w-full md:w-[40%] flex flex-col relative">
            <div className="md:sticky md:top-32 flex flex-col items-start pr-0 md:pr-12">
              <Label text="Core Capabilities" />
              <h2 className="text-white mb-6 max-w-[400px]">End-to-End Solutions</h2>
              <p className="text-white/70 max-w-[340px]">Integrated supply chain models designed to reduce overhead and increase speed.</p>
            </div>
          </div>

          <div className="w-full md:w-[60%] flex flex-col gap-24">
            {coreCapabilities.map((service, i) => {
              const num = (i + 1).toString().padStart(2, "0");
              return (
                <div key={i} className="flex flex-col items-start w-full group">
                  <Label text={num} />
                  <h3 className="text-white mb-8 leading-tight">{service.title}</h3>
                  <div className="w-full overflow-hidden rounded-2xl bg-[#2a130c] mb-8">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  <p className="text-white/70 text-[18px] mb-8">{service.desc}</p>
                  <ul className="flex flex-col gap-3">
                    {service.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-3 text-white/90">
                        <div className="w-1.5 h-1.5 bg-[#E8431A] rounded-full" />
                        <span className="font-bold">{bullet}:</span> <span className="text-white/60 text-[15px]">Included in package</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* --- WHAT SETS US APART --- */}
      <section className="w-full bg-[#F2F0EB] py-24 md:py-32 relative overflow-hidden" ref={apartRef}>
        {/* Blurred BG */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.08]"
          style={{ backgroundImage: "url('https://picsum.photos/seed/blur_truck/1920/1080')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px)" }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-12">
          
          {/* Left Column */}
          <div className="w-full md:w-[35%] flex flex-col items-start">
            <Label text="FUELING EVERY MOVE" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={apartInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#1A1A1A]"
            >
              What Sets Us Apart:
            </motion.h2>
          </div>

          {/* Right Column List */}
          <div className="w-full md:w-[65%] flex flex-col divide-y divide-[#E0DDD8]">
            {apartFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={apartInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-start md:items-center py-10 gap-6 md:gap-8"
              >
                <div className="w-10 flex shrink-0 justify-center">
                  <feat.icon className="text-[#E8431A]" size={28} />
                </div>
                <div className="w-full md:w-[35%] flex shrink-0">
                  <h4 className="text-[#1A1A1A] font-bold text-[20px] leading-tight">{feat.name}</h4>
                </div>
                <div className="w-full flex">
                  <p className="text-[#1A1A1A]/60 text-[16px]">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- THE PROCESS --- */}
      <section className="w-full bg-white py-24 md:py-32" ref={processRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <Label text="HOW IT WORKS" />
          <h2 className="text-[#1A1A1A] mb-24 md:mb-32">The Process</h2>

          <div className="relative w-full max-w-4xl flex flex-col">
            {/* Center Dashed Line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#D0CEC9] -translate-x-[1px]" />

            {processSteps.map((step, i) => {
              const isEven = i % 2 !== 0; // 0-indexed, so 0 is left, 1 is right
              // For Mobile: Always Left (Text Right of line)
              // For Desktop: Alternating Left / Right
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex w-full mb-16 md:mb-24 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  {/* Central Dot */}
                  <div className="absolute left-[24px] md:left-1/2 top-0 w-3 h-3 bg-[#E8431A] rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-2" />
                  
                  {/* Content Container */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 flex flex-col ${isEven ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right md:items-end'}`}>
                    <Label text={step.num} className={`!mb-4 ${!isEven && 'md:flex-row-reverse'}`} />
                    <h3 className="text-[#1A1A1A] text-[28px] mb-3">{step.name}</h3>
                    <p className={`text-[#1A1A1A]/60 text-[16px] max-w-[300px] ${!isEven && 'md:text-right'}`}>{step.desc}</p>
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
