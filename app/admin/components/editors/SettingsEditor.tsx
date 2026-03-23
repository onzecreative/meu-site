"use client";

import React, { useState, useEffect } from 'react';
import { IconSettings, IconDeviceFloppy, IconSearch, IconLink, IconMail } from '@tabler/icons-react';

export default function SettingsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Settings saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Settings...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconSettings className="text-primary" /> Configurações Gerais
          </h2>
          <p className="text-white/40 text-sm">Gerencie o SEO, integrações e informações do site.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
           <IconSearch size={16} /> SEO & Metadados
        </h3>
        <div className="space-y-4">
           <div>
              <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Título da Página (Meta Title)</label>
              <input 
                type="text" 
                value={data.seo.title} 
                onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/50 text-white font-medium"
              />
           </div>
           <div>
              <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Descrição (Meta Description)</label>
              <textarea 
                value={data.seo.description} 
                onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary/50 text-white/80"
              />
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
           <IconLink size={16} /> Informações de Contato & URL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Site URL</label>
              <input 
                type="text" 
                value={data.siteInfo.url} 
                onChange={(e) => setData({ ...data, siteInfo: { ...data.siteInfo, url: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                placeholder="https://..."
              />
           </div>
           <div>
              <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Email Suporte</label>
              <input 
                type="text" 
                value={data.siteInfo.email} 
                onChange={(e) => setData({ ...data, siteInfo: { ...data.siteInfo, email: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
           </div>
           <div>
              <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Telefone</label>
              <input 
                type="text" 
                value={data.siteInfo.phone} 
                onChange={(e) => setData({ ...data, siteInfo: { ...data.siteInfo, phone: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-60">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
           <IconMail size={16} /> SMTP & Envios (Avançado)
        </h3>
        <p className="text-[10px] text-white/30 mb-4 italic">Estas configurações requerem reinicialização do servidor em alguns casos.</p>
        <div className="grid grid-cols-2 gap-4">
           <div className="h-8 bg-white/5 rounded animate-pulse" />
           <div className="h-8 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
