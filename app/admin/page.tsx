"use client";

import { useState, useEffect } from "react";
import { IconDeviceFloppy, IconLogout, IconPlus, IconTrash } from "@tabler/icons-react";
import SectionEditor from "./components/SectionEditor";

export default function AdminDashboard() {
  const [heroConfig, setHeroConfig] = useState<any>(null);
  const [footerConfig, setFooterConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [heroRes, footerRes] = await Promise.all([
          fetch("/api/admin/hero"),
          fetch("/api/admin/footer"),
        ]);
        if (heroRes.ok) setHeroConfig(await heroRes.json());
        if (footerRes.ok) setFooterConfig(await footerRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroConfig),
      });
      if (res.ok) setMessage("Configurações do Hero salvas com sucesso!");
      else setMessage("Erro ao salvar Hero.");
    } catch {
      setMessage("Erro de conexão.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footerConfig),
      });
      if (res.ok) setMessage("Configurações do Rodapé salvas com sucesso!");
      else setMessage("Erro ao salvar Rodapé.");
    } catch {
      setMessage("Erro de conexão.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setSaving(true);
      const res = await fetch("/api/admin/hero/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setHeroConfig({ ...heroConfig, [field]: data.url });
        setMessage("Upload concluído com sucesso!");
      } else {
        setMessage("Erro no upload.");
      }
    } catch {
      setMessage("Erro de conexão no upload.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return <div style={{ color: "white", padding: "50px", textAlign: "center" }}>Carregando...</div>;
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    marginBottom: "6px",
    fontWeight: 600,
  };

  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "white", padding: "40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 8px 0" }}>Painel Administrativo</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>Gerencie o conteúdo do site</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px",
              padding: "8px 16px", cursor: "pointer", transition: "all 0.2s"
            }}
          >
            <IconLogout size={18} /> Sair
          </button>
        </div>

        {message && (
          <div style={{
            background: message.includes("Erro") ? "rgba(255,82,82,0.1)" : "rgba(76,175,80,0.1)",
            border: `1px solid ${message.includes("Erro") ? "rgba(255,82,82,0.3)" : "rgba(76,175,80,0.3)"}`,
            color: message.includes("Erro") ? "#FF5252" : "#4CAF50",
            padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", fontWeight: 500
          }}>
            {message}
          </div>
        )}

        {/* HERO SECTION */}
        {heroConfig && (
          <section style={sectionStyle}>
            <h2 style={{ fontSize: "20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              Configurações do Banner (Hero)
            </h2>
            <form onSubmit={handleSaveHero}>
              <label style={labelStyle}>Tipo de Mídia</label>
              <select
                value={heroConfig.type}
                onChange={(e) => setHeroConfig({ ...heroConfig, type: e.target.value })}
                style={inputStyle}
              >
                <option value="url">URL Externa (MP4)</option>
                <option value="youtube">YouTube</option>
                <option value="local">Upload Local</option>
              </select>

              {heroConfig.type === "url" && (
                <>
                  <label style={labelStyle}>URL do Vídeo (Desktop)</label>
                  <input type="text" value={heroConfig.videoUrl} onChange={(e) => setHeroConfig({ ...heroConfig, videoUrl: e.target.value })} style={inputStyle} />
                </>
              )}

              {heroConfig.type === "youtube" && (
                <>
                  <label style={labelStyle}>ID do Vídeo do YouTube</label>
                  <input type="text" value={heroConfig.youtubeId} onChange={(e) => setHeroConfig({ ...heroConfig, youtubeId: e.target.value })} style={inputStyle} placeholder="Ex: dQw4w9WgXcQ" />
                </>
              )}

              {heroConfig.type === "local" && (
                <>
                  <label style={labelStyle}>Upload de Vídeo (.mp4 ou .mov)</label>
                  <input type="file" accept="video/mp4,video/quicktime" onChange={(e) => handleUpload(e, "videoUrl")} style={inputStyle} />
                  {heroConfig.videoUrl && <p style={{ fontSize: "12px", color: "#4CAF50", marginTop: "-10px", marginBottom: "16px" }}>Arquivo atual: {heroConfig.videoUrl}</p>}
                </>
              )}

              <button type="submit" disabled={saving} style={{
                background: "#DE3F0B", color: "white", border: "none", borderRadius: "8px",
                padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: "8px"
              }}>
                <IconDeviceFloppy size={18} /> {saving ? "Salvando..." : "Salvar Hero"}
              </button>
            </form>
          </section>
        )}

        {/* FOOTER SECTION */}
        {footerConfig && (
          <section style={sectionStyle}>
            <h2 style={{ fontSize: "20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              Configurações do Rodapé & WhatsApp
            </h2>
            <form onSubmit={handleSaveFooter}>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Número do WhatsApp (apenas números)</label>
                  <input type="text" value={footerConfig.whatsappNumber} onChange={(e) => setFooterConfig({ ...footerConfig, whatsappNumber: e.target.value })} style={inputStyle} placeholder="5511999999999" />
                </div>
                <div>
                  <label style={labelStyle}>Mensagem Automática</label>
                  <input type="text" value={footerConfig.whatsappMessage} onChange={(e) => setFooterConfig({ ...footerConfig, whatsappMessage: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <label style={labelStyle}>Descrição da Empresa</label>
              <textarea 
                value={footerConfig.description} 
                onChange={(e) => setFooterConfig({ ...footerConfig, description: e.target.value })} 
                style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} 
              />

              {/* COLUMNS */}
              <div style={{ marginTop: "24px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "16px" }}>Colunas de Links</h3>
                {footerConfig.columns.map((col: any, colIdx: number) => (
                  <div key={col.id} style={{ background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "12px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", marginBottom: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Título da Coluna</label>
                        <input type="text" value={col.title} onChange={(e) => {
                          const newCols = [...footerConfig.columns];
                          newCols[colIdx].title = e.target.value;
                          setFooterConfig({ ...footerConfig, columns: newCols });
                        }} style={{...inputStyle, marginBottom: 0}} />
                      </div>
                      <button type="button" onClick={() => {
                        const newCols = footerConfig.columns.filter((_:any, i:number) => i !== colIdx);
                        setFooterConfig({ ...footerConfig, columns: newCols });
                      }} style={{ background: "rgba(255,82,82,0.1)", color: "#FF5252", border: "1px solid rgba(255,82,82,0.3)", borderRadius: "8px", padding: "10px", cursor: "pointer" }}>
                        <IconTrash size={18} />
                      </button>
                    </div>

                    <div style={{ marginLeft: "16px", borderLeft: "2px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
                      {col.links.map((link: any, linkIdx: number) => (
                         <div key={link.id} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                           <input type="text" placeholder="Texto do Link" value={link.text} onChange={(e) => {
                              const newCols = [...footerConfig.columns];
                              newCols[colIdx].links[linkIdx].text = e.target.value;
                              setFooterConfig({ ...footerConfig, columns: newCols });
                           }} style={{...inputStyle, marginBottom: 0, flex: 1}} />
                           
                           <input type="text" placeholder="URL" value={link.url} onChange={(e) => {
                              const newCols = [...footerConfig.columns];
                              newCols[colIdx].links[linkIdx].url = e.target.value;
                              setFooterConfig({ ...footerConfig, columns: newCols });
                           }} style={{...inputStyle, marginBottom: 0, flex: 1}} />

                           <button type="button" onClick={() => {
                              const newCols = [...footerConfig.columns];
                              newCols[colIdx].links = newCols[colIdx].links.filter((_:any, i:number) => i !== linkIdx);
                              setFooterConfig({ ...footerConfig, columns: newCols });
                           }} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                             <IconTrash size={16} />
                           </button>
                         </div>
                      ))}
                      <button type="button" onClick={() => {
                         const newCols = [...footerConfig.columns];
                         newCols[colIdx].links.push({ id: `l${Date.now()}`, text: "", url: "" });
                         setFooterConfig({ ...footerConfig, columns: newCols });
                      }} style={{ background: "transparent", color: "#DE3F0B", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
                        <IconPlus size={14} /> Adicionar Link
                      </button>
                    </div>
                  </div>
                ))}
                
                <button type="button" onClick={() => {
                  setFooterConfig({
                    ...footerConfig,
                    columns: [...footerConfig.columns, { id: `col${Date.now()}`, title: "Nova Coluna", links: [] }]
                  });
                }} style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "8px", padding: "12px", width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px", fontWeight: 500 }}>
                  <IconPlus size={18} /> Adicionar Coluna
                </button>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button type="submit" disabled={saving} style={{
                  background: "#DE3F0B", color: "white", border: "none", borderRadius: "8px",
                  padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", gap: "8px"
                }}>
                  <IconDeviceFloppy size={18} /> {saving ? "Salvando..." : "Salvar Rodapé"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* NOSSOS SERVIÇOS */}
        {!loading && (
          <SectionEditor 
            id="services" 
            label="Seção: Nossos Serviços" 
            defaultData={{ sectionTitle: "Nossos Serviços", title: "Soluções para cada tipo de carga", description: "Da coleta à entrega, cuidamos de tudo com tecnologia, eficiência e comprometimento total com o seu negócio.", items: [] }}
          />
        )}

        {/* SETORES ATENDIDOS */}
        {!loading && (
          <SectionEditor 
            id="industries" 
            label="Seção: Setores Atendidos" 
            defaultData={{ sectionTitle: "Setores Atendidos", title: "Expertise em cada segmento de mercado", description: "Décadas de experiência nos principais setores da economia brasileira.", items: [] }}
          />
        )}

        {/* POR QUE NOS ESCOLHER */}
        {!loading && (
          <SectionEditor 
            id="features" 
            label="Seção: Por que nos escolher (Features)" 
            defaultData={{ sectionTitle: "Por que nos escolher", title: "Tecnologia e confiança em cada entrega", items: [] }}
          />
        )}

        {/* DEPOIMENTOS */}
        {!loading && (
          <SectionEditor 
            id="testimonials" 
            label="Seção: Depoimentos" 
            defaultData={{ sectionTitle: "Depoimentos", title: "O que nossos clientes dizem", items: [] }}
          />
        )}

        {/* NÚMEROS QUE FALAM POR SI */}
        {!loading && (
          <SectionEditor 
            id="quickfacts" 
            label="Seção: Quick Facts (Números)" 
            defaultData={{ sectionTitle: "Números que falam por si", title: "Resultados reais, clientes satisfeitos", stats: [], partners: [] }}
          />
        )}

      </div>
    </div>
  );
}
