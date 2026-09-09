"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowUpRight, ShieldCheck, Sparkles, Cpu, Target, Zap, CheckCircle2, Code2, Users2 } from "lucide-react";
import FinalCTA from "../components/FinalCTA";
import Card3D from "@/components/3d/Card3D";
import SpotlightCard from "@/components/ui/SpotlightCard";

const MANIFESTO_PILLARS = [
  {
    icon: Target,
    title: "Obsessão por ROI Líquido",
    desc: "Métricas de vaidade não pagam contas. Todas as campanhas, automações e códigos que escrevemos têm um único objetivo: gerar faturamento e lucro sustentável.",
  },
  {
    icon: Cpu,
    title: "Vanguarda em Inteligência Artificial",
    desc: "Não esperamos as tendências chegarem. Integramos os modelos neurais mais avançados do mundo diretamente nas operações diárias dos nossos clientes.",
  },
  {
    icon: Zap,
    title: "Velocidade de Execução Implacável",
    desc: "No digital, velocidade é vantagem competitiva. Criamos, testamos e colocamos ofertas no ar em dias, não em meses.",
  },
  {
    icon: Code2,
    title: "Engenharia de Software de Padrão Global",
    desc: "Rejeitamos soluções lentas e modelos pré-fabricados genéricos. Desenvolvemos com Next.js, WebGL e arquiteturas de alta fidelidade.",
  },
];

const TECH_RADAR = [
  { category: "Frontend & 3D", items: ["Next.js 16", "React 19", "Three.js / WebGL", "Tailwind CSS v4", "Framer Motion"] },
  { category: "Inteligência Artificial", items: ["LLM Agents", "OpenAI & Anthropic APIs", "Automações N8N", "WhatsApp Enterprise", "RAG Embeddings"] },
  { category: "Infraestrutura & Dados", items: ["Supabase Cloud", "PostgreSQL", "Vercel Edge Network", "Meta CAPI", "Google BigQuery"] },
  { category: "Mídia & Performance", items: ["Google Ads", "Meta Ads", "TikTok Ads", "Looker Studio", "RD Station CRM"] },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Fundação da Onze",
    desc: "Nascemos com a missão de transformar o mercado digital com estratégias de tráfego de alta precisão e foco restrito em conversão.",
  },
  {
    year: "2023",
    title: "A Revolução da IA Operacional",
    desc: "Pioneirismo na implementação de fluxos de inteligência artificial generativa para atendimento automatizado e qualificação instantânea de leads.",
  },
  {
    year: "2024",
    title: "Mais de 500 Empresas Aceleradas",
    desc: "Consolidação de um portfólio robusto de clientes em e-commerce, prestação de serviços, infoprodutos e grandes distribuidores.",
  },
  {
    year: "2025+",
    title: "Ecossistema Digital 3D & Agentes Autônomos",
    desc: "Lançamento da plataforma com design system moderno e motor 3D, integrando agentes cognitivos autônomos em escala para nossos clientes.",
  },
];

export default function SobrePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(3);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#030305" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full pt-44 pb-20 md:pb-28 px-4 md:px-10 max-w-7xl mx-auto relative z-10" ref={heroRef}>
        <div className="flex flex-col items-start max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
              [INSTITUCIONAL // MANIFESTO ONZE]
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white text-[44px] md:text-[68px] font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            Construímos a vantagem competitiva das empresas que <span className="gradient-accent">lideram no digital.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[#9496A1] text-[17px] md:text-[19px] leading-relaxed font-light mb-8"
          >
            A Onze Negócios não é apenas uma agência de marketing ou uma fábrica de software tradicional. Somos um acelerador de ecossistemas digitais que une engenharia de software de alta gama, automação com IA e estratégias agressivas de aquisição.
          </motion.p>
        </div>
      </section>

      {/* Manifesto / Core Values Bento Grid */}
      <section className="w-full py-20 md:py-28 relative border-t border-white/[0.06]" style={{ background: "#08090E" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
              NOSSO MANIFESTO
            </span>
            <h2 className="text-white text-[32px] md:text-[46px] font-bold mt-2">
              Princípios que Guiavam Nossa Engenharia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MANIFESTO_PILLARS.map((pillar, idx) => (
              <SpotlightCard key={idx} className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white text-[22px] font-bold mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[#9496A1] text-[15px] leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Radar Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden" style={{ background: "#030305" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">
                STACK TECNOLÓGICA
              </span>
              <h2 className="text-white text-[32px] md:text-[46px] font-bold mt-2">
                Nosso Radar de Tecnologia
              </h2>
            </div>
            <p className="text-[#9496A1] text-[15px] max-w-md font-light">
              Utilizamos ferramentas e frameworks de nível de ponta para garantir máxima segurança, escalabilidade e conversão.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_RADAR.map((tech, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#08090E] border border-white/[0.08] flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[12px] font-mono font-bold text-white uppercase tracking-wider">
                    {tech.category}
                  </span>
                </div>
                <ul className="space-y-3">
                  {tech.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-[13px] text-[#9496A1] font-light">
                      <span className="text-indigo-400 font-mono text-xs">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline of Evolution */}
      <section className="w-full py-20 md:py-28 relative border-t border-white/[0.06]" style={{ background: "#08090E" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
              TRAJETÓRIA & IMPACTO
            </span>
            <h2 className="text-white text-[32px] md:text-[46px] font-bold mt-2">
              A Evolução da Onze
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <Card3D key={idx} maxTilt={6}>
                <div
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`p-7 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-between cursor-pointer ${
                    activeTimelineIdx === idx
                      ? "bg-[#030305] border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                      : "bg-[#08090E] border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="text-[32px] font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-white text-[18px] font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#9496A1] text-[13px] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
