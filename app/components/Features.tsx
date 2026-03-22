"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";

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

  return (
    <section id="features" className="w-full bg-[#FAFAFA] pt-32 pb-32 border-y border-black/[0.04]">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row gap-16 md:gap-24" ref={ref}>
        
        {/* Left Stick Header */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] mb-8" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[44px] md:text-[56px] text-[#111111] leading-[1.05] tracking-[-0.03em]"
          >
            {data?.title ?? "Why Leading Businesses Rely on Us"}
          </motion.h2>
        </div>

        {/* Right List */}
        <div className="w-full md:w-2/3 flex flex-col">
          {(data?.items || defaultFeatures).map((feat: any, i: number) => {
            const num = (i + 1).toString().padStart(2, "0");
            return (
              <motion.div
                key={feat?.title ?? i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t border-black/[0.08] py-12 flex flex-col md:flex-row gap-8 md:gap-16 cursor-pointer"
              >
                {/* Number */}
                <div className="font-['Plus_Jakarta_Sans'] font-semibold text-[24px] text-black/20 group-hover:text-[#E0400C] transition-colors duration-300 w-12">
                  {num}
                </div>

                {/* Text Context */}
                <div className="flex-1 flex flex-col items-start">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[28px] md:text-[36px] text-[#111111] leading-[1.1] tracking-[-0.02em] mb-4">
                    {feat?.title ?? ""}
                  </h3>
                  <p className="text-[#666666] text-[16px] md:text-[18px] font-medium leading-[1.6] mb-8 max-w-[480px]">
                    {feat?.desc ?? ""}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#E0400C] group-hover:border-[#E0400C] transition-colors duration-300">
                      <IconArrowRight size={18} className="text-[#111111] group-hover:text-white" />
                    </div>
                    <span className="text-[#111111] font-semibold text-[15px]">
                      View Feature
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
