"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Label from "../components/ui/Label";
import { Plus, X, ArrowRight } from "lucide-react";

const faqData = [
  {q: "Do you handle temperature-controlled shipments internationally?", a: "Yes, we operate HACCP-compliant refrigerated transport across Europe and the US, ensuring strict temperature logging at every node."},
  {q: "What's the average quote response time?", a: "We typically respond within 24 hours on business days. Emergency or expedited requests are triaged for immediate attention."},
  {q: "Can I request dedicated capacity for seasonal peaks?", a: "Absolutely. Our modular plans allow you to scale up or down based on demand. We recommend reserving flex-capacity 30 days in advance."},
  {q: "Do you offer real-time tracking for all shipments?", a: "Yes, all shipments include GPS tracking with a client portal for full visibility into ETA, temperature data, and proof of pickup/delivery."},
  {q: "What industries do you specialize in?", a: "Food & Beverage, Pharmaceutical & Medical, Industrial & Manufacturing, Electronics & Technology, and Retail & E-Commerce."},
];

export default function ContatoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO CONTATO --- */}
      <section className="w-full bg-[#F2F0EB] pt-40 pb-24 md:pb-40 px-[16px] md:px-[40px] relative" ref={heroRef}>
        <div className="max-w-7xl mx-auto flex flex-col items-center flex-1 w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Label text="REACH OUT TO US." />
            <h1 className="text-[#1A1A1A] mt-6">Start the Conversation.</h1>
          </motion.div>
        </div>

        {/* --- FORMULÁRIO (Sobreposto flutuante) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-[780px] mx-auto bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 md:p-10 -mb-48 mt-16 md:-mb-64 md:mt-24 z-20"
        >
          <form className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Field 01 */}
              <div className="flex flex-col gap-3">
                <span className="text-[14px] text-[#1A1A1A]"><span className="text-[#1A1A1A]/40 text-[12px] font-bold mr-2">01</span><span className="font-bold">Full Name*</span></span>
                <input type="text" placeholder="John Doe" className="w-full bg-white border border-[#E0DDD8] rounded-[56px] px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]" />
              </div>
              
              {/* Field 02 */}
              <div className="flex flex-col gap-3">
                <span className="text-[14px] text-[#1A1A1A]"><span className="text-[#1A1A1A]/40 text-[12px] font-bold mr-2">02</span><span className="font-bold">Company Name</span></span>
                <input type="text" placeholder="Your Company Ltd." className="w-full bg-white border border-[#E0DDD8] rounded-[56px] px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]" />
              </div>

              {/* Field 03 */}
              <div className="flex flex-col gap-3">
                <span className="text-[14px] text-[#1A1A1A]"><span className="text-[#1A1A1A]/40 text-[12px] font-bold mr-2">03</span><span className="font-bold">Email Address*</span></span>
                <input type="email" placeholder="john@company.com" className="w-full bg-white border border-[#E0DDD8] rounded-[56px] px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]" />
              </div>

              {/* Field 04 */}
              <div className="flex flex-col gap-3">
                <span className="text-[14px] text-[#1A1A1A]"><span className="text-[#1A1A1A]/40 text-[12px] font-bold mr-2">04</span><span className="font-bold">Phone Number</span></span>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white border border-[#E0DDD8] rounded-[56px] px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]" />
              </div>
            </div>

            {/* Field 05 */}
            <div className="flex flex-col gap-3">
              <span className="text-[14px] text-[#1A1A1A]"><span className="text-[#1A1A1A]/40 text-[12px] font-bold mr-2">05</span><span className="font-bold">What are you contacting us about?*</span></span>
              <select className="w-full bg-white border border-[#E0DDD8] rounded-[56px] px-5 py-4 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] appearance-none cursor-pointer">
                <option value="freight">National & International Freight</option>
                <option value="coldchain">Cold Chain Logistics</option>
                <option value="distribution">Regional Distribution</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            {/* Field 06 */}
            <div className="flex flex-col gap-3">
              <span className="text-[14px] text-[#1A1A1A]"><span className="text-[#1A1A1A]/40 text-[12px] font-bold mr-2">06</span><span className="font-bold">Message*</span></span>
              <textarea placeholder="Tell us more about your logistics needs..." className="w-full bg-white border border-[#E0DDD8] rounded-[16px] px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A] min-h-[160px] resize-y" />
            </div>

            {/* Submit */}
            <div className="flex flex-col items-start gap-4 mt-4">
              <button 
                type="button" 
                className="group flex items-center justify-between gap-4 rounded-[56px] pl-8 pr-3 py-3 w-fit transition-all duration-300 bg-[#E8431A] text-white hover:bg-[#d03a15] font-bold text-[16px] md:text-[18px]"
              >
                <span>Send Message</span>
                <div className="w-12 h-12 rounded-[56px] flex items-center justify-center bg-white/20 border border-white/30 transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight size={20} className="text-white" />
                </div>
              </button>
              <p className="text-[13px] text-[#1A1A1A]/50 font-medium">We'll get back to you within 1-3 business days.</p>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Spacer to absorb negative margin */}
      <div className="w-full h-32 md:h-48 bg-white" />

      {/* --- FAQ --- */}
      <section className="w-full bg-white pt-16 pb-24 md:pb-32" ref={faqRef}>
        <div className="max-w-7xl mx-auto px-[16px] md:px-[40px] flex flex-col items-center">
          <Label text="WE'RE HERE TO HELP YOU" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#1A1A1A] text-center max-w-[800px] leading-[1.1] mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#1A1A1A]/70 text-center max-w-[600px] mb-16 md:mb-24"
          >
            We've answered some of the most common questions below. Still unsure? Reach out — our team is here to help.
          </motion.p>

          <div className="w-full max-w-4xl flex flex-col gap-4">
            {faqData.map((faq, i) => {
              const isOpen = openFaq === i;
              const num = (i + 1).toString().padStart(2, "0");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-[#E0DDD8] rounded-[16px] overflow-hidden cursor-pointer"
                  onClick={() => toggleFaq(i)}
                >
                  <div className="flex items-center justify-between p-6 md:p-8">
                    <div className="flex items-center gap-4 md:gap-8 pr-6">
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-2 h-2 rounded-[56px] border-2 border-[#E8431A]" />
                        <span className="text-[#1A1A1A]/40 font-bold text-[13px]">{num}</span>
                      </div>
                      <h4 className={`text-[#1A1A1A] font-bold text-[18px] md:text-[20px] leading-snug transition-colors ${isOpen ? 'text-[#E8431A]' : ''}`}>
                        {faq.q}
                      </h4>
                    </div>
                    
                    <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-[56px] border border-[#E0DDD8] flex items-center justify-center text-[#1A1A1A] transition-transform duration-300" style={{ transform: isOpen ? 'rotate(90deg) scale(0.95)' : 'rotate(0deg) scale(1)' }}>
                      {isOpen ? <X size={20} className="text-[#E8431A]"/> : <Plus size={20} />}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-[16px] md:px-8 pb-8 pt-0 pl-12 md:pl-[84px] text-[#1A1A1A]/70 text-[16px] md:text-[18px]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
