"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/sobre" },
  { name: "Services", href: "/servicos" },
  { name: "Fleet", href: "/galeria" },
  { name: "Industries", href: "#industries" },
  { name: "Contact Us", href: "/contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveSegment(window.location.pathname);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 no-underline group scale-100 hover:scale-[1.02] transition-transform">
            <span className={`font-figtree font-bold text-[22px] tracking-tight flex items-center gap-1 ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>
              LogiNord
              <ArrowUpRight size={20} strokeWidth={3} className={scrolled ? 'text-[#1A1A1A]' : 'text-white'} />
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className={`flex items-center gap-8 ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>
              {navLinks.map((link) => {
                const isActive = activeSegment === link.href;
                return (
                  <li key={link.name} className="relative group">
                    <a
                      href={link.href}
                      className="text-[14px] font-semibold tracking-wide transition-colors opacity-90 hover:opacity-100"
                    >
                      {link.name}
                    </a>
                    {/* Hover Underline using before pseudo or simple span */}
                    <div className={`absolute -bottom-1 left-0 h-[2px] bg-${scrolled ? 'black' : 'white'} transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center">
            <Button 
              variant="solid" 
              text="Get a Quote" 
              href="/contato" 
            />
          </div>

          {/* Mobile Hamburguer */}
          <button
            className={`md:hidden flex items-center justify-center p-2 rounded-full ${scrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1001] bg-white flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-full text-black hover:bg-black/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <ul className="flex flex-col items-center gap-8 text-center mt-[-10vh]">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[32px] font-bold text-[#1A1A1A] hover:text-[#E8431A] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="absolute bottom-12">
              <Button variant="solid" text="Get a Quote" href="/contato" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
