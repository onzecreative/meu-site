"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

const defaultServices = [
  {
    title: "Air Route",
    description: "Covering global destinations.",
    tags: ["Fast", "Global"],
    number: "01",
    linkText: "See Detail"
  },
  {
    title: "Sea Route",
    description: "Delivering across continents.",
    tags: ["Bulk", "Economical"],
    number: "02",
    linkText: "See Detail"
  },
  {
    title: "Land Route",
    description: "Over the road transportation.",
    tags: ["Flexible", "Regional"],
    number: "03",
    linkText: "See Detail"
  },
];

export default function Services() {
  const [data, setData] = useState<any>({
    title: "Logistics that fit your needs.",
    items: defaultServices,
  });

  useEffect(() => {
    fetch("/api/admin/section/services?t=" + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) setData((prev: any) => ({ ...prev, ...json }));
      })
      .catch(() => {});
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="w-full bg-[#FAFAFA] pt-24 pb-32">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-start mb-20">
           <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[40px] md:text-[56px] text-[#111111] leading-[1.1] tracking-[-0.03em] max-w-[600px]"
          >
            {data?.title ?? "Logistics that fit your needs."}
          </motion.h2>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(data?.items || defaultServices).map((service: any, i: number) => (
            <motion.div
              key={service?.title ?? i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-square md:aspect-auto md:h-[400px] border border-black/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[32px] md:text-[40px] text-[#111111] leading-[1.1] tracking-[-0.02em] max-w-[200px]">
                    {service?.title ?? ""}
                  </h3>
                </div>
                <p className="text-[#666666] text-[16px] md:text-[18px] font-medium leading-[1.5]">
                  {service?.description ?? ""}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#111111] font-semibold text-[15px]">
                  {service?.linkText || "See Detail"}
                </span>
                <div className="w-10 h-10 rounded-full border border-[#E0400C] bg-[#E0400C] flex items-center justify-center -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <IconArrowRight size={18} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
