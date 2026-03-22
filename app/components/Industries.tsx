"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Label from "./ui/Label";
import Button from "./ui/Button";

const defaultIndustries = [
  {
    title: "Food & Beverage",
    image: "https://picsum.photos/seed/food/800/600",
  },
  {
    title: "Pharmaceutical & Medical",
    image: "https://picsum.photos/seed/medy/800/600",
  },
  {
    title: "Industrial & Manufacturing",
    image: "https://picsum.photos/seed/industry/800/600",
  },
  {
    title: "Electronics & Technology",
    image: "https://picsum.photos/seed/techs/800/600",
  },
  {
    title: "Retail & E-Commerce",
    image: "https://picsum.photos/seed/retail/800/600",
  },
];

export default function Industries() {
  const [data, setData] = useState<any>({
    title: "Built for Critical Industries.",
    subtitle: "Every sector has specialized routing requirements. We adapt to all.",
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
    <section id="industries" className="w-full bg-[#1A0500] py-24 md:py-32 relative overflow-hidden">
      
      {/* Decorative SVG Branch Pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-[50%] opacity-20 pointer-events-none">
        <svg viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice" className="w-full h-full">
          <path d="M400 0C300 200 200 400 300 800" stroke="#E8431A" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M300 200C250 300 280 400 400 500" stroke="#E8431A" strokeWidth="1.5" />
          <path d="M250 300C100 400 150 600 400 700" stroke="#E8431A" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-8" ref={ref}>
        
        {/* Left Column (Sticky) */}
        <div className="w-full md:w-[40%] flex flex-col relative">
          <div className="md:sticky md:top-32 flex flex-col items-start pr-0 md:pr-12">
            <Label text="Industries" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white mb-6 max-w-[400px]"
            >
              {data?.title ?? "Built for Critical Industries."}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/70 max-w-[340px] mb-10"
            >
              {data?.subtitle ?? "Every sector has specialized routing requirements. We adapt to all."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Button variant="outline" text="Know Our Industries" />
            </motion.div>
          </div>
        </div>

        {/* Right Column (Stacked Cards) */}
        <div className="w-full md:w-[60%] flex flex-col gap-8 md:gap-12">
          {items.map((ind: any, i: number) => (
            <motion.div
              key={ind?.title ?? i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group cursor-pointer flex flex-col bg-[#2a130c] rounded-2xl overflow-hidden card-hover"
            >
              {/* Image top */}
              <div className="w-full h-[300px] md:h-[400px] bg-[#111] overflow-hidden relative">
                <img 
                  src={ind?.image || defaultIndustries[i]?.image} 
                  alt={ind?.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>

              {/* Text Content Bottom */}
              <div className="flex flex-col items-start p-6 md:p-8">
                <h3 className="text-white mb-2 leading-tight">
                  {ind?.title ?? ""}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
