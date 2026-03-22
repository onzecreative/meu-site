"use client";

import { useState, useEffect } from "react";
import { 
  IconDeviceFloppy, 
  IconLogout, 
  IconPlus, 
  IconTrash, 
  IconHome, 
  IconInfoCircle, 
  IconTruck, 
  IconMail, 
  IconSettings,
  IconLayout2
} from "@tabler/icons-react";
import SectionEditor from "./components/SectionEditor";

type Tab = "home" | "sobre" | "servicos" | "contato" | "geral";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
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
    return <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center font-inter">Carregando...</div>;
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
    <div className="min-h-screen bg-[#0d0d0d] text-white font-inter">
      {/* Sidebar / Navigation */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-10">
            <h1 className="text-2xl font-black mb-2 font-urbanist text-primary">LogiNord Admin</h1>
            <p className="text-white/40 text-sm mb-10">CMS Full Site v3.0</p>
            
            <nav className="flex flex-col gap-2">
              <TabButton active={activeTab === "home"} icon={<IconHome size={20}/>} label="Página Home" onClick={() => setActiveTab("home")} />
              <TabButton active={activeTab === "sobre"} icon={<IconInfoCircle size={20}/>} label="Página Sobre" onClick={() => setActiveTab("sobre")} />
              <TabButton active={activeTab === "servicos"} icon={<IconTruck size={20}/>} label="Página Serviços" onClick={() => setActiveTab("servicos")} />
              <TabButton active={activeTab === "contato"} icon={<IconMail size={20}/>} label="Página Contato" onClick={() => setActiveTab("contato")} />
              <TabButton active={activeTab === "geral"} icon={<IconSettings size={20}/>} label="Config Geral" onClick={() => setActiveTab("geral")} />
            </nav>

            <button
              onClick={handleLogout}
              className="mt-12 flex items-center gap-2 text-white/40 hover:text-red-500 transition-colors text-sm font-bold"
            >
              <IconLogout size={18} /> Sair do Painel
            </button>
          </div>
        </aside>

        <main className="flex-1 max-w-[800px]">
          {message && (
            <div className={`
              ${message.includes("Erro") ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-green-500/10 border-green-500/30 text-green-500"}
              border p-4 rounded-lg mb-8 font-bold flex items-center
            `}>
              {message}
            </div>
          )}

          {/* TAB: HOME */}
          {activeTab === "home" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
               {/* HERO SECTION */}
               {heroConfig && (
                <section style={sectionStyle}>
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                    Hero Principal (Vídeo/Texto)
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
                        {heroConfig.videoUrl && <p className="text-xs text-green-500 -mt-2 mb-4">Arquivo atual: {heroConfig.videoUrl}</p>}
                      </>
                    )}

                    <label style={labelStyle}>Título Principal</label>
                    <textarea value={heroConfig.title || ""} onChange={(e) => setHeroConfig({ ...heroConfig, title: e.target.value })} style={{ ...inputStyle, minHeight: "80px" }} />
                    
                    <label style={labelStyle}>Subtítulo (Indicator)</label>
                    <input type="text" value={heroConfig.subtitleIndicator || ""} onChange={(e) => setHeroConfig({ ...heroConfig, subtitleIndicator: e.target.value })} style={inputStyle} />

                    <div className="flex gap-4">
                       <div className="flex-1">
                          <label style={labelStyle}>Texto Botão Direito</label>
                          <input type="text" value={heroConfig.bottomRightText || ""} onChange={(e) => setHeroConfig({ ...heroConfig, bottomRightText: e.target.value })} style={inputStyle} />
                       </div>
                       <div className="flex-1">
                          <label style={labelStyle}>URL Botão</label>
                          <input type="text" value={heroConfig.bottomRightUrl || ""} onChange={(e) => setHeroConfig({ ...heroConfig, bottomRightUrl: e.target.value })} style={inputStyle} />
                       </div>
                    </div>

                    <button type="submit" disabled={saving} className="bg-primary hover:bg-primary/80 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all">
                      <IconDeviceFloppy size={18} /> {saving ? "Salvando..." : "Salvar Hero"}
                    </button>
                  </form>
                </section>
              )}

              <SectionEditor 
                id="services" 
                label="Seção: Nossos Serviços" 
                defaultData={{ sectionTitle: "Nossos Serviços", title: "Soluções para cada tipo de carga", description: "Da coleta à entrega, cuidamos de tudo.", items: [] }}
              />

              <SectionEditor 
                id="industries" 
                label="Seção: Setores Atendidos" 
                defaultData={{ sectionTitle: "Setores Atendidos", title: "Expertise em cada segmento", items: [] }}
              />

              <SectionEditor 
                id="features" 
                label="Seção: Por que nos escolher" 
                defaultData={{ sectionTitle: "Por que nos escolher", title: "Tecnologia e confiança", items: [] }}
              />

              <SectionEditor 
                id="testimonials" 
                label="Seção: Depoimentos" 
                defaultData={{ sectionTitle: "Depoimentos", title: "O que dizem os clientes", items: [] }}
              />

              <SectionEditor 
                id="quickfacts" 
                label="Seção: Números (Quick Facts)" 
                defaultData={{ sectionTitle: "Números", title: "Resultados reais", stats: [], partners: [] }}
              />

              <SectionEditor 
                id="finalcta" 
                label="CTA Final (Home)" 
                defaultData={{ title: "Pronto para mover sua carga?", description: "Fale com nossos especialistas agora.", buttonText: "Solicitar Orçamento", buttonUrl: "/contato" }}
              />
            </div>
          )}

          {/* TAB: SOBRE */}
          {activeTab === "sobre" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
               <SectionEditor 
                id="sobre-hero" 
                label="Sobre Us: Hero Principal" 
                defaultData={{ title: "Driven by Purpose.", subtitle: "ABOUT US", description: "Desde o início, comprometidos com a precisão.", secondTitle: "Built on Trust.", image: "https://picsum.photos/seed/highway/1600/900" }}
              />
              <SectionEditor 
                id="sobre-history" 
                label="Sobre Us: Nossa História (Timeline)" 
                defaultData={{ title: "Our History.", items: [] }}
              />
              <SectionEditor 
                id="sobre-mission" 
                label="Sobre Us: Missão, Visão e Valores" 
                defaultData={{ title: "What Drives Us.", items: [] }}
              />
              <SectionEditor 
                id="sobre-locations" 
                label="Sobre Us: Localizações (Mapa)" 
                defaultData={{ title: "Our Locations", items: [] }}
              />
              <SectionEditor 
                id="sobre-team" 
                label="Sobre Us: Liderança" 
                defaultData={{ title: "The Leadership.", items: [] }}
              />
              <SectionEditor 
                id="sobre-certs" 
                label="Sobre Us: Certificações" 
                defaultData={{ title: "Our Accreditations", description: "Operamos sob diretrizes internacionais.", items: [] }}
              />
            </div>
          )}

          {/* TAB: SERVIÇOS */}
          {activeTab === "servicos" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <SectionEditor 
                id="servicos-hero" 
                label="Serviços: Hero" 
                defaultData={{ title: "Tailored Logistics.", subtitle: "OUR SERVICES", image: "https://picsum.photos/seed/warehouse/1600/900", secondTitle: "For a Global World." }}
              />
              <SectionEditor 
                id="servicos-capabilities" 
                label="Serviços: Core Capabilities" 
                defaultData={{ title: "End-to-End Solutions", description: "Modelos integrados de supply chain.", items: [] }}
              />
              <SectionEditor 
                id="servicos-process" 
                label="Serviços: O Processo (Step by Step)" 
                defaultData={{ title: "The Process", items: [] }}
              />
            </div>
          )}

          {/* TAB: CONTATO */}
          {activeTab === "contato" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <SectionEditor 
                id="contato-hero" 
                label="Contato: Hero" 
                defaultData={{ title: "Start the Conversation.", subtitle: "REACH OUT TO US." }}
              />
              <SectionEditor 
                id="contato-faq" 
                label="Contato: FAQ (Perguntas Frequentes)" 
                defaultData={{ title: "Frequently Asked Questions", description: "Respondemos as dúvidas mais comuns.", items: [] }}
              />
            </div>
          )}

          {/* TAB: GERAL */}
          {activeTab === "geral" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              <SectionEditor 
                id="navbar" 
                label="Configurações da Navbar (Menu)" 
                defaultData={{ 
                  logoText: "LogiNord",
                  links: [
                    { "text": "Home", "url": "/" },
                    { "text": "Sobre", "url": "/sobre" },
                    { "text": "Serviços", "url": "/servicos" },
                    { "text": "Contato", "url": "/contato" }
                  ],
                  cta: { text: "Solicitar Orçamento", url: "/contato" }
                }}
              />

              {footerConfig && (
                <section style={sectionStyle}>
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                    Rodapé & WhatsApp Global
                  </h2>
                  <form onSubmit={handleSaveFooter}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle}>WhatsApp (ex: 5511999999999)</label>
                        <input type="text" value={footerConfig.whatsappNumber} onChange={(e) => setFooterConfig({ ...footerConfig, whatsappNumber: e.target.value })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Mensagem Inicial</label>
                        <input type="text" value={footerConfig.whatsappMessage} onChange={(e) => setFooterConfig({ ...footerConfig, whatsappMessage: e.target.value })} style={inputStyle} />
                      </div>
                    </div>

                    <label style={labelStyle}>Bio da Empresa (Footer)</label>
                    <textarea value={footerConfig.description} onChange={(e) => setFooterConfig({ ...footerConfig, description: e.target.value })} style={{ ...inputStyle, minHeight: "100px" }} />

                    <h3 className="text-sm font-bold mb-4 opacity-50">Edição técnica das colunas via JSON no script v1.0.</h3>

                    <button type="submit" disabled={saving} className="bg-primary hover:bg-primary/80 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all">
                      <IconDeviceFloppy size={18} /> {saving ? "Salvando..." : "Salvar Configs Globais"}
                    </button>
                  </form>
                </section>
              )}

              <SectionEditor 
                id="seo-global" 
                label="SEO & Metadados" 
                defaultData={{ title: "LogiNord - Cargas com Precisão", description: "Transporte confiável para sua empresa.", keywords: [] }}
              />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function TabButton({ active, icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
        ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}
      `}
    >
      {icon} {label}
    </button>
  );
}
