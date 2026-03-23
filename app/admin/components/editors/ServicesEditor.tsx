"use client";

import React, { useState, useEffect } from 'react';
import { IconBriefcase, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff, IconUpload, IconPhoto } from '@tabler/icons-react';

export default function ServicesEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/services')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Services saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addService = () => {
    setData({ 
      ...data, 
      items: [...data.items, { 
        title: "New Service", 
        description: "Service description goes here.", 
        image: "/images/services/placeholder.png",
        show: true 
      }] 
    });
  };

  const removeService = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ ...data, items: newItems });
  };

  const updateService = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
    updateService(index, 'image', url);
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Services Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconBriefcase className="text-primary" /> Serviços
          </h2>
          <p className="text-white/40 text-sm">Gerencie a lista de serviços e suas imagens.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Serviços"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Cabeçalho da Seção</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Título da Seção</label>
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

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Lista de Serviços</h3>
          <button onClick={addService} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
            <IconPlus size={14} /> ADICIONAR SERVIÇO
          </button>
        </div>

        <div className="space-y-4">
          {data.items.map((service: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={() => updateService(i, 'show', !service.show)}
                  className={`p-1.5 rounded-lg transition-colors ${service.show ? 'text-green-500 bg-green-500/10' : 'text-white/20 bg-white/5'}`}
                >
                  {service.show ? <IconEye size={18} /> : <IconEyeOff size={18} />}
                </button>
                <button 
                  onClick={() => removeService(i)}
                  className="p-1.5 rounded-lg text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <IconTrash size={18} />
                </button>
              </div>

              <div className="w-full md:w-1/3">
                 <label className="text-[10px] font-bold text-white/30 uppercase mb-2 block">Imagem</label>
                 <div className="relative aspect-[4/3] bg-black/40 rounded-xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden group/img">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    ) : (
                      <IconPhoto className="text-white/10" size={32} />
                    )}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                      <IconUpload size={24} className="text-white mb-1" />
                      <span className="text-[10px] font-bold text-white uppercase">Replace</span>
                      <input type="file" className="hidden" onChange={(e) => handleUpload(e, i)} accept="image/*" />
                    </label>
                 </div>
              </div>

              <div className="flex-1 space-y-4">
                 <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-sm">{(i+1).toString().padStart(2, '0')}</span>
                    <input 
                      type="text"
                      value={service.title}
                      onChange={(e) => updateService(i, 'title', e.target.value)}
                      className="flex-1 bg-transparent border-b border-white/10 text-lg font-bold outline-none focus:border-primary transition-colors py-1"
                      placeholder="Service Title"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Descrição</label>
                    <textarea 
                      value={service.description}
                      onChange={(e) => updateService(i, 'description', e.target.value)}
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
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
