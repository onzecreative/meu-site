"use client";

import React from 'react';
import { IconExternalLink, IconLogout, IconUser } from '@tabler/icons-react';

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-white/60">Admin Panel</h2>
        <span className="text-white/10">/</span>
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full"
        >
          <IconExternalLink size={14} />
          View Live Site
        </a>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
            <IconUser size={18} />
          </div>
          <span className="text-sm font-medium text-white/80">Administrator</span>
        </div>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-red-500 transition-all"
        >
          <IconLogout size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
