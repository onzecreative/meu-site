"use client";

import React, { useState, useEffect } from 'react';
import { IconPalette, IconDeviceFloppy, IconUpload, IconReload, IconPhoto } from '@tabler/icons-react';

export default function BrandEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/brand')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setMessage("Brand settings saved successfully!");
    } catch (e) {
      setMessage("Error saving settings.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'light' | 'dark' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    
    // In a real app, this would call /api/admin/upload
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    });
    const { url } = await res.json();
    
    if (type === 'favicon') setData({ ...data, favicon: url });
    else setData({ ...data, logo: { ...data.logo, [type]: url } });
  };

  if (loading) return <div className="text-white/20">Loading Brand Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconPalette className="text-primary" /> Marca & Tema
          </h2>
          <p className="text-white/40 text-sm">Configure a identidade visual do seu site.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Alterações"}
        </button>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl font-medium animate-in slide-in-from-top-2">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Pane */}
        <div className="space-y-6">
          <Section cardTitle="Logotipos">
            <div className="grid grid-cols-2 gap-4">
              <UploadField 
                label="Logo (Versão Clara)" 
                value={data.logo.light} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, 'light')} 
              />
              <UploadField 
                label="Logo (Versão Escura)" 
                value={data.logo.dark} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, 'dark')} 
              />
            </div>
            <div className="mt-4">
               <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Nome/Logo Texto</label>
               <input 
                type="text" 
                value={data.logo.text} 
                onChange={(e) => setData({ ...data, logo: { ...data.logo, text: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
               />
            </div>
          </Section>

          <Section cardTitle="Cores da Marca">
            <div className="grid grid-cols-2 gap-4">
              <ColorField label="Cor Primária" value={data.colors.primary} onChange={(c: string) => setData({ ...data, colors: { ...data.colors, primary: c } })} />
              <ColorField label="Background Dark" value={data.colors.background_dark} onChange={(c: string) => setData({ ...data, colors: { ...data.colors, background_dark: c } })} />
              <ColorField label="Background Light" value={data.colors.background_light} onChange={(c: string) => setData({ ...data, colors: { ...data.colors, background_light: c } })} />
              <ColorField label="Texto Principal" value={data.colors.text_main} onChange={(c: string) => setData({ ...data, colors: { ...data.colors, text_main: c } })} />
            </div>
            <button className="mt-4 flex items-center gap-2 text-xs font-bold text-white/30 hover:text-white transition-colors">
              <IconReload size={14} /> Resetar para o padrão
            </button>
          </Section>

          <Section cardTitle="Tipografia">
            <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Google Font</label>
            <select 
              value={data.typography.google_font}
              onChange={(e) => setData({ ...data, typography: { ...data.typography, google_font: e.target.value, font_family: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            >
              <option value="Urbanist">Urbanist</option>
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </Section>
        </div>

        {/* Preview Pane */}
        <div className="sticky top-24 h-fit">
          <Section cardTitle="Live Preview">
            <div className="bg-white rounded-2xl p-8 space-y-6 overflow-hidden min-h-[400px]" style={{ fontFamily: data.typography.font_family }}>
              <div className="flex items-center justify-between border-b pb-6">
                <span className="font-bold text-2xl" style={{ color: data.colors.text_main }}>{data.logo.text}</span>
                <button className="px-4 py-2 rounded-lg text-white text-sm font-bold" style={{ backgroundColor: data.colors.primary }}>Button Preview</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black leading-tight" style={{ color: data.colors.text_main }}>The Quick Brown Fox Jumps Over The Lazy Dog</h3>
                <p className="text-lg opacity-60" style={{ color: data.colors.text_main }}>This is a preview of how your typography and colors will look across the website components.</p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ children, cardTitle }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-white/80 mb-6 flex items-center gap-2">
        <div className="w-1 h-3 bg-primary rounded-full" />
        {cardTitle}
      </h3>
      {children}
    </div>
  );
}

function ColorField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 block">{label}</label>
      <div className="flex gap-2">
        <div 
          className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer overflow-hidden" 
          style={{ backgroundColor: value }}
        >
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono outline-none uppercase"
        />
      </div>
    </div>
  );
}

function UploadField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 block">{label}</label>
      <div className="relative aspect-video bg-black/40 rounded-xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden group">
        {value ? (
          <img src={value} alt={label} className="w-full h-full object-contain" />
        ) : (
          <IconPhoto className="text-white/10" size={32} />
        )}
        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
          <IconUpload size={24} className="text-white mb-2" />
          <span className="text-[10px] font-bold text-white uppercase">Replace</span>
          <input type="file" className="hidden" onChange={onChange} accept="image/*" />
        </label>
      </div>
    </div>
  );
}
