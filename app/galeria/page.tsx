"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";
import Card3D from "@/components/3d/Card3D";
import { ArrowUpRight, Sparkles, TrendingUp, Cpu, Globe } from "lucide-react";

const CATEGORIES = ["Todos", "IA & Automação", "Web & Plataformas", "E-commerce & Growth"];

const CASES = [
  {
    title: "Agente Neural de Qualificação de Vendas",
    category: "IA & Automação",
    client: "Fintech de Crédito Corporativo",
    metric: "99.4% Taxa de Resposta Imediata",
    metricLabel: "Tempo de resposta: < 8s",
    desc: "Implementação de pipeline cognitivo com IA generativa conectado ao WhatsApp e HubSpot. Redução do ciclo de vendas em 40% com mais de 12.000 leads qualificados por mês.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    tags: ["Next.js", "OpenAI", "HubSpot", "N8N"],
    color: "#6366F1",
  },
  {
    title: "Ecossistema D2C & Escala de Tráfego",
    category: "E-commerce & Growth",
    client: "Marca de Cosméticos Premium",
    metric: "+340% Crescimento de Receita",
    metricLabel: "ROAS consistente: 7.2x",
    desc: "Reestruturação completa da esteira de mídia em Meta Ads e Google Shopping integrada com automações de recuperação de carrinho no WhatsApp.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    tags: ["Meta Ads", "Google Ads", "Shopify", "CAPI"],
    color: "#06B6D4",
  },
  {
    title: "Plataforma Web 3D & Design System",
    category: "Web & Plataformas",
    client: "SaaS de Gestão Inteligente",
    metric: "100/100 Core Web Vitals",
    metricLabel: "TTFB: 0.28s",
    desc: "Arquitetura frontend em Next.js com componentes 3D interativos em Three.js, elevando a percepção de marca e triplicando o tempo médio de permanência.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    tags: ["Next.js 16", "Three.js", "Tailwind v4", "Vercel"],
    color: "#8B5CF6",
  },
  {
    title: "Atendimento Autônomo Omnichannel",
    category: "IA & Automação",
    client: "Distribuidora Nacional",
    metric: "+180h Economizadas/Mês",
    metricLabel: "Resolução em 1º contato: 84%",
    desc: "Fluxos de suporte de primeiro nível com IA integrados ao ERP corporativo para consultas de pedidos, emissão de faturas e triagem de revendedores.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    tags: ["AI Agents", "ERP Integration", "WhatsApp"],
    color: "#10B981",
  },
  {
    title: "Funil de Alta Conversão & Lançamento",
    category: "E-commerce & Growth",
    client: "EdTech de Liderança Executiva",
    metric: "R$ 2.4M Faturados",
    metricLabel: "Custo por lead qualificado: -38%",
    desc: "Estratégia completa de captação de leads com páginas ultra velozes e distribuição programada de anúncios de alto valor percebido.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    tags: ["Growth Funnel", "Meta Ads", "Next.js"],
    color: "#F59E0B",
  },
  {
    title: "Portal Corporativo Global",
    category: "Web & Plataformas",
    client: "Holding de Investimentos",
    metric: "+210% Acessos Orgânicos",
    metricLabel: "Indexação SEO: 100%",
    desc: "Design System com micro-interações refinadas, arquitetura multi-idioma e integração com banco de dados em tempo real para relatórios de investidores.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: ["Next.js", "Supabase", "TypeScript"],
    color: "#6366F1",
  },
];

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredCases =
    activeCategory === "Todos"
      ? CASES
      : CASES.filter((c) => c.category === activeCategory);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#030305" }}>
      <Navbar />

      {/* Header */}
      <div className="pt-44 pb-20 px-4 md:px-10 text-center flex flex-col items-center relative z-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
            [CASES DE SUCESSO // PORTFÓLIO]
          </span>
        </div>

        <h1 className="text-white text-[44px] md:text-[68px] font-extrabold tracking-tight leading-[1.05] mb-6">
          Projetos que definem novos <span className="gradient-accent">padrões digitais.</span>
        </h1>
        <p className="text-[#9496A1] text-[17px] md:text-[19px] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Conheça como aceleramos resultados reais através de inteligência artificial, tráfego de escala e plataformas web de alta engenharia.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-white/[0.1] text-white border border-white/[0.12] shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <section className="py-12 md:py-20 px-4 md:px-10 max-w-7xl mx-auto relative z-10">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCases.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card3D maxTilt={10} glareOpacity={0.15}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#08090E] overflow-hidden flex flex-col h-full group hover:border-indigo-500/40 transition-colors">
                    {/* Preview Image with gradient overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-[#08090E]/40 to-transparent" />
                      
                      {/* Metric Floating Badge */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300 font-bold">
                          {item.metric}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                            {item.client}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/[0.05]">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="text-white text-[19px] font-bold mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all">
                          {item.title}
                        </h3>

                        <p className="text-[#9496A1] text-[13px] leading-relaxed font-light mb-6">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-white/50 border border-white/[0.04]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href="/contato"
                          className="text-white/60 group-hover:text-white transition-colors"
                          aria-label="Ver mais"
                        >
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
