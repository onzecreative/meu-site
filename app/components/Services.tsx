"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconTruckDelivery,
  IconPackage,
  IconTemperature,
  IconCrane,
  IconArrowRight,
} from "@tabler/icons-react";

const defaultServices = [
  {
    number: "01",
    title: "Frete Rodoviário",
    description:
      "Cobertura nacional completa com rastreamento em tempo real. Transferências porta a porta com frota moderna e motoristas certificados.",
    icon: "IconTruckDelivery",
    tags: ["Full TL", "LTL", "Rastreamento GPS"],
  },
  {
    number: "02",
    title: "Logística Last-Mile",
    description:
      "Entrega urbana expressa com gestão de rotas otimizada por IA. Confirmação de entrega fotográfica e assinatura digital.",
    icon: "IconPackage",
    tags: ["Express", "Same-day", "Prova de entrega"],
  },
  {
    number: "03",
    title: "Carga Frigorificada",
    description:
      "Transporte com controle rigoroso de temperatura para alimentos, farmacêuticos e produtos sensíveis. Conformidade total com ANVISA.",
    icon: "IconTemperature",
    tags: ["2°C–8°C", "Congelados", "Farmacêuticos"],
  },
  {
    number: "04",
    title: "Carga Pesada & Especial",
    description:
      "Equipamentos de grande porte, maquinários industriais e cargas indivisíveis com escolta e licenças de transporte.",
    icon: "IconCrane",
    tags: ["Over-dimensional", "Escolta", "Licenciado"],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  IconTruckDelivery: <IconTruckDelivery size={28} />,
  IconPackage: <IconPackage size={28} />,
  IconTemperature: <IconTemperature size={28} />,
  IconCrane: <IconCrane size={28} />,
};

export default function Services() {
  const [data, setData] = useState<{
    sectionTitle: string;
    title: string;
    description: string;
    items: typeof defaultServices;
  }>({
    sectionTitle: "Nossos Serviços",
    title: "Soluções para cada tipo de carga",
    description: "Da coleta à entrega, cuidamos de tudo com tecnologia, eficiência e comprometimento total com o seu negócio.",
    items: defaultServices,
  });

  useEffect(() => {
    fetch("/api/admin/section/services?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData(json);
      })
      .catch(() => {});
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" style={{ background: "#1C1C1C", padding: "120px 0" }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "start",
      }}>
        {/* Left sticky panel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ position: "sticky", top: "120px" }}
        >
          <p style={{
            color: "#DE3F0B",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            {data.sectionTitle}
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 4vw, 52px)",
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}>
            {data.title}
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "16px",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}>
            {data.description}
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px 28px",
              borderRadius: "100px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "15px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.border = "1px solid #DE3F0B";
              (e.currentTarget as HTMLElement).style.color = "#DE3F0B";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
          >
            Ver todos os serviços <IconArrowRight size={16} />
          </a>
        </motion.div>

        {/* Right scrollable cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {(data.items || []).map((service, i) => (
            <motion.div
              key={service.number + i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "36px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              whileHover={{ y: -4, backgroundColor: "rgba(222,63,11,0.05)", borderColor: "rgba(222,63,11,0.2)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <span style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.05em",
                }}>
                  {service.number}
                </span>
                <div style={{ color: "#DE3F0B" }}>{iconMap[service.icon] || <IconPackage size={28} />}</div>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: "white",
                marginBottom: "14px",
                letterSpacing: "-0.02em",
              }}>
                {service.title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "15px",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}>
                {service.description}
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {service.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.06)",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    letterSpacing: "0.03em",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #services > div { grid-template-columns: 1fr !important; }
          #services > div > div:first-child { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </section>
  );
}
