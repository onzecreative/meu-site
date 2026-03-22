"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const defaultStats = [
  { number: "96.2%", label: "On-Time Delivery Rate.", sub: "" },
  { number: "8/7", label: "GPS Tracking Coverage.", sub: "" },
  { number: "+2", label: "Countries covered daily.", sub: "" },
  { number: "+0.5K", label: "Monthly Orders Fulfilled.", sub: "" },
];

const parseStat = (str: string) => {
  // Try to extract numbers, prefixes and suffixes dynamically
  const match = str.match(/^([^0-9.-]*)([0-9.]+)([^0-9]*)$/);
  if (match) {
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3], decimals, isValid: true };
  }
  return { prefix: "", num: 0, suffix: str, decimals: 0, isValid: false };
};

export default function QuickFacts() {
  const [data, setData] = useState<any>({
    stats: defaultStats,
    partners: ["Logipack", "TransGlob", "FastWay", "OceanLine", "AirLift", "AutoFleet"]
  });

  useEffect(() => {
    fetch("/api/admin/section/quickfacts?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="w-full bg-white pt-24 pb-0 flex flex-col items-center">
      
      {/* Tiny Orange Circle Indicator */}
      <div className="w-full max-w-[1280px] mx-auto px-6 mb-24">
        <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C]" />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-6" ref={ref}>
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-0 mb-32">
          {(data?.stats || []).map((stat: any, i: number) => {
            const parsed = parseStat(stat?.number ?? "");
            return (
              <motion.div
                key={stat?.number ?? i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start group"
              >
                <div className="font-playfair font-semibold text-[54px] md:text-[64px] text-[#111111] leading-none mb-4 tracking-[-0.03em]">
                  {inView && parsed.isValid ? (
                    <CountUp
                      start={0}
                      end={parsed.num}
                      duration={2.5}
                      decimals={parsed.decimals}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                    />
                  ) : (
                    stat?.number ?? ""
                  )}
                </div>
                <div className="text-[17px] text-[#666666] font-medium tracking-tight">
                  {stat?.label ?? ""}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Partner strip */}
      <div className="w-full bg-[#FAFAFA] py-16 overflow-hidden border-y border-black/[0.04] group/marquee">
        <div className="w-full max-w-[1280px] mx-auto px-6 mb-12 flex items-center justify-start">
           <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C]" />
        </div>
        <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
          {[...data?.partners || [], ...data?.partners || [], ...data?.partners || []].map((p: string, i: number) => (
             <div key={i} className="px-16 flex items-center justify-center min-w-[200px] grayscale hover:grayscale-0 transition-all duration-300 opacity-40 hover:opacity-100 cursor-pointer">
               <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111]">{p}</span>
             </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
