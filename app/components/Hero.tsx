"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect: image moves slower than scroll
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#1A0500]"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: yImage }}
        className="absolute inset-0 z-0 origin-top"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://picsum.photos/seed/bridge/1920/1080')",
          }}
        />
        {/* Dark Gradient Overlay heavily focusing on left and bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-10 w-full max-w-7xl mx-auto px-[16px] md:px-[40px] pt-32 pb-16 flex flex-col h-full flex-1"
      >
        
        {/* Texts at bottom left */}
        <div className="mt-auto flex flex-col items-start w-full max-w-[800px]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            className="text-white mb-6"
          >
            Your Freight, delivered with Precision.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-[56px] bg-[#E8431A] ring-4 ring-[#E8431A]/20" />
              <span className="text-white text-[18px] md:text-[22px] font-medium tracking-tight">
                Across Europe and the US.
              </span>
            </div>
            
            <p className="text-white/70 max-w-[400px]">
              Reliable transport. Real-time tracking. Tailored logistics for your business.
            </p>
          </motion.div>
        </div>

        {/* Button bottom right */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.25 }}
          className="w-full flex justify-start md:justify-end mt-12 md:mt-0"
        >
          <Button 
            variant="outline" 
            text="Know Our Services" 
            href="#services"
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
