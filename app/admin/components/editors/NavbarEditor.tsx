"use client";

import React, { useState, useEffect } from 'react';
import { IconMenu2, IconDeviceFloppy, IconPlus, IconTrash, IconGripVertical } from '@tabler/icons-react';

export default function NavbarEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/navbar')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/navbar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Navbar updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addLink = () => {
    setData({ ...data, links: [...data.links, { label: "New Link", url: "/" }] });
  };

  const removeLink = (index: number) => {
    const newLinks = [...data.links];
    newLinks.splice(index, 1);
    setData({ ...data, links: newLinks });
  };

  const updateLink = (index: number, field: string, value: string) => {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData({ ...data, links: newLinks });
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Navbar Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconMenu2 className="text-primary" /> Menu (Navbar)
          </h2>
          <p className="text-white/40 text-sm">Gerencie os links de navegação e o CTA do topo.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Menu"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Identidade</h3>
        <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Logo / Nome do Site</label>
        <input 
          type="text" 
          value={data?.logoText || ""} 
          onChange={(e) => setData({ ...data, logoText: e.target.value })}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
        />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Links de Navegação</h3>
          <button onClick={addLink} className="text-[10px] font-bold bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-white/60 transition-colors flex items-center gap-1">
            <IconPlus size={12} /> ADD LINK
          </button>
        </div>
        
        <div className="space-y-3">
          {(data?.links || []).map((link: any, i: number) => (
            <div key={i} className="flex items-center gap-3 group">
              <IconGripVertical size={16} className="text-white/10 cursor-grab group-hover:text-white/30" />
              <input 
                type="text" 
                value={link.label || link.name || ""} 
                onChange={(e) => updateLink(i, 'label', e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary/30"
                placeholder="Label"
              />
              <input 
                type="text" 
                value={link.url || link.href || ""} 
                onChange={(e) => updateLink(i, 'url', e.target.value)}
                className="flex-[1.5] bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary/30"
                placeholder="URL"
              />
              <button onClick={() => removeLink(i)} className="p-1.5 text-white/20 hover:text-red-500 transition-colors">
                <IconTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Call to Action (Botão)</h3>
        <div className="flex items-center gap-4 mb-4">
          <input 
            type="checkbox" 
            id="show-cta"
            checked={data?.cta?.show ?? true} 
            onChange={(e) => setData({ ...data, cta: { ...(data?.cta || {}), show: e.target.checked } })}
            className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary"
          />
          <label htmlFor="show-cta" className="text-sm font-medium text-white/80">Mostrar botão no menu</label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Texto do Botão</label>
            <input 
              type="text" 
              value={data?.cta?.label || data?.cta?.text || ""} 
              onChange={(e) => setData({ ...data, cta: { ...(data?.cta || {}), label: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">URL de Destino</label>
            <input 
              type="text" 
              value={data?.cta?.url || data?.cta?.href || ""} 
              onChange={(e) => setData({ ...data, cta: { ...(data?.cta || {}), url: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
