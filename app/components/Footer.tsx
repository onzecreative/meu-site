"use client";
import { useState, useEffect } from "react";
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

interface FooterLink {
  id: string;
  text: string;
  url: string;
}

interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

interface FooterConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  description: string;
  columns: FooterColumn[];
}

const defaultConfig: FooterConfig = {
  whatsappNumber: "5511900000000",
  whatsappMessage: "Olá! Gostaria de solicitar uma cotação.",
  description: "Logística de precisão para empresas que exigem o melhor. Tecnologia e compromisso em cada entrega.",
  columns: [
    {
      id: "col1",
      title: "Blog",
      links: [{ id: "l1", text: "Ver posts", url: "/blog" }],
    },
    {
      id: "col2",
      title: "Carreiras",
      links: [{ id: "l2", text: "Vagas abertas", url: "/carreiras" }],
    },
  ],
};

export default function Footer() {
  const [config, setConfig] = useState<FooterConfig>(defaultConfig);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/admin/footer?t=" + Date.now())
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  const whatsappHref = `https://wa.me/${config?.whatsappNumber ?? ""}?text=${encodeURIComponent(config?.whatsappMessage ?? "")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" style={{ background: "#0a0a0a", paddingTop: "80px" }}>
      <div
        className="footer-grid"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px 60px",
          display: "grid",
          gridTemplateColumns: "1.5fr repeat(auto-fit, minmax(140px, 1fr)) 280px",
          gap: "52px",
          alignItems: "start",
        }}
      >
        {/* ── Brand + Newsletter ── */}
        <div>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "#DE3F0B",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconTruck size={20} color="white" />
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: "white",
              }}
            >
              LogiNord
            </span>
          </a>

          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "28px",
              maxWidth: "280px",
            }}
          >
            {config?.description ?? ""}
          </p>

          {/* Newsletter */}
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Receba nossas novidades
          </p>
          {submitted ? (
            <p style={{ color: "#25D366", fontSize: "14px", fontWeight: 600 }}>
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

        {/* ── Link Columns (dynamic) ── */}
        {(config.columns || []).map((col) => (
          <div key={col.id}>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {col?.title ?? ""}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {(col?.links || []).map((link) => (
                <li key={link?.id ?? Math.random()} style={{ marginBottom: "12px" }}>
                  <a
                    href={link?.url ?? "#"}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "white")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    {link?.text ?? ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* ── Contact Column ── */}
        <div>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Contato
          </h4>

          {/* WhatsApp CTA button */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-whatsapp-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "white",
              padding: "14px 20px",
              borderRadius: "14px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "24px",
              boxShadow: "0 6px 24px rgba(37,211,102,0.35)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 10px 32px rgba(37,211,102,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 24px rgba(37,211,102,0.35)";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Falar no WhatsApp
          </a>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {[
              { icon: <IconPhone size={15} />, text: "+55 (11) 3000-4000", href: "tel:+551130004000" },
              {
                icon: <IconMail size={15} />,
                text: "contato@loginord.com.br",
                href: "mailto:contato@loginord.com.br",
              },
              {
                icon: <IconMapPin size={15} />,
                text: "São Paulo, SP – Brasil",
                href: "#",
              },
            ].map(({ icon, text, href }) => (
              <a
                key={text}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "white")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.5)")
                }
              >
                <span style={{ color: "#DE3F0B", flexShrink: 0 }}>{icon}</span>
                {text}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { Icon: IconBrandLinkedin, href: "#" },
              { Icon: IconBrandInstagram, href: "#" },
              { Icon: IconBrandTwitter, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#DE3F0B";
                  (e.currentTarget as HTMLElement).style.color = "#DE3F0B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.4)";
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>
          © {new Date().getFullYear()} LogiNord. Todos os direitos reservados.
        </p>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1.5fr repeat(2, 1fr) 280px;
        }
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
