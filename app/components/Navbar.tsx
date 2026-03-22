"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-[#111111]/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-white no-underline group scale-100 hover:scale-105 transition-transform z-50">
          <span className="font-playfair font-medium text-[22px] tracking-tight text-white flex items-center gap-1">
            LogiNord
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full relative">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-white/80 hover:text-white text-[13px] font-bold tracking-wide transition-colors py-1"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="relative z-10">{link.label}</span>
              {hoveredLink === link.label && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#E0400C]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4 z-50">
          <a
            href="/contato"
            className="hidden md:flex items-center gap-2 bg-[#E0400C] hover:bg-[#ff551b] text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-lg shadow-[#E0400C]/20 hover:shadow-[#E0400C]/40 hover:-translate-y-0.5 border border-[#E0400C] overflow-hidden relative group"
          >
            <span className="relative z-10 flex items-center gap-2">Solicitar Orçamento <ArrowRight size={16} /></span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#111111]/95 backdrop-blur-xl border-l border-white/10 p-8 flex flex-col justify-center z-40"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-[#E0400C] text-2xl font-playfair font-semibold border-b border-white/10 pb-4 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href="/contato"
                onClick={() => setMenuOpen(false)}
                className="mt-8 flex justify-center items-center gap-2 bg-[#E0400C] text-white px-5 py-3 rounded-full text-[16px] font-bold"
              >
                Orçamento <ArrowRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.header>
  );
}
