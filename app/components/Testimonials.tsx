"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
    <section id="testimonials" className="w-full bg-white pt-32 pb-40">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="w-3 h-3 rounded-full border-[2.5px] border-[#E0400C] mb-8" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[44px] md:text-[56px] text-[#111111] leading-[1.05] tracking-[-0.03em] max-w-[800px]"
          >
            {data?.title ?? "What Our Clients Say"}
          </motion.h2>
        </div>

        {/* Grid Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safeItems.map((t: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] rounded-3xl p-10 flex flex-col justify-between aspect-[4/3] border border-black/[0.04] hover:border-black/10 transition-colors"
            >
              <p className="font-['Plus_Jakarta_Sans'] text-[#111111] text-[20px] md:text-[24px] font-medium leading-[1.4] tracking-[-0.01em] mb-12">
                &ldquo;{t?.quote ?? ""}&rdquo;
              </p>
              
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center text-white font-bold text-[15px]" 
                  style={{ backgroundColor: t?.color ?? "#111" }}
                >
                  {t?.initials ?? "CL"}
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#111111] text-[16px]">
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

      </div>
    </section>
  );
}
