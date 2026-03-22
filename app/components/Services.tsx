"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const defaultServices = [
  {
    title: "Air Route",
    description: "Covering global destinations with speed and reliability. Ensure your cargo reaches anywhere in the world seamlessly.",
    number: "01",
    linkText: "See Detail",
    image: "https://picsum.photos/seed/air/800/800",
  },
  {
    title: "Sea Route",
    description: "Delivering across continents. Economical and massive scale transport for non-perishable long-distance freight.",
    number: "02",
    linkText: "See Detail",
    image: "https://picsum.photos/seed/sea/800/800",
  },
  {
    title: "Land Route",
    description: "Over the road transportation. Flexible fleets serving regional nodes precisely on schedule.",
    number: "03",
    linkText: "See Detail",
    image: "https://picsum.photos/seed/land/800/800",
  },
];

export default function Services() {
  const [data, setData] = useState<any>({
    title: "Logistics that fit your needs.",
    items: defaultServices,
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    fetch("/api/admin/section/services?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = data?.items || defaultServices;

  return (
    <section id="services" className="w-full bg-[#FAFAFA] pt-24 pb-32">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-start mb-20">
           <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair font-semibold text-[40px] md:text-[56px] text-[#111111] leading-[1.1] tracking-[-0.03em] max-w-[600px]"
          >
            {data?.title ?? "Logistics that fit your needs."}
          </motion.h2>
        </div>

        {/* Split Accordion Layout */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 min-h-[500px]">
          
          {/* Left: Accordion List */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            {items.map((service: any, i: number) => {
              const isActive = activeIdx === i;
              const num = (i + 1).toString().padStart(2, "0");
              return (
                <div
                  key={service?.title ?? i}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`group flex flex-col border-b border-black/10 pb-6 cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                >
                  <div className="flex items-center gap-6 mt-6">
                    <span className="font-playfair font-semibold text-[20px] text-[#E0400C] w-8">
                      {num}
                    </span>
                    <h3 className="font-playfair font-semibold text-[32px] md:text-[40px] text-[#111111] leading-[1.1] tracking-[-0.02em]">
                      {service?.title ?? ""}
                    </h3>
                  </div>
                  
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-[56px] pt-4">
                          <p className="text-[#666666] text-[16px] md:text-[18px] font-medium leading-[1.5] mb-6 max-w-[400px]">
                            {service?.description ?? ""}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-[#111111] font-bold text-[15px] tracking-wide">
                              {service?.linkText || "See Detail"}
                            </span>
                            <div className="w-10 h-10 rounded-full border border-[#E0400C] flex items-center justify-center bg-[#E0400C] shadow-lg shadow-[#E0400C]/20 cursor-pointer hover:bg-[#ff551b] hover:scale-105 transition-all">
                              <ArrowRight size={18} className="text-white" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Image Reveal */}
          <div className="w-full md:w-1/2 h-[450px] md:h-auto relative rounded-3xl overflow-hidden bg-black/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={items[activeIdx]?.image || `https://picsum.photos/seed/service${activeIdx}/800/800`}
                alt="Service showcase"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
