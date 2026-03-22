"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const defaultIndustries = [
  {
    title: "Medical & Healthcare",
    desc: "Precision and care for critical deliveries.",
    image: "https://picsum.photos/seed/medy/800/600",
  },
  {
    title: "Automotives",
    desc: "Handling large scale industrial transport.",
    image: "https://picsum.photos/seed/trucks/800/600",
  },
  {
    title: "Technology",
    desc: "Speed and security for delicate electronics.",
    image: "https://picsum.photos/seed/techs/800/600",
  },
];

export default function Industries() {
  const [data, setData] = useState<any>({
    title: "Built for Critical Industries.",
    items: defaultIndustries,
  });

  useEffect(() => {
    fetch("/api/admin/section/industries?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = data?.items && data.items.length > 0 ? data.items : defaultIndustries;

  return (
    <section id="industries" className="w-full bg-white pt-32 pb-32">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] mb-8" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair font-semibold text-[40px] md:text-[56px] text-[#111111] leading-[1.1] tracking-[-0.03em] max-w-[800px]"
          >
            {data?.title ?? "Built for Critical Industries."}
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((ind: any, i: number) => (
            <motion.div
              key={ind?.title ?? i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image box/Placeholder */}
              <div className="w-full aspect-[4/3] bg-[#FAFAFA] rounded-3xl mb-8 overflow-hidden relative shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={ind?.image || defaultIndustries[i]?.image} 
                  alt={ind?.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-start px-2">
                <h3 className="font-playfair font-semibold text-[26px] md:text-[32px] text-[#111111] leading-[1.2] tracking-[-0.02em] mb-4">
                  {ind?.title ?? ""}
                </h3>
                <p className="text-[#666666] text-[16px] md:text-[18px] font-medium leading-[1.5] mb-8">
                  {ind?.desc ?? ""}
                </p>
                
                <div className="flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
                  <span className="text-[#111111] font-bold text-[15px] tracking-wide">
                    View details
                  </span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 group-hover:bg-[#E0400C] transition-colors duration-300">
                    <ArrowRight size={18} className="text-[#111111] group-hover:text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
