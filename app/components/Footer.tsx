"use client";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTwitter,
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
  description: "Reliable transport. Real-time tracking. Tailored logistics for your business.",
  columns: [
    {
      id: "col1",
      title: "Company",
      links: [{ id: "l1", text: "Home", url: "#" }, { id: "l2", text: "About Us", url: "#features" }, { id: "l3", text: "Services", url: "#services" }],
    },
    {
      id: "col2",
      title: "Legal",
      links: [{ id: "l4", text: "Privacy Policy", url: "#" }, { id: "l5", text: "Terms of Service", url: "#" }],
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
      .then((data) => setConfig(prev => ({ ...prev, ...data })))
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

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer id="contact" className="w-full bg-[#111111] pt-32 pb-12 rounded-t-[40px] mt-[-40px] z-10 relative">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8" ref={ref}>
        
        {/* Left Column - Brand & CTA */}
        <div className="col-span-1 md:col-span-5 flex flex-col items-start pr-0 md:pr-12">
          <a href="#" className="flex items-center gap-2 text-white no-underline mb-12">
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] tracking-tight text-white flex items-center gap-1">
              LogiNord
            </span>
          </a>

          <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[40px] text-white leading-[1.1] tracking-[-0.02em] mb-4">
            Ready to start? Let&apos;s work together.
          </h3>
          <p className="text-white/60 text-[16px] leading-[1.6] mb-12 max-w-[340px]">
            {config?.description ?? ""}
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#E0400C] hover:bg-[#ff551b] text-white px-6 py-3.5 rounded-full text-[15px] font-bold transition-all w-fit shadow-lg shadow-[#E0400C]/20"
          >
            Falar no WhatsApp
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <IconArrowRight size={16} />
            </div>
          </a>
        </div>

        {/* Center Columns - Links */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-2 gap-8 md:pt-4">
          {(config?.columns || []).map((col) => (
            <div key={col?.id ?? Math.random()} className="flex flex-col">
              <h4 className="text-white/40 text-[13px] font-bold uppercase tracking-wider mb-8">
                {col?.title ?? ""}
              </h4>
              <ul className="flex flex-col gap-4">
                {(col?.links || []).map((link) => (
                  <li key={link?.id ?? Math.random()}>
                    <a
                      href={link?.url ?? "#"}
                      className="text-white/60 hover:text-white text-[15px] font-medium transition-colors"
                    >
                      {link?.text ?? ""}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Column - Newsletter */}
        <div className="col-span-1 md:col-span-3 flex flex-col md:pt-4">
          <h4 className="text-white/40 text-[13px] font-bold uppercase tracking-wider mb-8">
            Stay in the loop
          </h4>
          <p className="text-white/70 text-[15px] mb-6">
            Receive our news and updates directly in your inbox.
          </p>
          
          {submitted ? (
            <div className="bg-[#E0400C]/10 border border-[#E0400C]/20 text-[#E0400C] px-4 py-3 rounded-xl text-[14px] font-medium">
              ✓ Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[15px] outline-none focus:border-white/30 transition-colors placeholder-white/40"
              />
              <button
                type="submit"
                className="w-full bg-white text-[#111111] hover:bg-gray-200 px-5 py-3.5 rounded-xl text-[15px] font-bold transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
              </button>
            </form>
          )}

          {/* Social Icons */}
          <div className="flex gap-3 mt-12">
            {[IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-[14px]">
          © {new Date().getFullYear()} LogiNord. Made in Framer template clone.
        </p>
        <p className="text-white/30 text-[14px]">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
