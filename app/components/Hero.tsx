"use client";
import { motion } from "framer-motion";
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

export default function Hero() {
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
      {/* Background with gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(222,63,11,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(222,63,11,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)
        `,
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(222,63,11,0.12) 0%, transparent 70%)",
          top: "-200px",
          right: "-100px",
          pointerEvents: "none",
        }}
      />

      <div style={{
        position: "relative",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "120px 24px 80px",
        width: "100%",
      }}>
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
                background: "rgba(222,63,11,0.12)",
                border: "1px solid rgba(222,63,11,0.3)",
                borderRadius: "100px",
                padding: "6px 14px",
                fontSize: "13px",
                color: "#FF7043",
                fontWeight: 500,
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
          <span style={{
            background: "linear-gradient(135deg, #DE3F0B, #FF7043)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
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
            color: "rgba(255,255,255,0.55)",
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
              color: "rgba(255,255,255,0.8)",
              padding: "16px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
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
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <IconChevronDown size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
