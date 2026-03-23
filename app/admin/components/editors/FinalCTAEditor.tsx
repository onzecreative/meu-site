"use client";

import React, { useState, useEffect } from 'react';
import { IconTarget, IconDeviceFloppy } from '@tabler/icons-react';

export default function FinalCTAEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/finalcta')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/finalcta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Saved successfully!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="text-white/20 py-20 text-center">Loading CTA Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconTarget className="text-primary" /> Chamada Final (Final CTA)
          </h2>
          <p className="text-white/40 text-sm">Gerencie o convite de fechamento no final da página.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <div>
          <label className="text-[10px] font-bold text-white/30 uppercase mb-2 block">Título Chamativo</label>
          <input 
            type="text" 
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary/50 text-white font-bold text-lg"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div>
            <label className="text-[10px] font-bold text-white/30 uppercase mb-2 block">Texto do Botão</label>
            <input 
              type="text" 
              value={data.buttonText}
              onChange={(e) => setData({ ...data, buttonText: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/30 uppercase mb-2 block">Link do Botão (URL)</label>
            <input 
              type="text" 
              value={data.buttonUrl}
              onChange={(e) => setData({ ...data, buttonUrl: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {message && <div className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-2xl animate-in slide-in-from-right-full">✅ {message}</div>}
    </div>
  );
}
