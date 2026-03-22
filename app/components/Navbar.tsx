"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconArrowRight } from "@tabler/icons-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#quickfacts" },
  { label: "Industries", href: "#industries" },
  { label: "Contact Us", href: "#contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#111111]/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 text-white no-underline group scale-100 hover:scale-105 transition-transform">
          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[22px] tracking-tight text-white flex items-center gap-1">
            LogiNord
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white hover:text-white/70 text-[13px] font-bold tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-[#E0400C] hover:bg-[#ff551b] text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-lg shadow-[#E0400C]/20 hover:shadow-[#E0400C]/40 hover:-translate-y-0.5 border border-[#E0400C]"
          >
            Get a Quote <IconArrowRight size={16} />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
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
            className="md:hidden bg-[#111111] border-t border-white/10 px-6 py-4 absolute top-full left-0 w-full"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-white text-lg font-semibold border-b border-white/10 pb-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex justify-center items-center gap-2 bg-[#E0400C] text-white px-5 py-3 rounded-full text-[15px] font-bold"
              >
                Get a Quote <IconArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
