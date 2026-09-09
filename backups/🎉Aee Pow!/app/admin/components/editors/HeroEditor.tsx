"use client";

import React, { useState, useEffect } from 'react';
import { IconSmartHome, IconDeviceFloppy, IconUpload, IconVideo, IconPhoto } from '@tabler/icons-react';

export default function HeroEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/admin/hero')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setMessage("Hero section saved!");
    } catch (e) {
      setMessage("Error saving.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="text-white/20">Loading Hero Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <IconSmartHome className="text-primary" /> Hero Section
        </h2>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
        >
          <IconDeviceFloppy size={18} />
          {saving ? "Saving..." : "Salvar Hero"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest text-white/30">Background Media</h3>
            <div className="flex gap-4 mb-6">
              <TypeBtn active={data?.background?.type === 'video'} onClick={() => setData({...data, background: {...(data?.background || {}), type: 'video'}})}>
                <IconVideo size={18} /> Video
              </TypeBtn>
              <TypeBtn active={data?.background?.type === 'image'} onClick={() => setData({...data, background: {...(data?.background || {}), type: 'image'}})}>
                <IconPhoto size={18} /> Image
              </TypeBtn>
            </div>
            
            <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Media URL / YouTube URL</label>
            <input 
              type="text"
              value={data?.background?.url || ""}
              onChange={(e) => setData({...data, background: {...(data?.background || {}), url: e.target.value}})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
              placeholder="https://..."
            />
            
            <div className="mt-6">
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Overlay Opacity ({data?.background?.opacity ?? 50}%)</label>
              <input 
                type="range" 
                min="0" max="90" 
                value={data?.background?.opacity ?? 50} 
                onChange={(e) => setData({...data, background: {...(data?.background || {}), opacity: parseInt(e.target.value)}})}
                className="w-full accent-primary" 
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest text-white/30">Text Content</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Main Title</label>
                <textarea 
                  value={data?.content?.title || ""}
                  onChange={(e) => setData({...data, content: {...(data?.content || {}), title: e.target.value}})}
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Highlight (Indicator)</label>
                <input 
                  type="text"
                  value={data?.content?.highlight || ""}
                  onChange={(e) => setData({...data, content: {...(data?.content || {}), highlight: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Subtitle/Description</label>
                <textarea 
                  value={data?.content?.subtitle || ""}
                  onChange={(e) => setData({...data, content: {...(data?.content || {}), subtitle: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="sticky top-24">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center p-12 text-center">
             {/* Simple Simulated Hero */}
             <div className="absolute inset-0 bg-black" style={{ opacity: (data?.background?.opacity ?? 50) / 100 }} />
             <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/60">{data?.content?.highlight || ""}</span>
                </div>
                <h1 className="text-3xl font-black text-white leading-tight whitespace-pre-line">{data?.content?.title || ""}</h1>
                <p className="text-xs text-white/60 max-w-sm mx-auto">{data?.content?.subtitle || ""}</p>
             </div>
          </div>
          <p className="mt-4 text-[10px] text-white/20 text-center uppercase tracking-widest font-bold">Live Content Preview</p>
        </div>
      </div>
    </div>
  );
}

function TypeBtn({ children, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-bold transition-all ${active ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
    >
      {children}
    </button>
  );
}
