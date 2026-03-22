"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Label from "./ui/Label";

const defaultServices = [
  {
    title: "National & International Freight",
    desc: "From local deliveries to cross-border transport, we offer reliable freight solutions tailored to your schedule.",
    image: "https://picsum.photos/seed/trucks2/1200/800",
  },
  {
    title: "Regional Distribution",
    desc: "Efficient short-haul transit ensuring that localized supply chains run seamlessly without costly delays.",
    image: "https://picsum.photos/seed/boxes/1200/800",
  },
  {
    title: "Cold Chain Logistics",
    desc: "Temperature-controlled transport to keep sensitive goods strictly within compliance from origin to destination.",
    image: "https://picsum.photos/seed/ice/1200/800",
  },
];

export default function Services() {
  const [data, setData] = useState<any>({
    title: "Logistics that fit your needs.",
    subtitle: "From temperature-controlled transport to regional distribution — we've got it covered.",
    items: defaultServices,
  });

  useEffect(() => {
    fetch("/api/admin/section/services?t=" + Date.now())
      .then((r) => r.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = data?.items || defaultServices;

  return (
    <section id="services" className="w-full bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-8 relative" ref={ref}>
        
        {/* Left Column (Sticky) */}
        <div className="w-full md:w-[40%] flex flex-col relative">
          <div className="md:sticky md:top-32 flex flex-col items-start pr-0 md:pr-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#1A1A1A] mb-6 max-w-[400px]"
            >
              {data?.title ?? "Logistics that fit your needs."}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[#1A1A1A]/70 max-w-[340px]"
            >
              {data?.subtitle ?? "From temperature-controlled transport to regional distribution — we've got it covered."}
            </motion.p>
          </div>
        </div>

        {/* Right Column (Stacked List) */}
        <div className="w-full md:w-[60%] flex flex-col gap-24">
          {items.map((service: any, i: number) => {
             const num = (i + 1).toString().padStart(2, "0");
             return (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="flex flex-col items-start w-full"
               >
                 <Label text={num} />
                 
                 <h3 className="text-[#1A1A1A] mb-8 leading-tight">
                   {service?.title ?? ""}
                 </h3>
                 
                 <div className="w-full overflow-hidden rounded-2xl bg-[#F2F0EB]">
                   <img 
                     src={service?.image ?? defaultServices[i]?.image} 
                     alt={service?.title} 
                     className="w-full aspect-[4/3] md:aspect-[16/10] object-cover scale-[1.01] hover:scale-105 transition-transform duration-700 ease-out" 
                   />
                 </div>
               </motion.div>
             )
          })}
        </div>

      </div>
    </section>
  );
}
