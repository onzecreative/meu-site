"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import Card3D from "@/components/3d/Card3D";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative w-full py-[120px] md:py-[160px] overflow-hidden"
      style={{ background: "#030305" }}
    >
      {/* Dynamic glow tunnel */}
      <div
        className="glow-indigo"
        style={{ width: 700, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.25 }}
      />
      <div
        className="glow-cyan"
        style={{ width: 400, height: 400, top: "20%", right: "15%", opacity: 0.2 }}
      />

      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 md:px-10">
        <Card3D maxTilt={6} glareOpacity={0.15}>
          <div className="rounded-3xl border border-white/[0.12] bg-[#08090E]/90 backdrop-blur-xl p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
            
            {/* Ambient inner beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
                [PROJECT ONBOARDING // SLOTS DISPONÍVEIS]
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white max-w-[760px] mb-6 text-[36px] md:text-[54px] font-extrabold tracking-tight leading-tight"
            >
              Pronto para transformar sua empresa em uma máquina{" "}
              <span className="gradient-accent">digital de alta escala?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#9496A1] max-w-[560px] mb-10 text-[16px] md:text-[17px] leading-relaxed font-light"
            >
              Converse diretamente com nossos diretores técnicos e receba uma análise de diagnóstico com as alavancas de automação e tráfego prioritárias para seu segmento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a
                href="/contato"
                className="group relative flex items-center gap-2.5 px-9 py-4 rounded-full text-[15px] font-bold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.5)",
                }}
              >
                <span>Solicitar Diagnóstico Gratuito</span>
                <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/servicos"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-medium text-white/80 bg-white/[0.03] border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.08] transition-all duration-300"
              >
                <span>Ver Arquitetura de Serviços</span>
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-white/[0.06] w-full flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/50 text-[12px] font-mono"
            >
              {[
                "Google Premier Partner",
                "Meta Certified Expert",
                "Next.js Architecture",
                "Supabase Cloud Partner",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </Card3D>
      </div>
    </section>
  );
}
