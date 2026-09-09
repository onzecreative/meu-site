"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowUpRight, Cpu, TrendingUp, Code2, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import FinalCTA from "../components/FinalCTA";
import Card3D from "@/components/3d/Card3D";
import Service3DVisualizer from "@/components/3d/Service3DVisualizer";
import SpotlightCard from "@/components/ui/SpotlightCard";

const DEFAULT_CAPABILITIES = [
  {
    id: "growth",
    title: "Marketing de Performance & Escala de Tráfego",
    subtitle: "MÍDIA PAGA & CONVERSÃO",
    desc: "Construímos e operamos campanhas de tráfego de alta precisão em Google Ads, Meta Ads e TikTok. Com modelos preditivos e testes A/B estruturados, maximizamos o ROAS e aceleramos a geração de receita previsível.",
    bullets: [
      "Segmentação avançada e qualificação em tempo real",
      "Otimização algorítmica contínua de CAC e LTV",
      "Criativos de alta conversão orientados por dados",
      "Rastreamento de ponta a ponta com API de Conversões (CAPI)",
    ],
    type: "growth",
    color: "#06B6D4",
  },
  {
    id: "ai",
    title: "Automações & Agentes Cognitivos de IA",
    subtitle: "INTELIGÊNCIA ARTIFICIAL",
    desc: "Desenvolvemos fluxos inteligentes e agentes de IA autônomos que operam 24/7 na sua empresa: qualificando leads no primeiro segundo, agendando reuniões no CRM e automatizando rotinas operacionais.",
    bullets: [
      "Agentes de atendimento e vendas humanizados no WhatsApp",
      "Qualificação instantânea e enriquecimento de dados de leads",
      "Integração nativa com CRMs (HubSpot, RD Station, Pipedrive)",
      "Redução drástica de tempo de resposta para menos de 10 segundos",
    ],
    type: "ai",
    color: "#6366F1",
  },
  {
    id: "web",
    title: "Plataformas Digitais & Engenharia Web",
    subtitle: "NEXT.JS & DESIGN SYSTEM",
    desc: "Criamos websites, landing pages e portais institucionais sob medida utilizando as tecnologias mais modernas do mundo. Interfaces imersivas em 3D, carregamento em menos de 0.5s e foco absoluto em autoridade e conversão.",
    bullets: [
      "Arquitetura moderna em Next.js 16 com React 19",
      "Design System sob medida inspirado em marcas globais de ponta",
      "Performance máxima (Score 100/100 nos Core Web Vitals)",
      "SEO técnico avançado para liderar buscas orgânicas",
    ],
    type: "web",
    color: "#8B5CF6",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    name: "Diagnóstico & Auditoria Profunda",
    desc: "Analisamos sua esteira de aquisição atual, gargalos de conversão, dados de tráfego e oportunidades imediatas de automação.",
  },
  {
    num: "02",
    name: "Arquitetura da Solução & Design",
    desc: "Desenhamos o ecossistema completo: funis de tráfego, prompts e conexões de agentes de IA, e interfaces de conversão de alto impacto.",
  },
  {
    num: "03",
    name: "Implementação & Integração Técnica",
    desc: "Configuração das ferramentas, tracking de conversão, pipelines de IA e publicação das páginas em infraestrutura de nuvem de alta velocidade.",
  },
  {
    num: "04",
    name: "Testes A/B & Tração de Escala",
    desc: "Início da veiculação de campanhas, monitoramento de métricas em tempo real e calibração contínua dos algoritmos de conversão.",
  },
  {
    num: "05",
    name: "Otimização Contínua & Crescimento",
    desc: "Reuniões estratégicas de acompanhamento, relatórios de ROI e expansão para novos canais e públicos lucrativos.",
  },
];

export default function ServicosPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#030305" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full pt-44 pb-20 md:pb-28 px-4 md:px-10 max-w-7xl mx-auto relative z-10" ref={heroRef}>
        <div className="flex flex-col items-start max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
              [SOLUÇÕES & SERVIÇOS // ONZE NEGÓCIOS]
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white text-[44px] md:text-[68px] font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            Engenharia digital de ponta para <span className="gradient-accent">escalar empresas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[#9496A1] text-[17px] md:text-[19px] leading-relaxed font-light mb-8"
          >
            Do tráfego pago orientado por inteligência de dados até a implantação de agentes de IA autônomos e interfaces web de alta conversão. Conheça a nossa arquitetura completa de serviços.
          </motion.p>
        </div>
      </section>

      {/* Core Capabilities Section with 3D Visualizers */}
      <section className="w-full py-20 md:py-28 relative border-t border-white/[0.06]" style={{ background: "#08090E" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">
              CORE CAPABILITIES
            </span>
            <h2 className="text-white text-[32px] md:text-[46px] font-bold mt-2">
              Pilares de Aceleração Digital
            </h2>
          </div>

          <div className="flex flex-col gap-20">
            {DEFAULT_CAPABILITIES.map((cap, i) => (
              <div
                key={cap.id}
                className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between border-b border-white/[0.06] pb-20 last:border-b-0"
              >
                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-mono font-bold uppercase tracking-wider" style={{ background: `${cap.color}15`, color: cap.color }}>
                    <span>0{i + 1} // {cap.subtitle}</span>
                  </div>

                  <h3 className="text-white text-[28px] md:text-[36px] font-extrabold tracking-tight mb-4 leading-tight">
                    {cap.title}
                  </h3>

                  <p className="text-[#9496A1] text-[15px] leading-relaxed mb-8 font-light">
                    {cap.desc}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                    {cap.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13px] text-white/80 font-light">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contato"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold text-white bg-white/[0.04] border border-white/[0.1] hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
                  >
                    <span>Solicitar projeto neste pilar</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                {/* 3D Visualizer Side */}
                <div className="w-full lg:w-1/2">
                  <Card3D maxTilt={8} glareOpacity={0.15}>
                    <div className="rounded-2xl border border-white/[0.08] bg-[#030305] p-6 md:p-8 shadow-2xl">
                      <Service3DVisualizer type={cap.type} color={cap.color} />
                    </div>
                  </Card3D>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Process Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden" style={{ background: "#030305" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
              MÉTODO DE ENTREGA // SLA
            </span>
            <h2 className="text-white text-[32px] md:text-[46px] font-bold mt-2">
              Como funciona o processo de implantação
            </h2>
            <p className="text-[#9496A1] text-[15px] mt-4 font-light">
              Metodologia ágil e transparente com entregas contínuas e validação em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <SpotlightCard key={idx} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[28px] font-mono font-black text-indigo-400/80 mb-4">
                    {step.num}
                  </div>
                  <h4 className="text-white font-bold text-[17px] mb-2 leading-snug">
                    {step.name}
                  </h4>
                  <p className="text-[#9496A1] text-[13px] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
