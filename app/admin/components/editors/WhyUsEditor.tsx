"use client";

import React, { useState, useEffect } from 'react';
import { IconCircleCheck, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff, IconStar, IconShieldCheck, IconClock, IconChartBar } from '@tabler/icons-react';

const availableIcons: { [key: string]: any } = {
  ShieldCheck: <IconShieldCheck size={20} />,
  Clock: <IconClock size={20} />,
  ChartBar: <IconChartBar size={20} />,
  Star: <IconStar size={20} />,
  CircleCheck: <IconCircleCheck size={20} />
};

export default function WhyUsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/whyus')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/whyus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = () => {
    setData({ 
      ...data, 
      items: [...data.items, { 
        icon: "Star", 
        title: "New Feature", 
        description: "Why choose us description.",
        show: true 
      }] 
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ ...data, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Why Us Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconCircleCheck className="text-primary" /> Por Que Nós
          </h2>
          <p className="text-white/40 text-sm">Gerencie os diferenciais competitivos da empresa.</p>
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
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Cabeçalho da Seção</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Label</label>
            <input 
              type="text" 
              value={data.label} 
              onChange={(e) => setData({ ...data, label: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Título</label>
            <input 
              type="text" 
              value={data.title} 
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Subtítulo</label>
            <textarea 
              value={data.subtitle} 
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Diferenciais</h3>
          <button onClick={addItem} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
            <IconPlus size={14} /> NOVO ITEM
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group">
              <div className="absolute top-2 right-2 flex gap-1">
                 <button onClick={() => updateItem(i, 'show', !item.show)} className={`p-1 rounded ${item.show ? 'text-green-500' : 'text-white/20'}`}>
                    {item.show ? <IconEye size={14} /> : <IconEyeOff size={14} />}
                 </button>
                 <button onClick={() => removeItem(i)} className="p-1 text-white/20 hover:text-red-500">
                    <IconTrash size={14} />
                 </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                    {availableIcons[item.icon] || <IconStar size={20} />}
                 </div>
                 
                 <select 
                   value={item.icon}
                   onChange={(e) => updateItem(i, 'icon', e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] outline-none"
                 >
                   {Object.keys(availableIcons).map(icon => (
                     <option key={icon} value={icon}>{icon}</option>
                   ))}
                 </select>

                 <input 
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(i, 'title', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 text-sm font-bold text-center outline-none focus:border-primary py-1"
                 />

                 <textarea 
                    value={item.description}
                    onChange={(e) => updateItem(i, 'description', e.target.value)}
                    className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 outline-none focus:border-primary/30 text-center"
                 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
