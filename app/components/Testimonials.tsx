"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Label from "./ui/Label";

const defaultTestimonials = [
  {
    author: "Elena Rodriguez",
    role: "Supply Chain Dir., BioPharma",
    content: "LogiNord completely stabilized our European cold chain routes. We've seen a 40% reduction in spoilage thanks to their real-time monitoring.",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    author: "Marcus Chen",
    role: "CEO, TechParts Global",
    content: "Their API integration makes operations seamless. It feels like they are an extension of our internal team rather than a third-party vendor.",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    author: "Sarah Jenkins",
    role: "Logistics Manager, FreshFoods",
    content: "The on-time delivery rate is impeccable. We need agility for fresh goods, and LogiNord's regional distribution network delivers precisely that.",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    author: "Liam O'Connor",
    role: "VP Operations, Motors Inc",
    content: "Manufacturing relies heavily on JIT delivery. LogiNord engineered a custom route plan that cut our buffer times down to hours.",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
];

export default function Testimonials() {
  const [data, setData] = useState<any>({
    title: "Don't just take our word for it.",
    subtitle: "See how we help businesses move smarter and scale efficiently.",
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
    <section id="testimonials" className="w-full bg-[#F2F0EB] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-12" ref={ref}>
        
        {/* Left Column (1/3) */}
        <div className="w-full md:w-[35%] flex flex-col items-start pr-0 md:pr-12 md:sticky md:top-32 h-fit">
          <Label text="Testimonials" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[#1A1A1A] mb-6"
          >
            {data?.title ?? "Don't just take our word for it."}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[#1A1A1A]/70 mb-10 max-w-[340px]"
          >
            {data?.subtitle ?? "See how we help businesses move smarter and scale efficiently."}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full aspect-[4/3] rounded-2xl overflow-hidden hidden md:block"
          >
            <img src="https://picsum.photos/seed/trucks/600/400" alt="Customer Success" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Right Column Grid 2x2 (2/3) */}
        <div className="w-full md:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {safeItems.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
              className="bg-white p-8 rounded-2xl flex flex-col justify-between shadow-sm card-hover"
            >
              <div className="mb-8">
                {/* Custom Quote Icon */}
                <div className="text-[#E8431A] text-[40px] font-playfair leading-none opacity-20 mb-2">"</div>
                <p className="text-[#1A1A1A] text-[17px] leading-relaxed font-medium">
                  "{item?.content ?? ""}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-[#1A1A1A]/5 pt-6 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img src={item?.avatar || `https://ui-avatars.com/api/?name=${item?.author}&background=E0400C&color=fff`} alt={item?.author} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#1A1A1A] text-[15px]">{item?.author ?? "Client"}</span>
                  <span className="text-[13px] text-[#1A1A1A]/50">{item?.role ?? "Partner"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
