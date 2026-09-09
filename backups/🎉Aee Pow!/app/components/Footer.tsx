"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

const DEFAULT_FOOTER = {
  description: "Receive our news and updates directly in your inbox.",
  copyright: "LogiNord Integrada Ltda. All rights reserved.",
  socials: {
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    facebook: "#"
  },
  columns: [
    {
      title: "Company",
      links: [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/sobre" },
        { label: "Services", url: "/servicos" },
        { label: "Fleet", url: "/galeria" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "National Freight", url: "/servicos" },
        { label: "Regional Dist.", url: "/servicos" },
        { label: "Cold Chain", url: "/servicos" },
        { label: "Courier Services", url: "/servicos" }
      ]
    }
  ],
  whatsapp: {
     number: "+1(555)123-4567",
     showFooter: true
  }
};

export default function Footer() {
  const years = new Date().getFullYear();
  const [data, setData] = useState<any>(DEFAULT_FOOTER);

  useEffect(() => {
    fetch("/api/admin/footer?t=" + Date.now())
      .then(r => r.json())
      .then(json => {
         if(json && json.columns) setData(json);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-24 pb-12 px-[16px] md:px-[40px] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
        
        {/* Newsletter / Brand */}
        <div className="w-full md:w-[35%] flex flex-col items-start pr-0 md:pr-12">
          <a href="/" className="font-urbanist font-bold text-[28px] flex items-center gap-1 mb-8 text-white no-underline group">
            LogiNord <ArrowUpRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <p className="text-white/60 mb-8 max-w-[300px]">
            {data.description}
          </p>
          <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-[56px] px-[16px] py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="w-full bg-[#E8431A] text-white font-bold rounded-[56px] px-[16px] py-4 hover:bg-[#d03a15] transition-colors flex items-center justify-center gap-2 group">
              Subscribe <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="w-full md:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {data.columns.map((col: any, i: number) => (
            <div key={i} className="flex flex-col">
              <h4 className="font-bold text-[14px] uppercase tracking-wider mb-6">{col.title}</h4>
              <ul className="flex flex-col gap-4 text-white/60 text-[15px]">
                {col.links.map((link: any, li: number) => (
                  <li key={li}><a href={link.url} className="hover:text-white transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] uppercase tracking-wider mb-6">Connect</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-[15px]">
              {data.socials.linkedin && <li><a href={data.socials.linkedin} className="hover:text-white group transition-colors flex items-center gap-1">LinkedIn <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>}
              {data.socials.twitter && <li><a href={data.socials.twitter} className="hover:text-white group transition-colors flex items-center gap-1">Twitter <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>}
              {data.socials.instagram && <li><a href={data.socials.instagram} className="hover:text-white group transition-colors flex items-center gap-1">Instagram <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>}
              {data.socials.facebook && <li><a href={data.socials.facebook} className="hover:text-white group transition-colors flex items-center gap-1">Facebook <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>}
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[14px] text-white/40 gap-4">
        <p>© {years} {data.copyright}</p>
        <p>All rights reserved. Made based on Framer Clone Specs.</p>
      </div>
    </footer>
  );
}
