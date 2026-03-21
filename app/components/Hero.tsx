"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  IconArrowRight,
  IconChevronDown,
  IconShieldCheck,
  IconClock24,
  IconGlobe,
} from "@tabler/icons-react";

const badges = [
  { icon: <IconShieldCheck size={16} />, text: "ISO 9001 Certificado" },
  { icon: <IconClock24 size={16} />, text: "Suporte 24/7" },
  { icon: <IconGlobe size={16} />, text: "Cobertura Nacional" },
];

interface HeroConfig {
  type: "mp4local" | "youtube" | "url";
  videoUrl: string;
  videoUrlMobile: string;
  posterUrl: string;
  youtubeId: string;
}

function VideoBackground({ config }: { config: HeroConfig }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta conexão lenta
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string };
    };
    const conn = nav.connection;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") {
      setIsSlowConnection(true);
    }
    // Detecta mobile
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Lazy loading via IntersectionObserver
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

  const sharedStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  // Se conexão lenta, mostra só o poster/gradiente
  if (isSlowConnection) return null;

  // YouTube embed
  if (config.type === "youtube" && config.youtubeId) {
    return (
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
        {isVisible && (
          <iframe
            style={{ ...sharedStyle, border: "none", pointerEvents: "none" }}
            src={`https://www.youtube.com/embed/${config.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${config.youtubeId}&controls=0&showinfo=0&rel=0&enablejsapi=1&loading=lazy&playsinline=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            title="Hero video"
          />
        )}
      </div>
    );
  }

  // MP4 local ou URL pública
  const src = config.type === "mp4local" || config.type === "url" ? config.videoUrl : null;
  if (!src) return null;

  const mobileSrc = config.videoUrlMobile || src;
  const activeSrc = isMobile ? mobileSrc : src;

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={config.posterUrl || undefined}
          style={sharedStyle}
          preload="auto"
        >
          {/* Source mobile (480p) */}
          {config.videoUrlMobile && (
            <source src={config.videoUrlMobile} media="(max-width: 768px)" type="video/mp4" />
          )}
          {/* Source desktop */}
          <source src={src} type={src.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
        </video>
      )}
    </div>
  );
}

export default function Hero() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    type: "url",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    videoUrlMobile: "",
    posterUrl: "",
    youtubeId: "",
  });

  useEffect(() => {
    fetch("/api/admin/hero?t=" + Date.now())
      .then((r) => r.json())
      .then((data) => setHeroConfig(data))
      .catch(() => {});
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#111",
      }}
    >
      {/* ── Video background ── */}
      <VideoBackground config={heroConfig} />

      {/* ── Dark overlay sobre o vídeo ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(222,63,11,0.20) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(222,63,11,0.10) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Grid lines ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* ── Animated glow orb ── */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(222,63,11,0.15) 0%, transparent 70%)",
          top: "-200px",
          right: "-100px",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          width: "100%",
        }}
      >
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
        >
          {badges.map((badge) => (
            <div
              key={badge.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(222,63,11,0.14)",
                border: "1px solid rgba(222,63,11,0.35)",
                borderRadius: "100px",
                padding: "6px 14px",
                fontSize: "13px",
                color: "#FF7043",
                fontWeight: 500,
                backdropFilter: "blur(4px)",
              }}
            >
              {badge.icon}
              {badge.text}
            </div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "white",
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          Sua Carga,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #DE3F0B, #FF7043)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Entregue com
          </span>
          <br />
          Precisão.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "540px",
            lineHeight: 1.7,
            marginBottom: "44px",
          }}
        >
          Soluções de logística de ponta para empresas que não comprometem com
          qualidade, velocidade ou confiabilidade.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}
        >
          <a
            href="#contact"
            id="hero-cta-primary"
            style={{
              background: "#DE3F0B",
              color: "white",
              padding: "16px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s",
              boxShadow: "0 8px 32px rgba(222,63,11,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(222,63,11,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(222,63,11,0.4)";
            }}
          >
            Solicitar Cotação <IconArrowRight size={18} />
          </a>

          <a
            href="#services"
            id="hero-cta-secondary"
            style={{
              color: "rgba(255,255,255,0.85)",
              padding: "16px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s",
              backdropFilter: "blur(4px)",
              background: "rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
            }}
          >
            Conheça a empresa
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <IconChevronDown size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
