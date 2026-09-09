"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface NavbarData {
  logoText?: string;
  links: { name: string; href: string }[];
  cta: { text: string; href: string };
}

const DEFAULT_NAVBAR: NavbarData = {
  logoText: "Onze",
  links: [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Soluções", href: "/servicos" },
    { name: "Cases", href: "/galeria" },
    { name: "Contato", href: "/contato" },
  ],
  cta: { text: "Fale Conosco", href: "/contato" },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState("");
  const [data, setData] = useState<NavbarData>(DEFAULT_NAVBAR);

  useEffect(() => {
    fetch("/api/admin/navbar?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => {
        if (json?.links) setData(json);
      })
      .catch(() => {});

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveSegment(window.location.pathname);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1000] px-4 md:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Main Floating Glass Capsule */}
          <nav
            className={`w-full flex items-center justify-between px-5 py-3 rounded-full pointer-events-auto transition-all duration-500 border ${
              scrolled
                ? "bg-[#08090E]/85 backdrop-blur-xl border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                : "bg-[#08090E]/50 backdrop-blur-md border-white/[0.06]"
            }`}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group no-underline">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <div className="w-full h-full bg-[#08090E] rounded-[11px] flex items-center justify-center">
                  <span className="text-white font-black text-sm tracking-tighter">11</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[17px] tracking-tight text-white flex items-center gap-1 leading-none">
                  Onze<span className="text-cyan-400">.</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                  Digital Core
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.04]">
              {data.links.map((link) => {
                const isActive = activeSegment === link.href;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? "bg-white/[0.08] text-white shadow-sm border border-white/[0.08]"
                          : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right Side: Status indicator & CTA */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </div>

              <a
                href={data.cta.href}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                }}
              >
                <span>{data.cta.text}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center p-2 text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1001] flex flex-col justify-between p-6 bg-[#030305]/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white">Onze<span className="text-cyan-400">.</span></span>
              </div>
              <button
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <ul className="flex flex-col gap-4 my-auto">
              {data.links.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white/80 hover:text-white flex items-center justify-between p-3 rounded-xl hover:bg-white/5"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={18} className="text-white/40" />
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/10">
              <a
                href={data.cta.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl text-center font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <span>{data.cta.text}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
