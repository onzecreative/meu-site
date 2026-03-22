"use client";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const years = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-24 pb-12 px-[16px] md:px-[40px] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
        
        {/* Newsletter / Brand */}
        <div className="w-full md:w-[35%] flex flex-col items-start pr-0 md:pr-12">
          <a href="/" className="font-urbanist font-bold text-[28px] flex items-center gap-1 mb-8 text-white no-underline group">
            LogiNord <ArrowUpRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <p className="text-white/60 mb-8 max-w-[300px]">
            Receive our news and updates directly in your inbox.
          </p>
          <form className="w-full flex flex-col gap-4">
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
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] uppercase tracking-wider mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-[15px]">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/sobre" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/servicos" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/galeria" className="hover:text-white transition-colors">Fleet</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] uppercase tracking-wider mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-[15px]">
              <li><a href="/servicos" className="hover:text-white transition-colors">National Freight</a></li>
              <li><a href="/servicos" className="hover:text-white transition-colors">Regional Dist.</a></li>
              <li><a href="/servicos" className="hover:text-white transition-colors">Cold Chain</a></li>
              <li><a href="/servicos" className="hover:text-white transition-colors">Courier Services</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] uppercase tracking-wider mb-6">Contacts</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-[15px]">
              <li>hello@loginord.com</li>
              <li>+1 (555) 123-4567</li>
              <li>+44 (0) 20 7123</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[14px] uppercase tracking-wider mb-6">Connect</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-[15px]">
              <li><a href="#" className="hover:text-white group transition-colors flex items-center gap-1">LinkedIn <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>
              <li><a href="#" className="hover:text-white group transition-colors flex items-center gap-1">Twitter <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>
              <li><a href="#" className="hover:text-white group transition-colors flex items-center gap-1">Instagram <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>
              <li><a href="#" className="hover:text-white group transition-colors flex items-center gap-1">Facebook <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[14px] text-white/40 gap-4">
        <p>© {years} LogiNord Integrada Ltda.</p>
        <p>All rights reserved. Made based on Framer Clone Specs.</p>
      </div>
    </footer>
  );
}
