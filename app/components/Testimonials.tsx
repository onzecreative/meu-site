"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight, IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    quote:
      "A LogiNord transformou completamente nossa operação logística. Reduziu nosso custo de frete em 23% e o prazo de entrega em dois dias. Simplesmente excepcional.",
    name: "Fernanda Lima",
    role: "Diretora de Operações",
    company: "Grupo Alimentar BRF",
    initials: "FL",
    color: "#DE3F0B",
  },
  {
    quote:
      "O sistema de rastreamento em tempo real nos dá total visibilidade. Nossos clientes adoram os alertas automáticos. Nunca tivemos tanta confiança na nossa cadeia de suprimentos.",
    name: "Rodrigo Mendes",
    role: "Gerente de Logística",
    company: "TechFarm Solution",
    initials: "RM",
    color: "#1a6fbf",
  },
  {
    quote:
      "Para o setor farmacêutico, qualidade e conformidade são críticas. A LogiNord entende isso perfeitamente. Zero incidentes em 3 anos de parceria.",
    name: "Dra. Carla Souza",
    role: "Supply Chain Manager",
    company: "EuroFarma Brasil",
    initials: "CS",
    color: "#2e7d32",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      style={{ background: "#1C1C1C", padding: "120px 0" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            color: "#DE3F0B",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            Depoimentos
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "white",
            letterSpacing: "-0.03em",
            marginBottom: "64px",
          }}>
            O que nossos clientes dizem
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "56px 48px",
              marginBottom: "40px",
              position: "relative",
            }}
          >
            <IconQuote
              size={40}
              style={{
                color: "#DE3F0B",
                opacity: 0.3,
                position: "absolute",
                top: "28px",
                left: "36px",
              }}
            />
            <p style={{
              fontSize: "clamp(16px, 2vw, 21px)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.75,
              fontStyle: "italic",
              marginBottom: "40px",
              letterSpacing: "0.01em",
            }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: t.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "16px",
                color: "white",
                flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "16px", color: "white" }}>
                  {t.name}
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                  {t.role} · {t.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={prev}
            id="testimonial-prev"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#DE3F0B";
              (e.currentTarget as HTMLElement).style.color = "#DE3F0B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
          >
            <IconChevronLeft size={20} />
          </button>

          <div style={{ display: "flex", gap: "8px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "100px",
                  border: "none",
                  background: i === current ? "#DE3F0B" : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            id="testimonial-next"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#DE3F0B";
              (e.currentTarget as HTMLElement).style.color = "#DE3F0B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
          >
            <IconChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
