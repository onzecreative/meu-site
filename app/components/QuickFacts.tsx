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
  { number: "500+", label: "Clientes atendidos com sucesso." },
  { number: "98%", label: "Taxa de satisfação dos clientes." },
  { number: "3×", label: "Crescimento médio de receita." },
  { number: "24/7", label: "Suporte especializado dedicado." },
];

export default function QuickFacts() {
  const [data, setData] = useState<any>({
    title: "Números que comprovam nossos resultados.",
    stats: defaultStats,
  });
  
  const [logosConfig, setLogosConfig] = useState<any>({
    logos: []
  });

  useEffect(() => {
    fetch("/api/admin/stats?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
      
    fetch("/api/admin/clients?t=" + Date.now())
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
      return logosConfig.logos.map((logo: any, i: number) => (
        <img key={i} src={typeof logo === 'string' ? logo : logo.url} alt={logo.alt || `Client logo ${i}`} className="h-10 md:h-12 w-auto object-contain shrink-0 mx-8" />
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
      <section id="stats" className="w-full py-[100px] md:py-[140px] relative overflow-hidden" style={{ background: '#030305' }}>
        {/* Ambient subtle light */}
        <div
          className="glow-indigo"
          style={{ width: 500, height: 500, top: '20%', left: '-10%', opacity: 0.15 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-12 md:gap-16" ref={ref}>
          
          {/* Left Column (1/3) */}
          <div className="w-full md:w-1/3 flex flex-col items-start pr-0 md:pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-white/70 uppercase tracking-widest">Métricas & Escala</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-white text-[32px] md:text-[44px] font-bold tracking-tight leading-tight"
            >
              {data?.title ?? "Números que comprovam nossos resultados."}
            </motion.h2>
            <p className="mt-4 text-[15px] text-[#9496A1] font-light leading-relaxed">
              Decisões guiadas por dados analíticos em tempo real, automações contínuas e infraestrutura de alta conversão.
            </p>
          </div>

          {/* Right Column (2/3) - 2x2 Grid with Spotlight Cards */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {(data?.stats || defaultStats).map((stat: any, i: number) => {
              const parsed = parseStat(stat?.number ?? "");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-6 md:p-8 rounded-2xl bg-[#08090E] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="font-extrabold text-[44px] md:text-[56px] leading-none mb-3 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all">
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
                  <div className="text-[14px] md:text-[15px] text-[#9496A1] leading-relaxed">
                    {stat?.label ?? ""}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Modern Monochrome Logos Marquee */}
      <section className="w-full py-12 md:py-16 overflow-hidden border-y border-white/[0.06]" style={{ background: '#08090E' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">Empresas e Plataformas Integradas</span>
          </div>
          <span className="text-[11px] font-mono text-white/30 hidden sm:inline">ECOSYSTEM // VERIFIED</span>
        </div>
        
        <div className="group/marquee w-full flex whitespace-nowrap overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
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
