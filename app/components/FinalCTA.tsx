"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "./ui/Button";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full bg-[#1A0500] py-[120px] md:py-[160px] relative flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Decorative Arrow Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMTkgMUw0MCAyMEwyMCAyMEwyMCA0MEw0MCA0MEwwIDIwWiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')",
          backgroundSize: "80px 80px",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-[16px] flex flex-col items-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
          className="text-white text-center mb-10 text-[48px] md:text-[64px] font-extrabold max-w-[800px] leading-tight"
        >
          Ready to move smarter?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
        >
          <Button variant="solid" text="Get a Custom Quote" href="/contato" />
        </motion.div>
      </div>

    </section>
  );
}
