"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full bg-[#111111] pt-32 pb-48 overflow-hidden relative z-0">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15l15 15-15 15M30 15l15 15-15 15' stroke='white' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center" ref={ref}>
        <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] mb-8" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair font-semibold text-[44px] md:text-[64px] text-white leading-[1.1] tracking-[-0.03em] mb-12"
        >
          Ready to optimize your supply chain?
        </motion.h2>

        <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            href="/contato"
            className="group flex items-center gap-4 bg-[#E0400C] rounded-full pl-8 pr-2 py-2.5 transition-all shadow-xl hover:shadow-[#E0400C]/40 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white font-bold text-[16px] tracking-wide relative z-10">
              Get a Quote Now
            </span>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-colors relative z-10">
              <ArrowRight size={20} className="text-white group-hover:text-[#E0400C] group-hover:translate-x-0.5 transition-all" />
            </div>
          </motion.a>
      </div>
    </section>
  );
}
