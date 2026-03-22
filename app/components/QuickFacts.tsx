"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const defaultStats = [
  { number: "98.6%", label: "Entregas no Prazo", sub: "nos últimos 12 meses" },
  { number: "12K+", label: "Clientes Ativos", sub: "em todo o Brasil" },
  { number: "500+", label: "Veículos na Frota", sub: "rastreados em tempo real" },
  { number: "24/7", label: "Suporte Disponível", sub: "365 dias por ano" },
];

const defaultPartners = [
  "Ambev", "Vale", "Petrobras", "BRF", "Embraer",
  "Ambev", "Vale", "Petrobras", "BRF", "Embraer",
];

export default function QuickFacts() {
  const [data, setData] = useState<{
    sectionTitle: string;
    title: string;
    stats: typeof defaultStats;
    partners: typeof defaultPartners;
  }>({
    sectionTitle: "Números que falam por si",
    title: "Resultados reais, clientes satisfeitos",
    stats: defaultStats,
    partners: defaultPartners,
  });

  useEffect(() => {
    fetch("/api/admin/section/quickfacts?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData(json);
      })
      .catch(() => {});
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" style={{ background: "#F3F4F6", padding: "100px 0 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
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
            color: "#111827",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            {data.title}
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginBottom: "80px", // Retained from original, as the snippet didn't explicitly remove it from the outer div
        }}>
          {(data.stats || []).map((stat, i) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "white",
                padding: "48px 36px",
                textAlign: "center",
              }}
            >
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 5vw, 60px)",
                color: "#DE3F0B",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: "12px",
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "6px",
              }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280" }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner strip */}
      <div style={{
        background: "#111827",
        padding: "28px 0",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 25s linear infinite",
        }}>
          {[...data.partners, ...data.partners].map((p, i) => (
            <span key={i} style={{
              padding: "0 48px",
              fontSize: "18px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
