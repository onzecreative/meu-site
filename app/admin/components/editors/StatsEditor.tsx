"use client";

import React, { useState, useEffect } from 'react';
import { IconChartBar, IconDeviceFloppy, IconPlus, IconTrash, IconGripVertical } from '@tabler/icons-react';

export default function StatsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Stats saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = () => {
    if (data.items.length < 6) {
      setData({ ...data, items: [...data.items, { value: "0%", label: "New Stat" }] });
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ ...data, items: newItems });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Stats Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconChartBar className="text-primary" /> Stats (Quick Facts)
          </h2>
          <p className="text-white/40 text-sm">Gerencie os números e indicadores de performance.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Stats"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Cabeçalho da Seção</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Label (Mini Título)</label>
            <input 
              type="text" 
              value={data.label} 
              onChange={(e) => setData({ ...data, label: e.target.value })}
              className="w-full max-w-sm bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Título Principal</label>
            <input 
              type="text" 
              value={data.title} 
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Subtítulo</label>
            <textarea 
              value={data.subtitle} 
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Cards de Stats (Máx 6)</h3>
          <button 
            onClick={addItem} 
            disabled={data.items.length >= 6}
            className="text-[10px] font-bold bg-white/5 hover:bg-white/10 disabled:opacity-30 px-3 py-1 rounded-full text-white/60 transition-colors flex items-center gap-1"
          >
            <IconPlus size={12} /> ADD STAT
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 relative group">
              <button 
                onClick={() => removeItem(i)}
                className="absolute top-2 right-2 p-1.5 text-white/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <IconTrash size={14} />
              </button>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-white/20 uppercase mb-1 block">Valor / Número</label>
                  <input 
                    type="text" 
                    value={item.value} 
                    onChange={(e) => updateItem(i, 'value', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-lg font-black text-primary outline-none focus:border-primary/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/20 uppercase mb-1 block">Label / Texto</label>
                  <input 
                    type="text" 
                    value={item.label} 
                    onChange={(e) => updateItem(i, 'label', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 outline-none focus:border-primary/30"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
