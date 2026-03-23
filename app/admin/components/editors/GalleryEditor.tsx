"use client";

import React, { useState, useEffect } from 'react';
import { IconPhoto, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff, IconUpload, IconTags } from '@tabler/icons-react';

export default function GalleryEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Gallery saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = () => {
    setData({ 
      ...data, 
      items: [...data.items, { 
        url: "https://picsum.photos/seed/newgallery/800/600", 
        alt: "New Operative Image", 
        category: "Fleet",
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
    updateItem(index, 'url', url);
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Gallery Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconPhoto className="text-primary" /> Galeria
          </h2>
          <p className="text-white/40 text-sm">Gerencie as imagens operacionais da LogiNord.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Categorias Disponíveis</h3>
        <div className="flex flex-wrap gap-2">
           {data.categories.map((cat: string, i: number) => (
             <div key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                {cat}
                <button onClick={() => {
                   const newCats = data.categories.filter((c: string) => c !== cat);
                   setData({...data, categories: newCats});
                }} className="text-white/20 hover:text-red-500">×</button>
             </div>
           ))}
           <button onClick={() => {
              const newCat = prompt("Nov categoria:");
              if(newCat) setData({...data, categories: [...data.categories, newCat]});
           }} className="bg-primary/20 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/30 transition-all">+ Add Cat</button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Imagens da Galeria</h3>
          <button onClick={addItem} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
            <IconPlus size={14} /> NOVO ITEM
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-3 relative group overflow-hidden">
               <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => updateItem(i, 'show', !item.show)} className={`p-1 rounded ${item.show ? 'text-green-500' : 'text-white/20'}`}>
                    {item.show ? <IconEye size={12} /> : <IconEyeOff size={12} />}
                 </button>
                 <button onClick={() => removeItem(i)} className="p-1 text-white/20 hover:text-red-500">
                    <IconTrash size={12} />
                 </button>
              </div>

              <div className="aspect-[4/3] bg-black/40 rounded-xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden mb-3 relative group/img">
                {item.url ? (
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                ) : (
                  <IconPhoto className="text-white/10" size={24} />
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                  <IconUpload size={20} className="text-white mb-1" />
                  <input type="file" className="hidden" onChange={(e) => handleUpload(e, i)} accept="image/*" />
                </label>
              </div>

              <div className="space-y-2">
                 <input 
                   type="text" 
                   value={item.alt} 
                   onChange={(e) => updateItem(i, 'alt', e.target.value)}
                   className="w-full bg-transparent text-[10px] font-bold text-white/60 outline-none p-1 border-b border-white/5 focus:border-primary/40 truncate"
                   placeholder="Alt Text"
                 />
                 <select 
                   value={item.category}
                   onChange={(e) => updateItem(i, 'category', e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded p-1 text-[9px] uppercase tracking-wider font-bold text-primary outline-none"
                 >
                   {data.categories.map((cat: string) => (
                     <option key={cat} value={cat}>{cat}</option>
                   ))}
                 </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
