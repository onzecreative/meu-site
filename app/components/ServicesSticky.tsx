"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Cpu, TrendingUp } from "lucide-react";
import Card3D from "@/components/3d/Card3D";
import Service3DVisualizer from "@/components/3d/Service3DVisualizer";

const defaultServices = [
  {
    number: "01",
    title: "Marketing de Performance & Tráfego Pago",
    desc: "Engenharia de dados em Google Ads, Meta Ads e TikTok. Criação de funis de alta conversão, testes A/B estruturados e escala previsível com ROAS consistente.",
    tag: "GROWTH & TRÁFEGO",
    type: "growth",
    color: "#06B6D4",
  },
  {
    number: "02",
    title: "Automações com Inteligência Artificial",
    desc: "Agentes autônomos e fluxos de atendimento inteligente que qualificam leads, integram CRMs e eliminam gargalos operacionais 24 horas por dia.",
    tag: "IA & AUTOMAÇÃO",
    type: "ai",
    color: "#6366F1",
  },
  {
    number: "03",
    title: "Plataformas Web & Engenharia Digital",
    desc: "Websites, landing pages e portais de altíssimo impacto desenvolvidos em Next.js com design system sob medida, tempos de carregamento instantâneos e máxima conversão.",
    tag: "NEXT-GEN WEB",
    type: "web",
    color: "#8B5CF6",
  },
];

export default function ServicesSticky() {
  const [data, setData] = useState<any>({
    title: "Soluções que\naceleram negócios.",
    subtitle:
      "Do tráfego pago de escala à automação com agentes de IA — um ecossistema completo para liderar o mercado digital.",
    items: defaultServices,
  });

  useEffect(() => {
    fetch("/api/admin/section/services?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0)
          setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = data?.items?.length > 0 ? data.items : defaultServices;

  return (
    <section
      id="services"
      className="w-full py-[120px] md:py-[160px] relative overflow-hidden"
      style={{ background: "#030305" }}
    >
      {/* Background ambient lighting */}
      <div
        className="glow-indigo"
        style={{ width: 600, height: 600, top: "20%", right: "-10%", opacity: 0.2 }}
      />
      <div
        className="glow-cyan"
        style={{ width: 500, height: 500, bottom: "10%", left: "-5%", opacity: 0.15 }}
      />

      <div
        className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-12 md:gap-16 relative z-10"
        ref={ref}
      >
        {/* Left — Sticky Header & Architecture Index */}
        <div className="w-full md:w-[38%] flex flex-col">
          <div className="md:sticky md:top-36 flex flex-col items-start pr-0 md:pr-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
                [ARCHITECTURE // CAPABILITIES]
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-white mb-6 whitespace-pre-line text-[36px] md:text-[48px] font-extrabold tracking-tight leading-tight"
            >
              {data?.title ?? "Soluções que\naceleram negócios."}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#9496A1] max-w-[360px] leading-relaxed text-[15px] font-light"
            >
              {data?.subtitle}
            </motion.p>

            {/* Quick spec indicators */}
            <div className="mt-8 space-y-3 w-full border-t border-white/[0.06] pt-6">
              <div className="flex items-center justify-between text-[12px] font-mono text-white/50">
                <span>STACK</span>
                <span className="text-white">Next.js 16 + React 19 + AI Nodes</span>
              </div>
              <div className="flex items-center justify-between text-[12px] font-mono text-white/50">
                <span>INTERACTIVITY</span>
                <span className="text-cyan-400">3D WebGL + Spatial Perspective</span>
              </div>
              <div className="flex items-center justify-between text-[12px] font-mono text-white/50">
                <span>DEPLOYS</span>
                <span className="text-emerald-400">Continuous 99.9% Uptime</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10"
            >
              <a
                href="/servicos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold text-white bg-white/[0.04] border border-white/[0.1] hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <span>Conhecer todos os módulos</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right — 3D Interactive Cards */}
        <div className="w-full md:w-[62%] flex flex-col gap-8">
          {items.map((service: any, i: number) => {
            const color = service.color || defaultServices[i % defaultServices.length]?.color || "#6366F1";
            const serviceType = service.type || (i === 0 ? "growth" : i === 1 ? "ai" : "web");
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Card3D maxTilt={10} glareOpacity={0.16}>
                  <div className="relative rounded-2xl border border-white/[0.08] bg-[#08090E] p-7 md:p-9 overflow-hidden group hover:border-indigo-500/40 transition-colors">
                    {/* Corner accent glow */}
                    <div
                      className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-20 blur-2xl pointer-events-none group-hover:opacity-40 transition-opacity"
                      style={{ background: color }}
                    />

                    {/* Top Row: Tag & Number */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-[10px] font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider border"
                        style={{
                          background: `${color}15`,
                          borderColor: `${color}35`,
                          color,
                        }}
                      >
                        {service.tag || defaultServices[i % defaultServices.length]?.tag}
                      </span>
                      <span className="text-[13px] font-mono text-white/30 font-bold">
                        0{i + 1} // 03
                      </span>
                    </div>

                    {/* 3D Visualizer Mockup */}
                    <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
                      <Service3DVisualizer type={serviceType} color={color} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-white font-bold mb-3 text-[22px] md:text-[26px] leading-snug tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all">
                      {service?.title}
                    </h3>
                    <p className="text-[#9496A1] leading-relaxed text-[15px] font-light">
                      {service?.desc}
                    </p>

                    {/* Bottom action trigger */}
                    <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                      <a
                        href="/contato"
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 group-hover:text-white transition-colors"
                      >
                        <span>Solicitar diagnóstico desta solução</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
