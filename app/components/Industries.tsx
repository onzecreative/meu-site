"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultIndustries = [
  {
    name: "E-commerce & D2C",
    desc: "Escala acelerada com gestão de tráfego, otimização de conversão e automação de pós-venda.",
    image: "https://images.unsplash.com/photo-1556742049-0a67e557224f?w=800&q=80",
    tag: "Tráfego & Vendas",
  },
  {
    name: "Revenda & Produtos Físicos",
    desc: "Posicionamento digital e canais de atração para distribuidores e revendedores.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    tag: "Digitalização",
  },
  {
    name: "Mentorias & Infoprodutos",
    desc: "Funis automatizados, lançamentos e esteiras perpétuas de alto valor percebido.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    tag: "Educação & Escala",
  },
  {
    name: "Empresas & Negócios Locais",
    desc: "Captação constante de leads qualificados e atendimento automatizado via IA.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tag: "Performance Local",
  },
];

export default function Industries() {
  const [data, setData] = useState<any>({
    title: "Mercados onde geramos\nalto impacto.",
    subtitle: "Atuamos em segmentos estratégicos potencializando vendas, automação e presença de marca.",
    items: defaultIndustries,
  });

  useEffect(() => {
    fetch("/api/admin/industries?t=" + Date.now())
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
    <section id="industries" className="w-full py-[120px] md:py-[160px] relative overflow-hidden" style={{ background: "#030305" }}>
      
      {/* Decorative Glow */}
      <div 
        className="glow-indigo"
        style={{ width: 500, height: 500, top: "20%", right: "-10%", opacity: 0.15 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-16 md:gap-12" ref={ref}>
        
        {/* Left Column (Sticky) */}
        <div className="w-full md:w-[38%] flex flex-col relative">
          <div className="md:sticky md:top-36 flex flex-col items-start pr-0 md:pr-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
                [MARKET VERTICALS // PROVEN FIT]
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-white mb-6 whitespace-pre-line text-[32px] md:text-[44px] font-extrabold tracking-tight leading-tight"
            >
              {data?.title ?? "Mercados onde geramos\nalto impacto."}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[#9496A1] max-w-[340px] mb-8 leading-relaxed text-[15px] font-light"
            >
              {data?.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a
                href="/contato"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  boxShadow: "0 0 25px rgba(99,102,241,0.4)",
                }}
              >
                <span>Diagnosticar Meu Negócio</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Column (Stacked Cards) */}
        <div className="w-full md:w-[62%] flex flex-col gap-6">
          {items.map((ind: any, i: number) => (
            <motion.div
              key={ind?.name ?? i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row bg-[#08090E] border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full md:w-[42%] h-[200px] md:h-auto overflow-hidden relative">
                <img 
                  src={ind?.image || defaultIndustries[i % defaultIndustries.length]?.image} 
                  alt={ind?.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#08090E]/60 to-[#08090E]" />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-[58%] flex flex-col justify-center p-7 md:p-8">
                <div className="mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                    {ind?.tag || defaultIndustries[i % defaultIndustries.length]?.tag || "Especialidade"}
                  </span>
                </div>
                <h3 className="text-white font-bold mb-2 text-[20px] md:text-[22px] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all">
                  {ind?.name ?? ind?.title ?? ""}
                </h3>
                <p className="text-[#9496A1] text-[14px] leading-relaxed font-light">
                  {ind?.desc || "Estratégias sob medida para elevar a maturidade digital e gerar receita recorrente."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
