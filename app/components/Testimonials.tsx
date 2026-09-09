"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultTestimonials = [
  {
    author: "Rafael Silveira",
    role: "Fundador, E-commerce Moda & Acessórios",
    content: "A Onze reestruturou toda a nossa esteira de tráfego pago e automação de pós-venda. O faturamento cresceu 3.4x em 5 meses com ROAS consistente acima de 7.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    metric: "+340% Receita",
  },
  {
    author: "Camila Duarte",
    role: "Diretora Comercial, Distribuidora Nacional",
    content: "Implementamos automações com IA para atendimento e qualificação de revendedores. O tempo de resposta caiu para segundos e as conversões dobraram.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    metric: "2x Conversão de Leads",
  },
  {
    author: "Lucas Menezes",
    role: "Mentor & Estrategista Digital",
    content: "O novo site e funil desenvolvido pela Onze elevou instantaneamente a percepção de valor dos nossos programas. Nossos tickets médios subiram mais de 60%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    metric: "+60% Ticket Médio",
  },
  {
    author: "Mariana Costa",
    role: "CEO, Cosméticos Premium",
    content: "A consultoria estratégica e o ecossistema integrado da Onze nos deram clareza total dos nossos números e velocidade recorde para testar novas ofertas.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    metric: "Escala Previsível",
  },
];

export default function Testimonials() {
  const [data, setData] = useState<any>({
    title: "Resultados reais de quem\nconfia na Onze.",
    subtitle: "Conheça como transformamos o posicionamento e as vendas de negócios no digital.",
    items: defaultTestimonials,
  });

  useEffect(() => {
    fetch("/api/admin/testimonials?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const safeItems = data.items && data.items.length > 0 ? data.items : defaultTestimonials;

  return (
    <section id="testimonials" className="w-full py-[120px] md:py-[160px] relative overflow-hidden" style={{ background: "#030305" }}>
      
      {/* Decorative Glow */}
      <div 
        className="glow-cyan"
        style={{ width: 500, height: 500, bottom: "10%", left: "-5%", opacity: 0.15 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-16 md:gap-12" ref={ref}>
        
        {/* Left Column (1/3) */}
        <div className="w-full md:w-[35%] flex flex-col items-start pr-0 md:pr-10 md:sticky md:top-36 h-fit">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-white/80 uppercase tracking-widest">
              [TRUST & ROI // VERIFIED]
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-white mb-6 whitespace-pre-line text-[32px] md:text-[44px] font-extrabold tracking-tight leading-tight"
          >
            {data?.title ?? "Resultados reais de quem\nconfia na Onze."}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#9496A1] mb-10 max-w-[340px] leading-relaxed text-[15px] font-light"
          >
            {data?.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full rounded-2xl p-6 border border-white/[0.08] bg-[#08090E] hidden md:flex flex-col gap-3 shadow-lg"
          >
            <div className="flex items-center gap-1.5 text-amber-400">
              {"★★★★★".split("").map((star, idx) => (
                <span key={idx} className="text-[16px]">★</span>
              ))}
              <span className="text-[12px] font-mono text-white/60 ml-2">5.0 SCORE</span>
            </div>
            <p className="text-white font-bold text-[17px]">
              NPS 98 / 100
            </p>
            <p className="text-[#9496A1] text-[13px] leading-relaxed">
              Empresas aceleradas com alta retenção, automações ativas e crescimento contínuo de faturamento.
            </p>
          </motion.div>
        </div>

        {/* Right Column Grid 2x2 (2/3) */}
        <div className="w-full md:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-5">
          {safeItems.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <div className="bg-[#08090E] border border-white/[0.08] hover:border-indigo-500/40 p-7 rounded-2xl flex flex-col justify-between h-full transition-all duration-300 relative group overflow-hidden">
                <div className="mb-6">
                  {/* Metric Badge */}
                  {item.metric && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item.metric}
                    </div>
                  )}
                  
                  <p className="text-[#E2E4E9] text-[15px] leading-relaxed font-light">
                    "{item?.content ?? ""}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3.5 border-t border-white/[0.06] pt-5 mt-auto">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/10">
                    <img 
                      src={item?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item?.author || 'User')}&background=6366F1&color=fff`} 
                      alt={item?.author} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-[14px]">{item?.author ?? "Cliente"}</span>
                    <span className="text-[12px] text-[#9496A1]">{item?.role ?? "Parceiro"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
