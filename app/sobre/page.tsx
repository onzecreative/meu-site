"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Label from "../components/ui/Label";
import { ArrowUpRight, ArrowRight, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";

const timelineData = [
  { year: 2010, title: "The Beginning", desc: "LogiNord was founded with a single truck, delivering regional supplies across Scandinavia. Built on a foundation of reliability and hard work.", img: "https://picsum.photos/seed/truck1/800/500" },
  { year: 2013, title: "European Expansion", desc: "Expanded our fleet to 50 trucks and opened our first major hub in Rotterdam, connecting mainland Europe.", img: "https://picsum.photos/seed/truck2/800/500" },
  { year: 2017, title: "Tech Integration", desc: "Launched our proprietary tracking system and client portal, providing 100% transparency to all our partners.", img: "https://picsum.photos/seed/truck3/800/500" },
  { year: 2021, title: "Global Reach", desc: "Entered the US market with our Houston distribution center, establishing bi-continental capabilities.", img: "https://picsum.photos/seed/truck4/800/500" },
  { year: 2025, title: "Sustainable Future", desc: "Investing heavily in alternative fuels and electric fleets to drive the future of green logistics forward.", img: "https://picsum.photos/seed/truck5/800/500" },
];

const teamData = [
  { name: "Johan Andersson", role: "Chief Executive Officer", img: "https://i.pravatar.cc/600?u=johan" },
  { name: "Maria Rossi", role: "Head of Global Operations", img: "https://i.pravatar.cc/600?u=maria" },
  { name: "David Chen", role: "Chief Technology Officer", img: "https://i.pravatar.cc/600?u=david" },
  { name: "Emma Thompson", role: "VP of Client Success", img: "https://i.pravatar.cc/600?u=emma" },
];

export default function SobrePage() {
  const [activeYear, setActiveYear] = useState(2021);
  const activeTimeline = timelineData.find((t) => t.year === activeYear) || timelineData[0];

  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  // UseInView refs
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SOBRE --- */}
      <section className="w-full pt-40 pb-24 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto" ref={heroRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#1A1A1A] max-w-[600px] leading-[0.95]"
          >
            Driven by Purpose.
          </motion.h1>
          <div className="mt-8 md:mt-0">
            <Label text="ABOUT US" className="mb-2" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-16"
        >
          <img src="https://picsum.photos/seed/highway/1600/900" alt="LogiNord Highway" className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-1/3 text-[#1A1A1A]/70 text-[18px]"
          >
            Since our inception, we have been committed to setting the standard for precision in the logistics sector. We don't just move freight; we navigate complexities to ensure your business never stops moving.
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2 text-[#1A1A1A] mt-8 md:mt-0"
          >
            Built on Trust.
          </motion.h2>
        </div>
      </section>

      {/* --- TIMELINE HISTÓRIA --- */}
      <section className="w-full bg-[#F2F0EB] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-[#1A1A1A] mb-16 md:mb-24">Our History.</h2>
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">
            {/* Left Column - Years */}
            <div className="w-full md:w-1/3 flex flex-row flex-wrap md:flex-col gap-6 md:gap-10 relative">
              {/* Desktop vertical connecting line */}
              <div className="hidden md:block absolute left-[3px] top-4 bottom-4 w-[2px] bg-[#E0DDD8]" />
              
              {timelineData.map((item) => {
                const isActive = item.year === activeYear;
                return (
                  <div key={item.year} className="relative flex items-center group cursor-pointer" onClick={() => setActiveYear(item.year)}>
                    {/* The Dot & Line Indicator */}
                    <div className="hidden md:flex absolute -left-[14px] items-center">
                      <div className={`w-2 h-2 rounded-full z-10 transition-colors duration-300 ${isActive ? 'bg-[#E8431A] ring-4 ring-[#E8431A]/20' : 'bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A]/40'}`} />
                      <div className={`h-[2px] transition-all duration-500 bg-[#E8431A] ${isActive ? 'w-16' : 'w-0'}`} />
                    </div>
                    
                    <span className={`transition-all duration-300 font-figtree font-extrabold md:ml-12 ${isActive ? 'text-[40px] md:text-[56px] text-[#1A1A1A]' : 'text-[24px] md:text-[32px] text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60'}`}>
                      {item.year}
                    </span>
                    {isActive && <div className="ml-4 md:hidden"><Label text="YEAR" className="!mb-0" /></div>}
                  </div>
                );
              })}
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col"
                >
                  <h3 className="text-[#1A1A1A] text-[36px] md:text-[48px] mb-6">{activeTimeline.title}</h3>
                  <p className="text-[#1A1A1A]/70 text-[18px] mb-12 max-w-[500px]">{activeTimeline.desc}</p>
                  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-200">
                    <img src={activeTimeline.img} alt={activeTimeline.title} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSÃO VISÃO VALORES --- */}
      <section className="w-full bg-[#FAFAFA] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <Label text="What Drives Us." />
          <div className="w-full flex flex-col mt-12 divide-y divide-[#1A1A1A]/10 border-t border-b border-[#1A1A1A]/10">
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 py-12 md:py-16 items-start">
              <div className="flex items-center gap-4 w-full md:w-1/3 shrink-0">
                <ArrowRight className="text-[#E8431A]" size={28} />
                <span className="font-bold text-[24px] text-[#1A1A1A]">Our Mission</span>
              </div>
              <p className="text-[#1A1A1A]/70 text-[18px]">To empower businesses by engineering and executing the most reliable, transparent, and seamless freight solutions across borders.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-16 py-12 md:py-16 items-start">
              <div className="flex items-center gap-4 w-full md:w-1/3 shrink-0">
                <ArrowRight className="text-[#E8431A]" size={28} />
                <span className="font-bold text-[24px] text-[#1A1A1A]">Our Vision</span>
              </div>
              <p className="text-[#1A1A1A]/70 text-[18px]">To become the indisputable logistics partner for high-stakes industries, pioneering the transition into sustainable multi-modal transport.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-16 py-12 md:py-16 items-start">
              <div className="flex items-center gap-4 w-full md:w-1/3 shrink-0">
                <ArrowRight className="text-[#E8431A]" size={28} />
                <span className="font-bold text-[24px] text-[#1A1A1A]">Our Values</span>
              </div>
              <p className="text-[#1A1A1A]/70 text-[18px]">Uncompromising Safety, Radical Transparency, Client-Centric Adaptation, and Relentless Execution.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- LOCALIZAÇÕES --- */}
      <section className="w-full bg-[#EFECE6] py-24 md:py-32 relative overflow-hidden flex justify-center items-center min-h-[800px]">
        <div className="absolute top-24 z-10 flex flex-col items-center pointer-events-none">
          <Label text="Our Locations" />
        </div>

        {/* Decorative SVG Map Background */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none flex justify-center items-center overflow-hidden">
          <svg viewBox="0 0 1000 500" fill="none" className="w-[1200px] max-w-none text-[#1A1A1A]">
            <path d="M200 150 Q250 100 300 150 T400 150 T500 200 T600 150 T700 150 T800 200" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 15" />
            <path d="M100 250 Q150 300 200 250 T300 250 T400 200 T500 250 T600 280 T700 250 T800 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 15" />
            <path d="M300 350 Q350 400 400 350 T500 350 T600 300 T700 350 T800 350" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 15" />
          </svg>
        </div>

        {/* Interactive Dots on relative wrapper */}
        <div className="relative w-full max-w-5xl h-[500px] z-20">
          
          {/* Node 1: Rotterdam */}
          <div className="absolute top-[30%] right-[35%]">
            <button 
              onMouseEnter={() => setActiveLocation('rotterdam')}
              onMouseLeave={() => setActiveLocation(null)}
              className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
            >
              <div className="absolute inset-0 bg-[#E8431A] rounded-full animate-ping opacity-20" />
              <div className="w-4 h-4 bg-[#E8431A] rounded-full ring-4 ring-white shadow-lg" />
            </button>
            <AnimatePresence>
              {activeLocation === 'rotterdam' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[280px] bg-white rounded-2xl shadow-xl p-4 pointer-events-none"
                >
                  <img src="https://picsum.photos/seed/rotterdam/400/200" className="w-full h-[120px] object-cover rounded-xl mb-4" />
                  <h4 className="font-bold text-[#1A1A1A] mb-1">Rotterdam, NL</h4>
                  <p className="text-[14px] text-[#1A1A1A]/70">Our European Headquarters and main cross-docking terminal.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Node 2: Houston */}
          <div className="absolute bottom-[40%] left-[20%]">
            <button 
              onMouseEnter={() => setActiveLocation('houston')}
              onMouseLeave={() => setActiveLocation(null)}
              className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
            >
              <div className="absolute inset-0 bg-[#E8431A] rounded-full animate-ping opacity-20" />
              <div className="w-4 h-4 bg-[#E8431A] rounded-full ring-4 ring-white shadow-lg" />
            </button>
            <AnimatePresence>
              {activeLocation === 'houston' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[280px] bg-white rounded-2xl shadow-xl p-4 pointer-events-none"
                >
                  <img src="https://picsum.photos/seed/houston/400/200" className="w-full h-[120px] object-cover rounded-xl mb-4" />
                  <h4 className="font-bold text-[#1A1A1A] mb-1">Houston, TX, USA</h4>
                  <p className="text-[14px] text-[#1A1A1A]/70">American hub specializing in industrial and oil logistics.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* --- TIME --- */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start">
          <Label text="People You Can Rely On." />
          <h2 className="text-[#1A1A1A] mb-16">The Leadership.</h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {teamData.map((member, i) => (
              <div key={i} className="group relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden bg-[#F2F0EB]">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1A1A1A] text-[20px]">{member.name}</span>
                    <span className="text-[#1A1A1A]/60 text-[15px]">{member.role}</span>
                  </div>
                  <a href="#" className="w-12 h-12 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#E8431A] hover:text-white hover:border-[#E8431A] transition-colors text-[#1A1A1A]">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CERTIFICAÇÕES --- */}
      <section className="w-full bg-[#1A1A1A] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-12">
          
          <div className="w-full md:w-[40%] flex flex-col">
            <Label text="Certified. Verified. Compliant." />
            <h2 className="text-white mb-6">Our Accreditations</h2>
            <p className="text-white/60">We operate under the strictest international guidelines to ensure the safety and security of your freights globally.</p>
          </div>

          <div className="w-full md:w-[60%] flex flex-col gap-6">
            {[
              { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Quality Management Systems certified across all hubs." },
              { icon: CheckCircle2, title: "HACCP Compliance", desc: "Fully certified for temperature-controlled food and pharma transit." },
              { icon: ShieldCheck, title: "AEO Certified", desc: "Authorized Economic Operator status for expedited customs." }
            ].map((cert, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl border border-white/10 bg-white/5 items-start">
                <div className="text-[#E8431A] p-4 rounded-full bg-white/10 shrink-0">
                  <cert.icon size={28} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-bold text-[20px] mb-2">{cert.title}</h4>
                  <p className="text-white/60">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
