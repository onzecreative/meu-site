"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconMapPin,
  IconShield,
  IconChartBar,
  IconBolt,
  IconRefresh,
  IconHeadset,
} from "@tabler/icons-react";

const defaultFeatures = [
  {
    icon: "IconMapPin",
    title: "Rastreamento em Tempo Real",
    desc: "Visibilidade completa da sua carga 24h por dia, com alertas automáticos via SMS e e-mail.",
  },
  {
    icon: "IconShield",
    title: "Seguro de Carga Integrado",
    desc: "Cobertura total para todas as cargas transportadas, sem burocracia adicional.",
  },
  {
    icon: "IconChartBar",
    title: "Dashboard Analítico",
    desc: "Relatórios detalhados de performance, custos e KPIs de entrega em painel centralizado.",
  },
  {
    icon: "IconBolt",
    title: "Cotação Instantânea",
    desc: "Preços automáticos em segundos com base no peso, dimensões e destino da carga.",
  },
  {
    icon: "IconRefresh",
    title: "Gestão de Devoluções",
    desc: "Logística reversa simplificada com coleta agendada e reprocessamento ágil.",
  },
  {
    icon: "IconHeadset",
    title: "Gerente de Conta Dedicado",
    desc: "Atendimento personalizado com especialista dedicado ao seu negócio.",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  IconMapPin: <IconMapPin size={24} />,
  IconShield: <IconShield size={24} />,
  IconChartBar: <IconChartBar size={24} />,
  IconBolt: <IconBolt size={24} />,
  IconRefresh: <IconRefresh size={24} />,
  IconHeadset: <IconHeadset size={24} />,
};

export default function Features() {
  const [data, setData] = useState<{
    sectionTitle: string;
    title: string;
    items: typeof defaultFeatures;
  }>({
    sectionTitle: "Por que nos escolher",
    title: "Tecnologia e confiança em cada entrega",
    items: defaultFeatures,
  });

  useEffect(() => {
    fetch("/api/admin/section/features?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData(json);
      })
      .catch(() => {});
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" style={{ background: "#F3F4F6", padding: "120px 0" }}>
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
            color: "#111827",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}>
            {data.title}
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {data.items.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "36px",
                transition: "all 0.3s",
                border: "1px solid transparent",
                cursor: "default",
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                borderColor: "rgba(222,63,11,0.15)",
              }}
            >
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(222,63,11,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#DE3F0B",
                marginBottom: "20px",
              }}>
                {iconMap[feature.icon] || <IconMapPin size={24} />}
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#111827",
                marginBottom: "10px",
                letterSpacing: "-0.02em",
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: "#6B7280",
                fontSize: "15px",
                lineHeight: 1.65,
              }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
