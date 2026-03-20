"use client";
import { useState } from "react";
import {
  IconTruck,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTwitter,
  IconArrowRight,
} from "@tabler/icons-react";

const footerLinks = {
  Serviços: [
    "Frete Rodoviário",
    "Last-Mile",
    "Carga Frigorificada",
    "Carga Especial",
    "Logística Reversa",
  ],
  Empresa: [
    "Sobre nós",
    "Carreiras",
    "Blog",
    "Imprensa",
    "Sustentabilidade",
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" style={{ background: "#0a0a0a", paddingTop: "80px" }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px 60px",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
        gap: "60px",
      }}>
        {/* Brand + Newsletter */}
        <div>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "20px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "#DE3F0B",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconTruck size={20} color="white" />
            </div>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "20px",
              color: "white",
            }}>
              LogiNord
            </span>
          </a>

          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "14px",
            lineHeight: 1.7,
            marginBottom: "28px",
          }}>
            Logística de precisão para empresas que exigem o melhor. Tecnologia
            e compromisso em cada entrega.
          </p>

          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>
            Receba nossas novidades
          </p>
          {submitted ? (
            <p style={{ color: "#DE3F0B", fontSize: "14px", fontWeight: 600 }}>
              ✓ Inscrito com sucesso!
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                id="newsletter-submit"
                style={{
                  background: "#DE3F0B",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Service & Company Links */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              {category}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {links.map((link) => (
                <li key={link} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            Contato
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: <IconPhone size={16} />, text: "+55 (11) 3000-4000" },
              { icon: <IconMail size={16} />, text: "contato@loginord.com.br" },
              { icon: <IconMapPin size={16} />, text: "São Paulo, SP – Brasil" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#DE3F0B" }}>{icon}</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            {[IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter].map((Icon, i) => (
              <a key={i} href="#" style={{
                width: "36px", height: "36px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#DE3F0B";
                  (e.currentTarget as HTMLElement).style.color = "#DE3F0B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>
          © {new Date().getFullYear()} LogiNord. Todos os direitos reservados.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
