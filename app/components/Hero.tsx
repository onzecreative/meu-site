"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface HeroConfig {
  type: "mp4local" | "youtube" | "url";
  videoUrl: string;
  videoUrlMobile: string;
  posterUrl: string;
  youtubeId: string;
  title: string;
  subtitleIndicator: string;
  subtitle: string;
  bottomLeftText: string;
  bottomRightText: string;
  bottomRightUrl: string;
}

const defaultHeroConfig: HeroConfig = {
  type: "url",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  videoUrlMobile: "",
  posterUrl: "",
  youtubeId: "",
  title: "Your Freight, delivered\nwith Precision.",
  subtitleIndicator: "Across Europe and the US.",
  subtitle: "",
  bottomLeftText: "Reliable transport. Real-time tracking.\nTailored logistics for your business.",
  bottomRightText: "Know Our Services",
  bottomRightUrl: "#services"
};

function VideoBackground({ config }: { config: HeroConfig }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string };
    };
    if (nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g") {
      setIsSlowConnection(true);
    }
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (isSlowConnection || isMobile) {
    // Return image or fallback placeholder in Mobile
    return (
      <div className="absolute inset-0 bg-[#DE3F0B]/10 mix-blend-color-dodge">
        {config?.posterUrl && <img src={config.posterUrl} className="w-full h-full object-cover" alt="Hero background" />}
      </div>
    );
  }

  if (config?.type === "youtube" && config?.youtubeId) {
    return (
      <div ref={containerRef} className="absolute inset-0">
        {isVisible && (
          <iframe
            className="absolute inset-0 w-full h-full object-cover pointer-events-none border-none"
            src={`https://www.youtube.com/embed/${config?.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${config?.youtubeId}&controls=0&showinfo=0&rel=0&enablejsapi=1&loading=lazy&playsinline=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            title="Hero video"
          />
        )}
      </div>
    );
  }

  const src = config?.videoUrl;
  if (!src) return null;

  return (
    <div ref={containerRef} className="absolute inset-0">
      {isVisible && (
         <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={config?.posterUrl || undefined}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={src} type={src.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
        </video>
      )}
    </div>
  );
}

// STAGGER CHILDREN ANIMATION
const containerVars: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const wordVars: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Hero() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(defaultHeroConfig);

  useEffect(() => {
    fetch("/api/admin/hero?t=" + Date.now())
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
           setHeroConfig(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const titleWords = (heroConfig?.title ?? defaultHeroConfig.title).split(" ");

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#111]">
      <VideoBackground config={heroConfig} />

      {/* Dark overlay specifically matching framer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

      {/* Repeating Arrows Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15l15 15-15 15M30 15l15 15-15 15' stroke='white' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px"
      }} />

      {/* Content */}
      <div className="relative w-full max-w-[1280px] mx-auto px-6 pb-12 pt-40 md:pb-16 flex flex-col h-full justify-center">
        
        {/* Title area (Center-left) */}
        <div className="flex flex-col items-start w-full mt-auto mb-16 md:mb-32">
          
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="font-playfair font-semibold text-[clamp(44px,7vw,100px)] leading-[1.05] tracking-[-0.03em] text-white max-w-[900px] mb-6 flex flex-wrap gap-x-[clamp(10px,1.5vw,20px)]"
          >
            {titleWords.map((word, i) => (
              <motion.span key={i} variants={wordVars} className={word.includes('\\n') ? 'w-full block h-0 border-none m-0' : 'inline-block'}>
                {word.includes('\\n') ? '' : word.replace('\n', '')}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] flex-shrink-0" />
            <p className="text-white/90 text-[18px] md:text-[22px] font-medium tracking-tight">
              {heroConfig?.subtitleIndicator ?? defaultHeroConfig.subtitleIndicator}
            </p>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/80 text-[15px] leading-[1.6] max-w-[300px] whitespace-pre-line font-medium"
          >
            {heroConfig?.bottomLeftText ?? defaultHeroConfig.bottomLeftText}
          </motion.p>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            href={heroConfig?.bottomRightUrl ?? defaultHeroConfig.bottomRightUrl}
            className="group flex items-center gap-4 bg-[#E0400C] rounded-full pl-6 pr-2 py-2 transition-all w-fit shadow-lg hover:shadow-[#E0400C]/30 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white font-bold text-[14px] tracking-wide relative z-10">
              {heroConfig?.bottomRightText ?? defaultHeroConfig.bottomRightText}
            </span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-colors relative z-10">
              <ArrowRight size={18} className="text-white group-hover:text-[#E0400C] group-hover:translate-x-0.5 transition-all" />
            </div>
          </motion.a>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
      `}</style>
    </section>
  );
}
