"use client";

import React, { useState, useEffect } from 'react';
import { IconMail, IconDeviceFloppy, IconPlus, IconTrash, IconEye, IconEyeOff, IconCheck } from '@tabler/icons-react';

export default function ContactEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/contact')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Contact settings updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const updateField = (index: number, key: string, value: any) => {
    const newFields = [...data.fields];
    newFields[index] = { ...newFields[index], [key]: value };
    setData({ ...data, fields: newFields });
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Contact Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconMail className="text-primary" /> Formulário de Contato
          </h2>
          <p className="text-white/40 text-sm">Configure o destino e os campos do formulário.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Configurações"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Configurações Base</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Email de Destino</label>
              <input 
                type="email" 
                value={data.emailDestination} 
                onChange={(e) => setData({ ...data, emailDestination: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50 text-primary font-bold"
              />
           </div>
           <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Mensagem de Sucesso</label>
              <input 
                type="text" 
                value={data.successMessage} 
                onChange={(e) => setData({ ...data, successMessage: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
              />
           </div>
           <div>
              <label className="text-[10px] font-bold text-white/40 uppercase mb-2 block">Texto do Botão</label>
              <input 
                type="text" 
                value={data.buttonText} 
                onChange={(e) => setData({ ...data, buttonText: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
              />
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Campos do Formulário</h3>
        <div className="space-y-4">
           {data.fields.map((field: any, i: number) => (
             <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/5 relative group">
                <div className="flex-1">
                   <label className="text-[9px] font-bold text-white/20 uppercase mb-1 block">Label</label>
                   <input 
                     type="text" 
                     value={field.label} 
                     onChange={(e) => updateField(i, 'label', e.target.value)}
                     className="w-full bg-transparent border-b border-white/10 text-xs font-bold outline-none focus:border-primary/40 py-1"
                   />
                </div>
                <div className="flex-1">
                   <label className="text-[9px] font-bold text-white/20 uppercase mb-1 block">Placeholder</label>
                   <input 
                     type="text" 
                     value={field.placeholder} 
                     onChange={(e) => updateField(i, 'placeholder', e.target.value)}
                     className="w-full bg-transparent border-b border-white/10 text-xs outline-none focus:border-primary/40 py-1"
                   />
                </div>
                <div className="flex items-center gap-6 px-4">
                   <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={`req-${i}`}
                        checked={field.required} 
                        onChange={(e) => updateField(i, 'required', e.target.checked)}
                        className="accent-primary"
                      />
                      <label htmlFor={`req-${i}`} className="text-[10px] uppercase font-bold text-white/40">Req.</label>
                   </div>
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateField(i, 'show', !field.show)}
                        className={`p-1.5 rounded ${field.show ? 'text-green-500' : 'text-white/10'}`}
                      >
                         {field.show ? <IconEye size={16} /> : <IconEyeOff size={16} />}
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
