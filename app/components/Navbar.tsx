"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconTruck,
  IconMenu2,
  IconX,
  IconArrowRight,
} from "@tabler/icons-react";

const navLinks = [
  { label: "Serviços", href: "#services" },
  { label: "Setores", href: "#industries" },
  { label: "Sobre", href: "#features" },
  { label: "Depoimentos", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "16px 0",
        background: scrolled
          ? "rgba(18,18,18,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
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
            letterSpacing: "-0.02em",
          }}>
            LogiNord
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "36px" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="#" style={{
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 500,
          }} className="hidden-mobile">
            Entrar
          </a>
          <a
            href="#contact"
            style={{
              background: "#DE3F0B",
              color: "white",
              padding: "10px 22px",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#FF5722";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#DE3F0B";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Solicitar Cotação <IconArrowRight size={16} />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              display: "none",
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#1a1a1a",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "20px 24px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "17px",
                  fontWeight: 500,
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
