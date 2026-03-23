"use client";

import React, { useState, useEffect } from 'react';
import { IconUsers, IconDeviceFloppy, IconPlus, IconTrash, IconUpload, IconPhoto } from '@tabler/icons-react';

export default function ClientsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/clients')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Clients updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addLogo = () => {
    setData({ ...data, logos: [...data.logos, { url: "/images/logos/placeholder.svg", alt: "New Client" }] });
  };

  const removeLogo = (index: number) => {
    const newLogos = [...data.logos];
    newLogos.splice(index, 1);
    setData({ ...data, logos: newLogos });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const { url } = await res.json();
    const newLogos = [...data.logos];
    newLogos[index].url = url;
    setData({ ...data, logos: newLogos });
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Clients Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconUsers className="text-primary" /> Clientes & Logos
          </h2>
          <p className="text-white/40 text-sm">Gerencie o carrossel de logotipos de parceiros.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Configurações Base</h3>
        <div className="space-y-4">
           <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Texto de Apoio (Label)</label>
              <input 
                type="text" 
                value={data.label} 
                onChange={(e) => setData({ ...data, label: e.target.value })}
                className="w-full max-w-sm bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
              />
           </div>
           <div className="flex items-center gap-4">
              <input 
                type="checkbox" 
                id="marquee-enabled"
                checked={data.marquee.enabled} 
                onChange={(e) => setData({ ...data, marquee: { ...data.marquee, enabled: e.target.checked } })}
                className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary"
              />
              <label htmlFor="marquee-enabled" className="text-sm font-medium text-white/80">Ativar Carrossel Animado</label>
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Lista de Logotipos</h3>
          <button onClick={addLogo} className="text-[10px] font-bold bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-white/60 transition-colors flex items-center gap-1">
            <IconPlus size={12} /> ADD LOGO
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {data.logos.map((logo: any, i: number) => (
             <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 relative group">
                <button 
                   onClick={() => removeLogo(i)}
                   className="absolute top-2 right-2 p-1 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                   <IconTrash size={14} />
                </button>
                <div className="aspect-video bg-white/5 rounded-lg border border-white/5 flex items-center justify-center p-4 relative group/img overflow-hidden">
                   {logo.url ? (
                     <img src={logo.url} alt={logo.alt} className="w-full h-full object-contain filter invert opacity-50" />
                   ) : (
                     <IconPhoto size={24} className="text-white/10" />
                   )}
                   <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                      <IconUpload size={18} className="text-white mb-1" />
                      <input type="file" className="hidden" onChange={(e) => handleUpload(e, i)} accept="image/*, .svg" />
                   </label>
                </div>
                <input 
                   type="text" 
                   value={logo.alt} 
                   onChange={(e) => {
                      const newLogos = [...data.logos];
                      newLogos[i].alt = e.target.value;
                      setData({...data, logos: newLogos});
                   }}
                   className="w-full mt-3 bg-transparent text-[10px] font-medium text-white/40 text-center outline-none focus:text-white"
                   placeholder="Client Name"
                />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
