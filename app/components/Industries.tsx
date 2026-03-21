"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const defaultIndustries = [
  {
    title: "Alimentos & Bebidas",
    desc: "Cadeia de frio completa, rastreabilidade e conformidade sanitária para produtos perecíveis.",
    emoji: "🥩",
  },
  {
    title: "Farmacêutico",
    desc: "Transporte especializado com controle de temperatura, documentação e conformidade ANVISA.",
    emoji: "💊",
  },
  {
    title: "Automotivo",
    desc: "JIT delivery, gestão de estoques e logística de peças com rastreamento avançado.",
    emoji: "🚗",
  },
  {
    title: "E-commerce",
    desc: "Fulfillment, last-mile urbano e gestão de devoluções para operações de alta escala.",
    emoji: "📦",
  },
  {
    title: "Construção Civil",
    desc: "Movimentação de materiais pesados, equipamentos e insumos para obras em todo o país.",
    emoji: "🏗️",
  },
  {
    title: "Varejo",
    desc: "Reabastecimento de lojas, cross-docking e gestão de estoque com precisão e velocidade.",
    emoji: "🏪",
  },
];

export default function Industries() {
  const [data, setData] = useState<{
    sectionTitle: string;
    title: string;
    description: string;
    items: typeof defaultIndustries;
  }>({
    sectionTitle: "Setores Atendidos",
    title: "Expertise em cadasegmento de mercado",
    description: "Décadas de experiência nos principais setores da economia brasileira.",
    items: defaultIndustries,
  });

  useEffect(() => {
    fetch("/api/admin/section/industries?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData(json);
      })
      .catch(() => {});
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="industries"
      style={{
        background: "#111",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        bottom: "-200px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(222,63,11,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <p style={{
            color: "#DE3F0B",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            {data.sectionTitle}
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}>
            {data.title}
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "17px",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            {data.description}
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
        }}>
          {data.items.map((industry, i) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: `linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(20,20,20,0.9) 100%)`,
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "44px 36px",
                cursor: "pointer",
                transition: "all 0.35s",
              }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(222,63,11,0.3)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: "44px", marginBottom: "20px" }}>
                {industry.emoji}
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "white",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}>
                {industry.title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "15px",
                lineHeight: 1.65,
              }}>
                {industry.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
