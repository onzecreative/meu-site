"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";

const DEFAULT_FOOTER = {
  description: "Ecossistema digital completo para acelerar o crescimento da sua empresa com inovação, tecnologia e estratégia.",
  copyright: "Onze Negócios Ltda. Todos os direitos reservados.",
  socials: {
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
  columns: [
    {
      title: "Empresa",
      links: [
        { label: "Início", url: "/" },
        { label: "Sobre a Onze", url: "/sobre" },
        { label: "Soluções", url: "/servicos" },
        { label: "Cases", url: "/galeria" },
      ],
    },
    {
      title: "Soluções",
      links: [
        { label: "Tráfego Pago", url: "/servicos" },
        { label: "Automação com IA", url: "/servicos" },
        { label: "Websites", url: "/servicos" },
        { label: "Consultoria", url: "/servicos" },
      ],
    },
    {
      title: "Treinamentos",
      links: [
        { label: "Mentorias", url: "/servicos" },
        { label: "Capacitação de Equipes", url: "/servicos" },
        { label: "Workshops", url: "/servicos" },
      ],
    },
  ],
  whatsapp: {
    number: "",
    showFooter: false,
  },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [data, setData] = useState<any>(DEFAULT_FOOTER);

  useEffect(() => {
    fetch("/api/admin/footer?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => { if (json?.columns) setData(json); })
      .catch(() => {});
  }, []);

  return (
    <footer
      className="w-full pt-20 pb-12 px-4 md:px-10 mt-auto border-t border-white/[0.08]"
      style={{ background: "#030305" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-12 justify-between">

        {/* Brand side */}
        <div className="w-full md:w-[32%] flex flex-col items-start">
          <a href="/" className="flex items-center gap-2.5 no-underline mb-6 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full bg-[#08090E] rounded-[11px] flex items-center justify-center">
                <span className="text-white font-black text-xs">11</span>
              </div>
            </div>
            <span className="font-extrabold text-[20px] text-white tracking-tight">
              Onze<span className="text-cyan-400">.</span>
            </span>
          </a>

          <p className="text-[#9496A1] text-[14px] leading-relaxed mb-6 max-w-[300px] font-light">
            {data.description}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SISTEMAS OPERACIONAIS // 99.9% UPTIME</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {data.socials?.instagram && (
              <a
                href={data.socials.instagram}
                className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[#9496A1] hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <Instagram size={15} />
              </a>
            )}
            {data.socials?.linkedin && (
              <a
                href={data.socials.linkedin}
                className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[#9496A1] hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <Linkedin size={15} />
              </a>
            )}
            {data.socials?.twitter && (
              <a
                href={data.socials.twitter}
                className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[#9496A1] hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <Twitter size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Links columns */}
        <div className="w-full md:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
          {data.columns.map((col: any, i: number) => (
            <div key={i} className="flex flex-col">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/50 mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link: any, li: number) => (
                  <li key={li}>
                    <a
                      href={link.url}
                      className="text-[#9496A1] text-[14px] hover:text-white transition-colors flex items-center gap-1 group font-light"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-white/[0.06] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-white/40 font-mono">
          © {year} {data.copyright}
        </p>
        <div className="flex items-center gap-2 text-[12px] text-white/40 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Arquitetado com Design System Moderno & WebGL 3D</span>
        </div>
      </div>
    </footer>
  );
}
