"use client";
import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import Label from "./ui/Label";

// Simple parser for numbers coming from Admin
const parseStat = (str: string) => {
  if (!str) return { prefix: "", num: 0, suffix: str, decimals: 0, isValid: false };
  const match = str.match(/(^\D*)(\d+(?:\.\d+)?)(\D*$)/);
  if (match) {
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    return {
      prefix: match[1],
      num: parseFloat(match[2]),
      suffix: match[3],
      decimals,
      isValid: true,
    };
  }
  return { prefix: "", num: 0, suffix: str, decimals: 0, isValid: false };
};

const defaultStats = [
  { number: "98.6%", label: "On-Time Delivery Rate." },
  { number: "24/7", label: "GPS Tracking Coverage." },
  { number: "+20", label: "Countries covered daily." },
  { number: "+2.5K", label: "Monthly Orders Fulfilled." },
];

export default function QuickFacts() {
  const [data, setData] = useState<any>({
    title: "Trusted by dozens of Companies across Industries.",
    stats: defaultStats,
  });
  
  const [logosConfig, setLogosConfig] = useState<any>({
    logos: []
  });

  useEffect(() => {
    fetch("/api/admin/section/stats?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
      
    fetch("/api/admin/section/logos?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => {
        if (json && json.logos) setLogosConfig(json);
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const renderLogos = () => {
    if (logosConfig.logos && logosConfig.logos.length > 0) {
      return logosConfig.logos.map((url: string, i: number) => (
        <img key={i} src={url} alt={`Client logo ${i}`} className="h-10 md:h-12 w-auto object-contain shrink-0 mx-8" />
      ));
    }
    // Fallback logos
    const placeholders = [
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
    ];
    return placeholders.map((url, i) => (
      <img key={i} src={url} alt={`Client logo placeholder ${i}`} className="h-8 md:h-10 w-auto object-contain shrink-0 mx-8 opacity-80" />
    ));
  };

  return (
    <>
      <section id="stats" className="w-full bg-white py-24 md:py-32 relative overflow-hidden">
        {/* Decorative Arrows Background Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMTkgMUw0MCAyMEwyMCAyMEwyMCA0MEw0MCA0MEwwIDIwWiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')",
            backgroundSize: "120px 120px"
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-8" ref={ref}>
          
          {/* Left Column (1/3) */}
          <div className="w-full md:w-1/3 flex flex-col items-start pr-0 md:pr-8">
            <Label text="Quick Facts" />
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#1A1A1A] max-w-[400px]"
            >
              {data?.title ?? "Trusted by dozens of Companies across Industries."}
            </motion.h2>
          </div>

          {/* Right Column (2/3) - 2x2 Grid */}
          <div className="w-full md:w-2/3 grid grid-cols-2 gap-y-16 gap-x-8 md:gap-x-16 pl-0 md:pl-12">
            {(data?.stats || defaultStats).map((stat: any, i: number) => {
              const parsed = parseStat(stat?.number ?? "");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col items-start"
                >
                  <div className="font-figtree font-extrabold text-[48px] md:text-[64px] text-[#1A1A1A] leading-none mb-3 tracking-tight">
                    {inView && parsed.isValid ? (
                      <CountUp
                        start={0}
                        end={parsed.num}
                        duration={2.5}
                        separator=","
                        decimals={parsed.decimals}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                        useEasing={true}
                      />
                    ) : (
                      stat?.number ?? ""
                    )}
                  </div>
                  <div className="text-[15px] md:text-[16px] text-[#1A1A1A]/70 leading-snug max-w-[200px]">
                    {stat?.label ?? ""}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Logos Marquee Section */}
      <section className="w-full bg-[#F2F0EB] py-16 md:py-24 overflow-hidden border-t border-[#E0DDD8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <Label text="Clients & Partners" />
        </div>
        
        <div className="group/marquee w-full flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex items-center group-hover/marquee:[animation-play-state:paused] whitespace-nowrap">
            {renderLogos()}
            {renderLogos()}
            {renderLogos()}
            {renderLogos()}
          </div>
        </div>
      </section>
    </>
  );
}
