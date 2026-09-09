"use client";

import React, { useState, useEffect } from 'react';
import { IconBuildingCommunity, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff, IconUpload, IconPhoto } from '@tabler/icons-react';

export default function IndustriesEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/industries')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/industries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Industries updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = () => {
    setData({ 
      ...data, 
      items: [...data.items, { 
        name: "New Industry", 
        image: "https://picsum.photos/seed/new/600/400",
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const { url } = await res.json();
    updateItem(index, 'image', url);
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Industries Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconBuildingCommunity className="text-primary" /> Indústrias
          </h2>
          <p className="text-white/40 text-sm">Gerencie os setores que a LogiNord atende.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Indústrias"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Configuração da Seção</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Título</label>
            <input 
              type="text" 
              value={data.title} 
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Subtítulo</label>
            <input 
              type="text" 
              value={data.subtitle} 
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Texto do Botão (CTA)</label>
            <input 
              type="text" 
              value={data.cta.label} 
              onChange={(e) => setData({ ...data, cta: { ...data.cta, label: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-xs outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Link do Botão (CTA)</label>
            <input 
              type="text" 
              value={data.cta.url} 
              onChange={(e) => setData({ ...data, cta: { ...data.cta, url: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-xs outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Itens da Seção</h3>
          <button onClick={addItem} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
            <IconPlus size={14} /> ADICIONAR ITEM
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button 
                  onClick={() => updateItem(i, 'show', !item.show)}
                  className={`p-1.5 rounded-lg transition-colors ${item.show ? 'text-green-500 bg-green-500/10' : 'text-white/20 bg-white/5'}`}
                >
                  {item.show ? <IconEye size={16} /> : <IconEyeOff size={16} />}
                </button>
                <button 
                  onClick={() => removeItem(i)}
                  className="p-1.5 rounded-lg text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <IconTrash size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="relative aspect-video bg-black/40 rounded-xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden group/img">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <IconPhoto className="text-white/10" size={32} />
                    )}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                      <IconUpload size={24} className="text-white mb-1" />
                      <span className="text-[10px] font-bold text-white uppercase">Upload Image</span>
                      <input type="file" className="hidden" onChange={(e) => handleUpload(e, i)} accept="image/*" />
                    </label>
                 </div>
                 
                 <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Nome da Indústria</label>
                    <input 
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(i, 'name', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold outline-none focus:border-primary/50"
                      placeholder="Industry Name"
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
