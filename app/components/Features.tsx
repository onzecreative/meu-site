"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Clock, Globe } from "lucide-react";

const getIcon = (i: number) => {
  if (i === 0) return <Clock size={20} className="text-[#E0400C]" />;
  if (i === 1) return <ShieldCheck size={20} className="text-[#E0400C]" />;
  return <Globe size={20} className="text-[#E0400C]" />;
};

const defaultFeatures = [
  {
    title: "Real-Time Tracking",
    desc: "Know exactly where your goods are going at all times with our advanced tracking systems.",
  },
  {
    title: "Industry Experts",
    desc: "Teams that know your requirements down to the smallest detail and regulations.",
  },
  {
    title: "Global Reach",
    desc: "We ensure fast, reliable deliveries across the most challenging international borders.",
  }
];

export default function Features() {
  const [data, setData] = useState<any>({
    title: "Why Leading Businesses Rely on Us",
    items: defaultFeatures,
  });

  useEffect(() => {
    fetch("/api/admin/section/features?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = data?.items && data.items.length > 0 ? data.items : defaultFeatures;

  return (
    <section id="features" className="w-full bg-[#FAFAFA] pt-32 pb-32 border-y border-black/[0.04] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="flex flex-col items-center text-center mb-20">
           <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] mb-8 animate-pulse" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair font-semibold text-[44px] md:text-[56px] text-[#111111] leading-[1.05] tracking-[-0.03em] max-w-[800px]"
            >
              {data?.title ?? "Why Leading Businesses Rely on Us"}
            </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Large Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="w-full aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#E0400C]/10 to-transparent rounded-[40px] overflow-hidden relative shadow-2xl">
              <img src="https://picsum.photos/seed/truck-hero/1000/1000" alt="Why Choose Us" className="w-full h-full object-cover" />
              {/* Pulse Badges Floating on Image */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
                 <div className="w-12 h-12 rounded-full bg-[#E0400C]/20 flex items-center justify-center animate-pulse">
                    <ShieldCheck size={24} className="text-[#E0400C]" />
                 </div>
                 <div>
                    <p className="font-playfair font-bold text-[18px]">100% Safe</p>
                    <p className="text-black/50 text-[13px] font-semibold">ISO 9001 Certified</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right List */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {items.map((feat: any, i: number) => {
              const num = (i + 1).toString().padStart(2, "0");
              return (
                <motion.div
                  key={feat?.title ?? i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group py-10 border-b border-black/[0.08] last:border-0 flex flex-col md:flex-row gap-6 cursor-pointer hover:bg-white/50 -mx-6 px-6 rounded-2xl transition-colors"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(224,64,12,0.2)] transition-all duration-300">
                     {getIcon(i)}
                  </div>

                  <div className="flex-1 flex flex-col items-start pt-1">
                    <h3 className="font-playfair font-semibold text-[26px] md:text-[32px] text-[#111111] leading-[1.1] tracking-[-0.02em] mb-4">
                      {feat?.title ?? ""}
                    </h3>
                    <p className="text-[#666666] text-[16px] md:text-[18px] font-medium leading-[1.6]">
                      {feat?.desc ?? ""}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
