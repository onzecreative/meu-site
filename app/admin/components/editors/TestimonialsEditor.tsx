"use client";

import React, { useState, useEffect } from 'react';
import { IconMessageChatbot, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff, IconUpload, IconPhoto } from '@tabler/icons-react';

export default function TestimonialsEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Testimonials saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = () => {
    setData({ 
      ...data, 
      items: [...data.items, { 
        text: "LogiNord provided an excellent service.", 
        author: "John Doe", 
        company: "New Partner Ltd",
        image: "https://picsum.photos/seed/newperson/200/200",
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

  if (loading) return <div className="text-white/20 text-center py-20">Loading Testimonials Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconMessageChatbot className="text-primary" /> Depoimentos
          </h2>
          <p className="text-white/40 text-sm">Gerencie o que os clientes dizem sobre a LogiNord.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Depoimentos"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Configuração da Seção</h3>
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Feedbacks dos Clientes</h3>
          <button onClick={addItem} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
            <IconPlus size={14} /> ADICIONAR DEPOIMENTO
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group">
              <div className="absolute top-4 right-4 flex gap-1 z-10">
                 <button onClick={() => updateItem(i, 'show', !item.show)} className={`p-1.5 rounded-lg transition-colors ${item.show ? 'text-green-500 bg-green-500/10' : 'text-white/20 bg-white/5'}`}>
                    {item.show ? <IconEye size={16} /> : <IconEyeOff size={16} />}
                 </button>
                 <button onClick={() => removeItem(i)} className="p-1.5 text-white/20 hover:text-red-500 transition-colors">
                    <IconTrash size={16} />
                 </button>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 group/avatar">
                       {item.image ? (
                        <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                       ) : (
                        <IconPhoto className="text-white/10 mx-auto mt-2" size={24} />
                       )}
                       <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <IconUpload size={14} className="text-white" />
                          <input type="file" className="hidden" onChange={(e) => handleUpload(e, i)} accept="image/*" />
                       </label>
                    </div>
                    <div className="flex-1">
                       <input 
                         type="text"
                         value={item.author}
                         onChange={(e) => updateItem(i, 'author', e.target.value)}
                         className="w-full bg-transparent border-white/10 text-sm font-bold outline-none focus:border-primary py-0.5 border-b mb-1"
                         placeholder="Author Name"
                       />
                       <input 
                         type="text"
                         value={item.company}
                         onChange={(e) => updateItem(i, 'company', e.target.value)}
                         className="w-full bg-transparent border-white/10 text-[10px] outline-none focus:border-primary py-0.5 border-b"
                         placeholder="Company"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Depoimento</label>
                    <textarea 
                      value={item.text}
                      onChange={(e) => updateItem(i, 'text', e.target.value)}
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white/80 outline-none focus:border-primary/50 italic leading-relaxed"
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
