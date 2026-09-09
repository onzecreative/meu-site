"use client";

import React, { useState, useEffect } from 'react';
import { IconAffiliate, IconDeviceFloppy, IconBrandWhatsapp, IconBrandLinkedin, IconBrandInstagram, IconPlus, IconTrash } from '@tabler/icons-react';

export default function FooterEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/footer')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setMessage("Footer updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="text-white/20 text-center py-20">Loading Footer Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconAffiliate className="text-primary" /> Rodapé (Footer)
          </h2>
          <p className="text-white/40 text-sm">Configure o WhatsApp, redes sociais e colunas de links.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Rodapé"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <IconBrandWhatsapp size={16} className="text-green-500" /> WhatsApp Integration
               </h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <input 
                      type="checkbox" 
                      id="show-wa-float"
                      checked={data?.whatsapp?.showFloating ?? true} 
                      onChange={(e) => setData({ ...data, whatsapp: { ...(data?.whatsapp || {}), showFloating: e.target.checked } })}
                      className="accent-green-500"
                    />
                    <label htmlFor="show-wa-float" className="text-xs font-bold text-white/60">Botão Flutuante</label>
            
                    <input 
                      type="checkbox" 
                      id="show-wa-foot"
                      checked={data?.whatsapp?.showFooter ?? true} 
                      onChange={(e) => setData({ ...data, whatsapp: { ...(data?.whatsapp || {}), showFooter: e.target.checked } })}
                      className="accent-green-500"
                    />
                    <label htmlFor="show-wa-foot" className="text-xs font-bold text-white/60">Mostrar no Rodapé</label>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Número (Com DDD)</label>
                    <input 
                      type="text" 
                      value={data?.whatsapp?.number || ""} 
                      onChange={(e) => setData({ ...data, whatsapp: { ...(data?.whatsapp || {}), number: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-green-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Mensagem Inicial</label>
                    <textarea 
                      value={data?.whatsapp?.message || ""} 
                      onChange={(e) => setData({ ...data, whatsapp: { ...(data?.whatsapp || {}), message: e.target.value } })}
                      className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-green-500/50"
                    />
                  </div>
               </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Social Media</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <IconBrandLinkedin size={20} className="text-blue-500" />
                     <input 
                       type="text" 
                       value={data?.socials?.linkedin || ""} 
                       onChange={(e) => setData({ ...data, socials: { ...(data?.socials || {}), linkedin: e.target.value } })}
                       className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                       placeholder="https://linkedin.com/..."
                     />
                  </div>
                  <div className="flex items-center gap-3">
                     <IconBrandInstagram size={20} className="text-pink-500" />
                     <input 
                       type="text" 
                       value={data?.socials?.instagram || ""} 
                       onChange={(e) => setData({ ...data, socials: { ...(data?.socials || {}), instagram: e.target.value } })}
                       className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                       placeholder="https://instagram.com/..."
                     />
                  </div>
               </div>
            </div>
         </div>
         
         <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Informações Legais</h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Copyright Text</label>
                    <input 
                      type="text" 
                      value={data?.copyright || ""} 
                      onChange={(e) => setData({ ...data, copyright: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Descrição do Rodapé</label>
                    <textarea 
                      value={data.description} 
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none"
                    />
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center justify-between">
                  Colunas de Links
                  <button onClick={() => setData({...data, columns: [...data.columns, {title: "Nova Coluna", links: []}]})} className="text-[10px] bg-white/5 px-2 py-1 rounded-full">+ Coluna</button>
               </h3>
               <div className="space-y-6">
                  {data.columns.map((col: any, i: number) => (
                    <div key={i} className="border-l-2 border-white/5 pl-4 pb-4">
                       <div className="flex items-center justify-between mb-3">
                          <input 
                            type="text" 
                            value={col.title} 
                            onChange={(e) => {
                               const newCols = [...data.columns];
                               newCols[i].title = e.target.value;
                               setData({...data, columns: newCols});
                            }}
                            className="bg-transparent text-sm font-bold text-white outline-none focus:text-primary"
                          />
                          <button onClick={() => {
                             const newCols = data.columns.filter((_:any, idx:number) => idx !== i);
                             setData({...data, columns: newCols});
                          }} className="text-white/10 hover:text-red-500">
                             <IconTrash size={14} />
                          </button>
                       </div>
                       <div className="space-y-2">
                          {col.links.map((link: any, li: number) => (
                            <div key={li} className="flex gap-2">
                               <input type="text" value={link.label} className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] outline-none" onChange={(e) => {
                                  const newCols = [...data.columns];
                                  newCols[i].links[li].label = e.target.value;
                                  setData({...data, columns: newCols});
                               }} />
                               <input type="text" value={link.url} className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] outline-none" onChange={(e) => {
                                  const newCols = [...data.columns];
                                  newCols[i].links[li].url = e.target.value;
                                  setData({...data, columns: newCols});
                               }} />
                            </div>
                          ))}
                          <button onClick={() => {
                             const newCols = [...data.columns];
                             newCols[i].links.push({label: "Novo", url: "/"});
                             setData({...data, columns: newCols});
                          }} className="text-[9px] text-white/30 hover:text-white">+ Add Link</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
