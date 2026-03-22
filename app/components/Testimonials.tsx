"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const defaultTestimonials = [
  {
    quote: "LogiNord transformed our supply chain with impressive, reliable logistics.",
    name: "Tom Holland",
    role: "CCO",
    company: "Stark Industries",
    initials: "TH",
    color: "#E0400C",
  },
  {
    quote: "Working with LogiNord has been a game-changer! Their support is incredible.",
    name: "Mary Jane",
    role: "Sales Executive",
    company: "Empire",
    initials: "MJ",
    color: "#111111",
  },
  {
    quote: "Precision and speed that outmatches any other vendor we have worked with.",
    name: "Peter Parker",
    role: "CEO",
    company: "Daily Bugle",
    initials: "PP",
    color: "#333333",
  },
];

export default function Testimonials() {
  const [data, setData] = useState<any>({
    title: "What Our Clients Say",
    items: defaultTestimonials,
  });

  useEffect(() => {
    fetch("/api/admin/section/testimonials?t=" + Date.now())
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
    <section id="testimonials" className="w-full bg-white pt-32 pb-40 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] mb-8" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair font-semibold text-[44px] md:text-[56px] text-[#111111] leading-[1.05] tracking-[-0.03em] max-w-[800px]"
          >
            {data?.title ?? "What Our Clients Say"}
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
           {/* Featured Video Placeholder */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={inView ? { opacity: 1, scale: 1 } : {}}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="w-full lg:w-5/12 aspect-[4/5] bg-black rounded-[40px] relative overflow-hidden group cursor-pointer shadow-2xl"
           >
              <img src="https://picsum.photos/seed/ceo/600/800" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="CEO Placeholder" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#E0400C] transition-colors duration-300">
                    <Play size={32} className="text-white fill-white ml-1" />
                 </div>
              </div>
              <div className="absolute bottom-10 left-10 right-10">
                 <p className="text-white font-playfair text-[28px] font-semibold leading-[1.2] mb-4">"LogiNord is the only partner we trust for cross-border logistics."</p>
                 <p className="text-white/70 font-bold text-[15px] tracking-wide uppercase">CEO, FastTrade Inc.</p>
              </div>
           </motion.div>

           {/* Carousel Snap Grid */}
           <div className="w-full lg:w-7/12 flex flex-col justify-center relative">
              <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar group/carousel">
                {safeItems.map((t: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="min-w-[85%] md:min-w-[380px] snap-center bg-[#FAFAFA] rounded-[32px] p-10 md:p-12 flex flex-col justify-between border border-black/[0.04] hover:border-black/10 transition-colors"
                  >
                    <p className="font-playfair text-[#111111] text-[20px] md:text-[24px] font-medium leading-[1.4] tracking-[-0.01em] mb-12">
                      &ldquo;{t?.quote ?? ""}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-5">
                      <div 
                        className="w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center text-white font-bold text-[16px] shadow-sm" 
                        style={{ backgroundColor: t?.color ?? "#111" }}
                      >
                        {t?.initials ?? "CL"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-playfair font-bold text-[#111111] text-[18px]">
                          {t?.name ?? ""}
                        </span>
                        <span className="text-[#666666] text-[14px] font-medium tracking-tight">
                          {t?.role ?? ""} {t?.company ? `@ ${t.company}` : ""}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Controls Hint */}
              <div className="absolute bottom-0 right-0 flex gap-2">
                 <div className="w-12 h-12 rounded-full hidden lg:flex items-center justify-center border border-black/10 text-black/30">←</div>
                 <div className="w-12 h-12 rounded-full hidden lg:flex items-center justify-center border border-black/10 text-black/30">→</div>
              </div>
           </div>
        </div>

      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
