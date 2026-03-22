"use client";
import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";

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
  }
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const videoSource = useMemo(() => {
    if (data.type === "youtube" && data.youtubeId) {
      return `https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.youtubeId}&background=1`;
    }
    return data.videoUrl;
  }, [data]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#1C1817]"
    >
      {/* Background Media */}
      <motion.div 
        style={{ y: yImage }}
        className="absolute inset-0 z-0 origin-top"
      >
        {data.type === "youtube" ? (
          <iframe 
            src={videoSource}
            className="absolute inset-0 w-full h-full pointer-events-none scale-150"
            allow="autoplay; muted; fullscreen"
          />
        ) : data.videoUrl ? (
          <video 
            src={data.videoUrl} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('${data.image || "https://picsum.photos/seed/bridge/1920/1080"}')`,
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-10 w-full max-w-7xl mx-auto px-[16px] md:px-[40px] pt-32 pb-16 flex flex-col h-full flex-1"
      >
        
        <div className="mt-auto flex flex-col items-start w-full max-w-[800px]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            className="text-white mb-6 whitespace-pre-line"
          >
            {data.title || "Your Freight, delivered with Precision."}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-[56px] bg-primary ring-4 ring-primary/20" />
              <span className="text-white text-[18px] md:text-[22px] font-medium tracking-tight">
                {data.subtitleIndicator || "Across Europe and the US."}
              </span>
            </div>
            
            <p className="text-white/70 max-w-[400px]">
              {data.bottomLeftText || "Reliable transport. Real-time tracking. Tailored logistics for your business."}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.25 }}
          className="w-full flex justify-start md:justify-end mt-12 md:mt-0"
        >
          <Button 
            variant="outline" 
            text={data.bottomRightText || "Know Our Services"} 
            href={data.bottomRightUrl || "#services"}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
