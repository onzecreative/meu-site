"use client";

import React from 'react';
import { 
  IconLayoutDashboard, 
  IconPalette, 
  IconMenu2, 
  IconSmartHome, 
  IconChartBar, 
  IconUsers, 
  IconSettings, 
  IconBriefcase, 
  IconBuildingCommunity, 
  IconCircleCheck, 
  IconMessageChatbot, 
  IconMail, 
  IconHelp, 
  IconAffiliate,
  IconPhoto,
  IconTarget,
  IconInfoCircle
} from '@tabler/icons-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <IconLayoutDashboard size={20} /> },
  { id: 'brand', label: 'Marca & Tema', icon: <IconPalette size={20} /> },
  { id: 'navbar', label: 'Menu (Navbar)', icon: <IconMenu2 size={20} /> },
  { id: 'hero', label: 'Hero', icon: <IconSmartHome size={20} /> },
  { id: 'stats', label: 'Fatos Rápidos (Quick Facts)', icon: <IconChartBar size={20} /> },
  { id: 'clients', label: 'Clientes & Logos', icon: <IconUsers size={20} /> },
  { id: 'services', label: 'Serviços', icon: <IconBriefcase size={20} /> },
  { id: 'industries', label: 'Indústrias', icon: <IconBuildingCommunity size={20} /> },
  { id: 'whyus', label: 'Por Que Nós', icon: <IconCircleCheck size={20} /> },
  { id: 'testimonials', label: 'Depoimentos', icon: <IconMessageChatbot size={20} /> },
  { id: 'finalcta', label: 'Chamada Final (CTA)', icon: <IconTarget size={20} /> },
  { id: 'sobre', label: 'Página Sobre', icon: <IconInfoCircle size={20} /> },
  { id: 'gallery', label: 'Galeria', icon: <IconPhoto size={20} /> },
  { id: 'contact', label: 'Formulário', icon: <IconMail size={20} /> },
  { id: 'faq', label: 'FAQ', icon: <IconHelp size={20} /> },
  { id: 'footer', label: 'Rodapé', icon: <IconAffiliate size={20} /> },
  { id: 'settings', label: 'Configurações Gerais', icon: <IconSettings size={20} /> },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-white/5 bg-[#0d0d0d] flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">L</div>
          <span className="font-urbanist font-black text-xl tracking-tight text-white">LogiNord</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${activeTab === item.id 
                ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'}
            `}
          >
            <span className={activeTab === item.id ? 'text-primary' : ''}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/5">
        <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Status do Site</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-white/80">Online & Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
