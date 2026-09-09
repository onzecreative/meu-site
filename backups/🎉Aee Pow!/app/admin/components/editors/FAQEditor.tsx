"use client";

import React, { useState, useEffect } from 'react';
import { IconHelp, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff } from '@tabler/icons-react';

export default function FAQEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/faq')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("FAQ saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addItem = () => {
    setData({ 
      ...data, 
      items: [...data.items, { 
        question: "New Question", 
        answer: "New Answer.", 
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

  if (loading) return <div className="text-white/20 text-center py-20">Loading FAQ Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconHelp className="text-primary" /> FAQ
          </h2>
          <p className="text-white/40 text-sm">Gerencie as perguntas frequentes do seu site.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Perguntas"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Título da Seção</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            value={data.title} 
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
          />
          <input 
            type="text" 
            value={data.subtitle} 
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Itens do FAQ</h3>
          <button onClick={addItem} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
            <IconPlus size={14} /> ADICIONAR PERGUNTA
          </button>
        </div>

        <div className="space-y-4">
          {data.items.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group">
              <div className="absolute top-4 right-4 flex gap-1 z-10">
                 <button onClick={() => updateItem(i, 'show', !item.show)} className={`p-1.5 rounded-lg transition-colors ${item.show ? 'text-green-500 bg-green-500/10' : 'text-white/20 bg-white/5'}`}>
                    {item.show ? <IconEye size={18} /> : <IconEyeOff size={18} />}
                 </button>
                 <button onClick={() => removeItem(i)} className="p-1.5 rounded-lg text-white/20 hover:text-red-500 transition-colors">
                    <IconTrash size={18} />
                 </button>
              </div>

              <div className="space-y-4 pr-12">
                 <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Pergunta</label>
                    <input 
                      type="text"
                      value={item.question}
                      onChange={(e) => updateItem(i, 'question', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 text-base font-bold outline-none focus:border-primary transition-colors py-1"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Resposta</label>
                    <textarea 
                      value={item.answer}
                      onChange={(e) => updateItem(i, 'answer', e.target.value)}
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 outline-none focus:border-primary/50 leading-relaxed"
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
