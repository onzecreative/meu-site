"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal, Activity, ShieldCheck } from "lucide-react";
import Hero3DScene from "@/components/3d/Hero3DScene";
import Card3D from "@/components/3d/Card3D";

interface HeroProps {
  data: {
    type?: string;
    videoUrl?: string;
    youtubeId?: string;
    title?: string;
    subtitleIndicator?: string;
    bottomLeftText?: string;
    bottomRightText?: string;
    bottomRightUrl?: string;
    image?: string;
  };
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const title = data.title || "Seu negócio.\nAcelerado no digital.";
  const subtitle = data.subtitleIndicator || "ECOSSISTEMA COMPLETO DE MARKETING & IA";
  const desc =
    data.bottomLeftText ||
    "Arquitetamos ecossistemas de alta performance: automações com IA, escala de tráfego pago, plataformas web modernas e consultoria de crescimento.";
  const ctaText = data.bottomRightText || "Iniciar Projeto";
  const ctaUrl = data.bottomRightUrl || "/contato";

  return (
    <section
      ref={containerRef}
      className="relative min-h-[105vh] flex flex-col justify-between overflow-hidden grain pt-28 pb-16"
      style={{ background: "#030305" }}
    >
      {/* 3D WebGL Three.js Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Hero3DScene />
      </div>

      {/* Cyber Grid & Ambient Radial Lighting */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40 z-[1]" />
      
      <div
        className="glow-indigo"
        style={{ width: 700, height: 700, top: "-10%", left: "-10%", opacity: 0.3 }}
      />
      <div
        className="glow-cyan"
        style={{ width: 600, height: 600, bottom: "10%", right: "-5%", opacity: 0.25 }}
      />

      {/* Vignette Gradients for cinematic contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-[#030305]/70 pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/80 via-transparent to-[#030305]/80 pointer-events-none z-[2]" />

      {/* Interactive Hero Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 flex flex-col justify-center flex-1 mt-12 md:mt-20"
      >
        <div className="flex flex-col items-start max-w-3xl">
          
          {/* Eyebrow Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399] animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
                [SYS.3D // {subtitle}]
              </span>
            </div>
          </motion.div>

          {/* Main Title with 3D Depth Feel */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white mb-6 whitespace-pre-line tracking-tight leading-[1.05]"
          >
            {title.includes("digital") ? (
              <>
                {title.split("digital")[0]}
                <span className="gradient-accent font-black">digital</span>
                {title.split("digital")[1]}
              </>
            ) : (
              title
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#9496A1] max-w-xl text-[16px] md:text-[18px] leading-relaxed mb-10 font-light"
          >
            {desc}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={ctaUrl}
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-[15px] overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                boxShadow: "0 0 35px rgba(99,102,241,0.5)",
              }}
            >
              <span>{ctaText}</span>
              <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="/servicos"
              className="flex items-center gap-2 px-7 py-4 rounded-full font-medium text-white/90 text-[15px] bg-white/[0.03] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.08]"
            >
              <span>Explorar Soluções</span>
            </a>

            <div className="flex items-center gap-2 text-[12px] font-mono text-white/40 ml-2 hidden sm:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Arraste para interagir no 3D</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating 3D Telemetry Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 mt-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { metric: "500+", label: "Operações Escaladas", icon: Activity, tag: "VERIFICADO" },
            { metric: "99.4%", label: "Precisão & Eficiência IA", icon: Sparkles, tag: "AUTOMATION" },
            { metric: "3.8×", label: "Multiplicador de ROI", icon: ArrowUpRight, tag: "GROWTH" },
            { metric: "24/7", label: "Monitoramento Ativo", icon: ShieldCheck, tag: "SLA 99.9%" },
          ].map((item, i) => (
            <Card3D key={i} maxTilt={8} glareOpacity={0.12}>
              <div className="p-5 rounded-2xl bg-[#08090E]/90 border border-white/[0.08] backdrop-blur-md flex flex-col justify-between h-full group hover:border-indigo-500/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-white/40 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05]">
                    {item.tag}
                  </span>
                  <item.icon className="w-4 h-4 text-indigo-400/70 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <div className="text-[28px] md:text-[34px] font-extrabold text-white tracking-tight leading-none mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all">
                    {item.metric}
                  </div>
                  <div className="text-[12px] text-white/50 font-normal">
                    {item.label}
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
