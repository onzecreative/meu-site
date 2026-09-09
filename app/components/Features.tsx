"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Cpu, BarChart3, ShieldCheck, Zap, Bot, Database, Sparkles } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Card3D from "@/components/3d/Card3D";

const defaultFeatures = [
  {
    title: "Resultados Mensuráveis",
    description: "Dashboards em tempo real com telemetria que importa — CAC reduzido, ROAS de escala, LTV e receita líquida.",
    color: "#6366F1",
    tag: "TELEMETRIA DE DADOS",
  },
  {
    title: "Agentes Autônomos de IA",
    description: "Implementamos sistemas de inteligência artificial generativa integrados ao seu fluxo de trabalho para qualificar e converter leads sem atrito.",
    color: "#06B6D4",
    tag: "AUTOMAÇÃO COGNITIVA",
  },
  {
    title: "Engenharia Web de Ponta",
    description: "Aplicações ultrarrápidas em Next.js com tempos de carregamento inferiores a 0.5s e 100/100 no Google PageSpeed.",
    color: "#8B5CF6",
    tag: "NEXT.JS 16 & PERFORMANCE",
  },
  {
    title: "Parceria Estratégica Contínua",
    description: "Atendimento próximo e consultoria de alto nível. Não somos apenas executores; atuamos como o braço de tecnologia do seu negócio.",
    color: "#10B981",
    tag: "GROWTH PARTNERSHIP",
  },
];

export default function Features() {
  const [data, setData] = useState<any>({
    title: "Por que a Onze\né diferente?",
    subtitle:
      "Unimos estética de software de alta gama, engenharia de automação com IA e foco irrestrito em ROI real.",
    items: defaultFeatures,
  });

  useEffect(() => {
    fetch("/api/admin/whyus?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0)
          setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="w-full py-[120px] md:py-[160px] relative overflow-hidden"
      style={{ background: "#030305" }}
    >
      {/* Background radial glow */}
      <div
        className="glow-indigo"
        style={{ width: 600, height: 600, top: "30%", left: "-10%", opacity: 0.15 }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
                [DIFFERENTIALS // BENTO ARCHITECTURE]
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-white text-[34px] md:text-[46px] font-extrabold tracking-tight leading-tight"
            >
              {data?.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#9496A1] max-w-[420px] leading-relaxed text-[15px] font-light"
          >
            {data?.subtitle}
          </motion.p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Wide AI Automation showcase (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.18)"
              className="p-8 md:p-10 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-indigo-400 tracking-wider font-semibold">
                      AUTOMAÇÃO & AGENTES IA
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-white/50 border border-white/5">
                    AUTONOMOUS
                  </span>
                </div>

                <h3 className="text-white text-[24px] md:text-[28px] font-bold mb-3 tracking-tight">
                  Inteligência Artificial Operacional
                </h3>
                <p className="text-[#9496A1] text-[15px] leading-relaxed max-w-xl font-light">
                  Não criamos apenas chatbots básicos. Construímos agentes autônomos que operam na esteira de qualificação de vendas, enriquecem dados no CRM e respondem no WhatsApp com contexto imediato da sua empresa.
                </p>
              </div>

              {/* Interactive terminal simulation */}
              <div className="mt-8 rounded-xl bg-black/60 border border-white/[0.06] p-4 font-mono text-[12px] space-y-2">
                <div className="flex items-center justify-between text-white/40 pb-2 border-b border-white/5 text-[10px]">
                  <span>AGENT PIPELINE // ONZE-CORE</span>
                  <span className="text-emerald-400">● RUNNING</span>
                </div>
                <div className="text-cyan-400">&gt; Event: Novo lead detectado via Meta Ads (Formulário VIP)</div>
                <div className="text-indigo-300">&gt; AI Action: Análise de ICP e histórico de compras executada em 140ms</div>
                <div className="text-emerald-400">&gt; Status: Qualificado Tier A. Mensagem personalizada enviada via WhatsApp.</div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento Card 2: Performance Telemetry (Spans 1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1"
          >
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.18)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">ROAS 7.4×</span>
                </div>

                <h3 className="text-white text-[22px] font-bold mb-3 tracking-tight">
                  Dados & Performance
                </h3>
                <p className="text-[#9496A1] text-[14px] leading-relaxed font-light">
                  Acompanhamento de ponta a ponta. Saiba exatamente qual criativo, palavra-chave e canal gera mais faturamento na conta da sua empresa.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">Taxa de Conversão</div>
                  <div className="text-[20px] font-extrabold text-emerald-400 font-mono">+185%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-white/40 uppercase">CAC Otimizado</div>
                  <div className="text-[20px] font-extrabold text-cyan-400 font-mono">-42%</div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento Card 3: Next.js & Speed (Spans 1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1"
          >
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.18)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">100/100 PSI</span>
                </div>

                <h3 className="text-white text-[22px] font-bold mb-3 tracking-tight">
                  Velocidade Instantânea
                </h3>
                <p className="text-[#9496A1] text-[14px] leading-relaxed font-light">
                  Adeus sites lentos e pesados em templates genéricos. Desenvolvemos com código puro, Next.js e renderização otimizada para carregar em frações de segundo.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
                  <div className="text-[18px] font-mono font-bold text-white">0.3s</div>
                  <div className="text-[10px] font-mono text-white/40">TTFB Global</div>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
                  <div className="text-[18px] font-mono font-bold text-indigo-400">A+</div>
                  <div className="text-[10px] font-mono text-white/40">Core Web Vitals</div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento Card 4: Partnership & Security (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.18)"
              className="p-8 md:p-10 h-full flex flex-col justify-between"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 tracking-wider font-semibold">
                      CONFIANÇA & ESCALA
                    </span>
                  </div>
                  <h3 className="text-white text-[24px] font-bold mb-2 tracking-tight">
                    Infraestrutura de Crescimento Seguro
                  </h3>
                  <p className="text-[#9496A1] text-[15px] leading-relaxed max-w-lg font-light">
                    Sua operação digital amparada por suporte proativo, governança técnica e estratégias validadas com os principais players do mercado.
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[220px]">
                  {[
                    "Google Premier Partner Certified",
                    "Meta Business Standards Aligned",
                    "Supabase & Vercel Native Stack",
                    "SLA de Resposta Imediata",
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[12px] font-mono text-white/80 bg-white/[0.03] px-3 py-2 rounded-lg border border-white/[0.05]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center mt-14"
        >
          <a
            href="/sobre"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-semibold text-white bg-white/[0.04] border border-white/[0.1] hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all duration-300 group"
          >
            <span>Conheça a história e metodologia da Onze</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
