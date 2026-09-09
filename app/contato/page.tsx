"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus, X, ArrowUpRight, CheckCircle2, MessageSquare, Send, Sparkles, PhoneCall } from "lucide-react";
import Card3D from "@/components/3d/Card3D";
import SpotlightCard from "@/components/ui/SpotlightCard";

const INTEREST_OPTIONS = [
  "Tráfego Pago & Escala",
  "Automações com IA & Agentes",
  "Desenvolvimento Web & 3D",
  "Ecossistema Completo",
];

const BUDGET_OPTIONS = [
  "Até R$ 5.000 / mês",
  "R$ 5.000 a R$ 15.000 / mês",
  "R$ 15.000 a R$ 50.000 / mês",
  "Acima de R$ 50.000 / mês",
];

const ONZE_FAQ = [
  {
    q: "Em quanto tempo as primeiras automações ou campanhas entram no ar?",
    a: "Nossa esteira é ágil. Geralmente, as auditorias e as primeiras campanhas estruturadas ou fluxos de IA de atendimento entram em produção entre 7 a 14 dias úteis após o onboarding técnico.",
  },
  {
    q: "Como a IA se conecta ao WhatsApp e ao CRM da minha empresa?",
    a: "Conectamos via API oficial do WhatsApp Business e webhooks diretos com plataformas como HubSpot, RD Station, Kommo, Pipedrive ou ActiveCampaign. Seus dados continuam 100% seguros e sob seu controle.",
  },
  {
    q: "A Onze atende empresas que já têm equipe interna de marketing ou vendas?",
    a: "Sim! Frequentemente atuamos como parceiro de inteligência técnica avançada, treinando sua equipe interna, refinando o tracking e implementando automações complexas que potencializam a produtividade do seu time.",
  },
  {
    q: "Qual o investimento mínimo para iniciar uma parceria?",
    a: "Estruturamos propostas sob medida com base nos seus objetivos e gargalos atuais. Focamos em projetos onde o retorno sobre o investimento (ROI) seja matematicamente sustentável e escalável.",
  },
  {
    q: "Como é feito o acompanhamento de métricas e relatórios?",
    a: "Você tem acesso a dashboards em tempo real com dados unificados de CAC, ROAS e conversão de leads, além de reuniões quinzenais ou mensais de alinhamento com nossos estrategistas.",
  },
];

export default function ContatoPage() {
  const [selectedInterest, setSelectedInterest] = useState<string>(INTEREST_OPTIONS[0]);
  const [selectedBudget, setSelectedBudget] = useState<string>(BUDGET_OPTIONS[1]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#030305" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full pt-44 pb-16 px-4 md:px-10 max-w-7xl mx-auto relative z-10" ref={heroRef}>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
              [BRIEFING & CONTACT // ONZE CORE]
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white text-[44px] md:text-[68px] font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            Vamos construir o próximo salto do seu <span className="gradient-accent">negócio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[#9496A1] text-[17px] md:text-[19px] leading-relaxed font-light"
          >
            Preencha o formulário interativo abaixo para receber uma análise técnica preliminar, ou acione nossos especialistas direto pelo WhatsApp.
          </motion.p>
        </div>

        {/* Interactive Briefing Console */}
        <div className="max-w-4xl mx-auto">
          <Card3D maxTilt={4} glareOpacity={0.12}>
            <div className="p-8 md:p-12 rounded-3xl bg-[#08090E] border border-white/[0.1] shadow-2xl relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[12px] font-mono font-bold text-white uppercase tracking-wider">
                    Console de Briefing do Projeto
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/40">
                  TEMPO ESTIMADO: 2 MINUTOS
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-white text-[28px] font-bold mb-3">Briefing Recebido com Sucesso!</h3>
                  <p className="text-[#9496A1] text-[16px] max-w-md font-light leading-relaxed mb-8">
                    Nossa diretoria técnica irá analisar suas respostas e entrar em contato em até 24 horas úteis.
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg"
                  >
                    <MessageSquare size={16} />
                    <span>Falar Imediatamente no WhatsApp</span>
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {/* Step 1: Solution type */}
                  <div>
                    <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-3">
                      1. Qual solução é prioridade para sua empresa?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INTEREST_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setSelectedInterest(opt)}
                          className={`p-3.5 rounded-xl text-[13px] font-medium text-left transition-all border cursor-pointer ${
                            selectedInterest === opt
                              ? "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                              : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Budget */}
                  <div>
                    <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-3">
                      2. Faixa estimada de investimento mensal
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUDGET_OPTIONS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setSelectedBudget(b)}
                          className={`p-3.5 rounded-xl text-[13px] font-medium text-left transition-all border cursor-pointer ${
                            selectedBudget === b
                              ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                              : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-2">
                        Nome Completo *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Carlos Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 text-[14px]"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-2">
                        E-mail Corporativo *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="carlos@suaempresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 text-[14px]"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-2">
                        Nome da Empresa *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Sua Empresa Ltda"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 text-[14px]"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-2">
                        WhatsApp com DDD *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 text-[14px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] font-mono uppercase tracking-wider text-white/70 block mb-2">
                      Fale um pouco sobre o momento da sua empresa
                    </label>
                    <textarea
                      placeholder="Quais são os principais desafios atuais de vendas, tráfego ou automação?"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 text-[14px] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 transition-all duration-300 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enviar Briefing para Diagnóstico</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </Card3D>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 md:py-32 relative border-t border-white/[0.06]" style={{ background: "#08090E" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="text-white text-[32px] md:text-[44px] font-bold mt-2">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {ONZE_FAQ.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className="rounded-2xl border border-white/[0.08] bg-[#030305] p-6 cursor-pointer transition-colors hover:border-indigo-500/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-white font-bold text-[17px] leading-snug">
                      {item.q}
                    </h4>
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/70 shrink-0">
                      {isOpen ? <X size={16} /> : <Plus size={16} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="mt-4 pt-4 border-t border-white/[0.06] text-[#9496A1] text-[14px] leading-relaxed font-light">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
