"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const defaultServices = [
  { 
    titulo: "National & International Freight",
    imagem: "/images/services/service1.png",
    descricao: "From local deliveries to cross-border transport, we offer reliable freight solutions tailored to your schedule.",
    show: true
  },
  { 
    titulo: "Regional Distribution", 
    imagem: "/images/services/service2.png",
    descricao: "Efficient short-haul transit ensuring that localized supply chains run seamlessly without costly delays.",
    show: true
  },
  { 
    titulo: "Warehousing & Fulfillment",
    imagem: "/images/services/service3.png",
    descricao: "Interior of a modern high-tech warehouse with high shelves filled with neatly organized pallets.",
    show: true
  },
  { 
    titulo: "Refrigerated Transport",
    imagem: "/images/services/service4.png",
    descricao: "Temperature-controlled transport to keep sensitive goods strictly within compliance from origin to destination.",
    show: true
  },
  { 
    titulo: "3PL Subcontracting",
    imagem: "/images/services/service5.png",
    descricao: "Stunning aerial drone shot of a massive logistics hub and warehouse complex.",
    show: true
  },
];

const ServicesSticky = () => {
  const [data, setData] = useState<any>({
    title: "Logistics that fit your needs.",
    subtitle: "From temperature-controlled transport to regional distribution — we've got it covered.",
    items: defaultServices
  });

  useEffect(() => {
    fetch("/api/admin/services?t=" + Date.now())
      .then(r => r.json())
      .then(json => {
        if(json && json.items) setData(json);
      })
      .catch(() => {});
  }, []);

  const items = data.items.filter((s:any) => s.show !== false);
  return (
    <section className="relative bg-white font-urbanist">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* COLUNA ESQUERDA — STICKY */}
          <div className="w-full md:w-1/3 md:sticky md:top-[20vh] self-start py-12 md:py-24">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 leading-tight">
              {data.title}
            </h2>
            <p className="text-lg text-text-main/70 max-w-sm">
              {data.subtitle}
            </p>
          </div>

          {/* COLUNA DIREITA — SCROLL */}
          <div className="w-full md:w-2/3 py-12 md:py-24">
            {items.map((service: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                className="pb-24 last:pb-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                  <span className="text-primary font-bold tracking-wider">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-text-main mb-6">
                  {service.titulo}
                </h3>
                
                <div className="mt-4 rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={service.imagem} 
                    alt={service.titulo}
                    className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSticky;
