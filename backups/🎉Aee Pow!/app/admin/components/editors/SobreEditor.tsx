"use client";

import React, { useState, useEffect } from 'react';
import { IconInfoCircle, IconDeviceFloppy, IconHistory, IconTarget, IconUsers, IconCertificate, IconMapPin } from '@tabler/icons-react';

export default function SobreEditor() {
  const [activeSubTab, setActiveSubTab] = useState("hero");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sections = ["hero", "history", "mission", "locations", "team", "certs"];

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const results: any = {};
      for (const sec of sections) {
        try {
          const res = await fetch(`/api/admin/sobre-${sec}`);
          results[sec] = await res.json();
        } catch (e) {
          console.error(`Error loading section ${sec}:`, e);
          results[sec] = {};
        }
      }
      setData(results);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sec: string) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/sobre-${sec}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data[sec])
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/20 py-20 text-center">Carregando Editor do Sobre...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <IconInfoCircle className="text-primary" /> Página Sobre
          </h2>
          <p className="text-white/40 text-sm">Gerencie o conteúdo da página institucional.</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
        <TabBtn active={activeSubTab === "hero"} onClick={() => setActiveSubTab("hero")} icon={<IconInfoCircle size={16}/>}>Hero</TabBtn>
        <TabBtn active={activeSubTab === "history"} onClick={() => setActiveSubTab("history")} icon={<IconHistory size={16}/>}>História</TabBtn>
        <TabBtn active={activeSubTab === "mission"} onClick={() => setActiveSubTab("mission")} icon={<IconTarget size={16}/>}>Missão</TabBtn>
        <TabBtn active={activeSubTab === "locations"} onClick={() => setActiveSubTab("locations")} icon={<IconMapPin size={16}/>}>Locais</TabBtn>
        <TabBtn active={activeSubTab === "team"} onClick={() => setActiveSubTab("team")} icon={<IconUsers size={16}/>}>Time</TabBtn>
        <TabBtn active={activeSubTab === "certs"} onClick={() => setActiveSubTab("certs")} icon={<IconCertificate size={16}/>}>Certs</TabBtn>
      </div>

      {activeSubTab === "hero" && <EditorCard title="Hero do Sobre" onSave={() => handleSave("hero")} saving={saving}>
        <div className="space-y-4">
           <InputField label="Título" value={data.hero?.title} onChange={(v: string) => setData({...data, hero: {...data.hero, title: v}})} />
           <InputField label="Subtítulo" value={data.hero?.subtitle} onChange={(v: string) => setData({...data, hero: {...data.hero, subtitle: v}})} />
           <TextAreaField label="Descrição" value={data.hero?.description} onChange={(v: string) => setData({...data, hero: {...data.hero, description: v}})} />
           <InputField label="Foto (URL)" value={data.hero?.image} onChange={(v: string) => setData({...data, hero: {...data.hero, image: v}})} />
        </div>
      </EditorCard>}

      {activeSubTab === "history" && <EditorCard title="Nossa História (Timeline)" onSave={() => handleSave("history")} saving={saving}>
         <p className="text-xs text-white/20 mb-4 italic">Adicione anos e descritivos da jornada.</p>
         <div className="space-y-6">
            {data.history.items?.map((it: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 relative">
                 <div className="grid grid-cols-4 gap-4">
                    <InputField label="Ano" value={it.year} onChange={(v: string) => {
                      const items = [...data.history.items];
                      items[i].year = v;
                      setData({...data, history: {...data.history, items}});
                    }} />
                    <div className="col-span-3">
                      <InputField label="Título" value={it.title} onChange={(v: string) => {
                        const items = [...data.history.items];
                        items[i].title = v;
                        setData({...data, history: {...data.history, items}});
                      }} />
                    </div>
                 </div>
              </div>
            ))}
            <button onClick={() => setData({...data, history: {...data.history, items: [...(data.history.items||[]), {year: 2026, title: "Novo Marco"}]}})} className="w-full py-2 border border-dashed border-white/10 rounded-xl text-xs hover:bg-white/5">+ Adicionar Marco</button>
         </div>
      </EditorCard>}

      {activeSubTab === "mission" && <EditorCard title="Nossa Missão & Valores" onSave={() => handleSave("mission")} saving={saving}>
         <div className="space-y-6">
            <InputField label="Título da Seção" value={data.mission?.title} onChange={(v: string) => setData({...data, mission: {...data.mission, title: v}})} />
            <div className="space-y-4">
               {data.mission?.items?.map((it: any, i: number) => (
                 <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex gap-4 items-end">
                    <div className="flex-1"><InputField label="Título" value={it.title} onChange={(v: string) => {
                       const items = [...data.mission.items]; items[i].title = v; setData({...data, mission: {...data.mission, items}});
                    }} /></div>
                    <div className="flex-[2]"><InputField label="Descrição" value={it.description} onChange={(v: string) => {
                       const items = [...data.mission.items]; items[i].description = v; setData({...data, mission: {...data.mission, items}});
                    }} /></div>
                    <button onClick={() => {
                       const items = data.mission.items.filter((_: any, idx: number) => idx !== i);
                       setData({...data, mission: {...data.mission, items}});
                    }} className="p-2 text-white/20 hover:text-red-500">Excluir</button>
                 </div>
               ))}
               <button onClick={() => setData({...data, mission: {...data.mission, items: [...(data.mission?.items||[]), {title: "Novo Valor", description: ""}]}})} className="w-full py-2 border border-dashed border-white/10 rounded-xl text-xs">+ Adicionar Item</button>
            </div>
         </div>
      </EditorCard>}

      {activeSubTab === "locations" && <EditorCard title="Nossas Localizações" onSave={() => handleSave("locations")} saving={saving}>
         <div className="space-y-6">
            <InputField label="Título da Seção" value={data.locations?.title} onChange={(v: string) => setData({...data, locations: {...data.locations, title: v}})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {data.locations?.items?.map((it: any, i: number) => (
                 <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3 relative group">
                    <InputField label="Cidade/Estado" value={it.name} onChange={(v: string) => {
                       const items = [...data.locations.items]; items[i].name = v; setData({...data, locations: {...data.locations, items}});
                    }} />
                    <InputField label="Endereço" value={it.address} onChange={(v: string) => {
                       const items = [...data.locations.items]; items[i].address = v; setData({...data, locations: {...data.locations, items}});
                    }} />
                    <InputField label="Telefone" value={it.phone} onChange={(v: string) => {
                       const items = [...data.locations.items]; items[i].phone = v; setData({...data, locations: {...data.locations, items}});
                    }} />
                    <button onClick={() => {
                       const items = data.locations.items.filter((_: any, idx: number) => idx !== i);
                       setData({...data, locations: {...data.locations, items}});
                    }} className="absolute top-2 right-2 p-1 text-white/10 opacity-0 group-hover:opacity-100 hover:text-red-500">Excluir</button>
                 </div>
               ))}
               <button onClick={() => setData({...data, locations: {...data.locations, items: [...(data.locations?.items||[]), {name: "Nova Unidade", address: "", phone: ""}]}})} className="py-8 border border-dashed border-white/10 rounded-xl text-xs hover:bg-white/5">+ Unidade</button>
            </div>
         </div>
      </EditorCard>}

      {activeSubTab === "team" && <EditorCard title="Liderança" onSave={() => handleSave("team")} saving={saving}>
         <div className="space-y-6">
            <InputField label="Título da Seção" value={data.team?.title} onChange={(v: string) => setData({...data, team: {...data.team, title: v}})} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {data.team?.items?.map((it: any, i: number) => (
                 <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                    <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center text-[10px] text-white/20 border border-white/5">Foto Membro</div>
                    <InputField label="Nome" value={it.name} onChange={(v: string) => {
                       const items = [...data.team.items]; items[i].name = v; setData({...data, team: {...data.team, items}});
                    }} />
                    <InputField label="Cargo" value={it.role} onChange={(v: string) => {
                       const items = [...data.team.items]; items[i].role = v; setData({...data, team: {...data.team, items}});
                    }} />
                    <button onClick={() => {
                       const items = data.team.items.filter((_: any, idx: number) => idx !== i);
                       setData({...data, team: {...data.team, items}});
                    }} className="w-full text-[10px] uppercase font-bold text-white/10 hover:text-red-500">Excluir</button>
                 </div>
               ))}
               <button onClick={() => setData({...data, team: {...data.team, items: [...(data.team?.items||[]), {name: "Novo Membro", role: "", image: ""}]}})} className="aspect-square border border-dashed border-white/10 rounded-xl text-xs hover:bg-white/5 flex items-center justify-center">+ Membro</button>
            </div>
         </div>
      </EditorCard>}

      {activeSubTab === "certs" && <EditorCard title="Certificações" onSave={() => handleSave("certs")} saving={saving}>
         <div className="space-y-6">
            <InputField label="Título da Seção" value={data.certs?.title} onChange={(v: string) => setData({...data, certs: {...data.certs, title: v}})} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {data.certs?.items?.map((it: any, i: number) => (
                 <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2 relative group">
                    <div className="h-12 bg-white/5 rounded flex items-center justify-center text-[8px] text-white/10">Selo</div>
                    <InputField label="Nome" value={it.name} onChange={(v: string) => {
                       const items = [...data.certs.items]; items[i].name = v; setData({...data, certs: {...data.certs, items}});
                    }} />
                    <button onClick={() => {
                       const items = data.certs.items.filter((_: any, idx: number) => idx !== i);
                       setData({...data, certs: {...data.certs, items}});
                    }} className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"><IconDeviceFloppy size={10} /></button>
                 </div>
               ))}
               <button onClick={() => setData({...data, certs: {...data.certs, items: [...(data.certs?.items||[]), {name: "Nova Cert.", image: ""}]}})} className="h-24 border border-dashed border-white/10 rounded-xl text-xs hover:bg-white/5">+ Selo</button>
            </div>
         </div>
      </EditorCard>}
    </div>
  );
}

function TabBtn({ children, active, onClick, icon }: any) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${active ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20' : 'text-white/40 hover:text-white/60'}`}>
      {icon} {children}
    </button>
  );
}

function EditorCard({ title, children, onSave, saving }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
       <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">{title}</h3>
          <button onClick={onSave} disabled={saving} className="text-[10px] font-bold bg-primary px-4 py-1.5 rounded-lg flex items-center gap-2">
            <IconDeviceFloppy size={14} /> {saving ? "Salvando..." : "Salvar Seção"}
          </button>
       </div>
       {children}
    </div>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-white/20 uppercase mb-1.5 block">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50" />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-white/20 uppercase mb-1.5 block">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50" />
    </div>
  );
}
