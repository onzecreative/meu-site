"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Label from "./ui/Label";
import Button from "./ui/Button";

// SVG Icons matching the requested logistics differentiators
const Icons = [
  () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8431A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8431A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8431A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8431A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
];

const defaultFeatures = [
  { title: "Certified Fleet", desc: "Modern vehicles equipped for specialized transport compliance." },
  { title: "Real-Time Visibility", desc: "Track every step of the journey with our advanced client portal." },
  { title: "Fast Delivery 20+ Countries", desc: "Cross-border efficiency covering major hubs worldwide." },
  { title: "Multilingual Support", desc: "Our 24/7 team speaks your language to ensure flawless communication." },
];

export default function Features() {
  const [data, setData] = useState<any>({
    title: "Why Leading Businesses Rely on Us",
    subtitle: "We combine operational excellence with robust infrastructure.",
    items: defaultFeatures,
  });

  useEffect(() => {
    fetch("/api/admin/section/features?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const items = data?.items && data.items.length > 0 ? data.items : defaultFeatures;

  return (
    <section id="features" className="w-full bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-12" ref={ref}>
        
        {/* Left Column */}
        <div className="w-full md:w-[35%] flex flex-col items-start pr-0 md:pr-12">
          <Label text="Why LogiNord" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[#1A1A1A] mb-6"
          >
            {data?.title ?? "Why Leading Businesses Rely on Us"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[#1A1A1A]/70 mb-10 max-w-[340px]"
          >
            {data?.subtitle ?? "We combine operational excellence with robust infrastructure."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Button variant="outline-dark" text="Know More About Us" href="/sobre" />
          </motion.div>
        </div>

        {/* Right Column Grid 2x2 */}
        <div className="w-full md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((feat: any, i: number) => {
            const Icon = Icons[i % Icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center bg-[#F2F0EB] p-10 rounded-2xl aspect-square md:aspect-auto hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mb-6 bg-white p-4 rounded-full shadow-sm">
                  <Icon />
                </div>
                <h3 className="text-[#1A1A1A] font-bold text-[22px] mb-3">{feat?.title ?? ""}</h3>
                <p className="text-[#1A1A1A]/60 text-[15px]">{feat?.desc ?? ""}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
