import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Fale Conosco",
  description: "Entre em contato para cotações e suporte.",
};

export default function ContatoPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-40 pb-24 bg-[#111111] text-center flex flex-col justify-center items-center relative overflow-hidden">
        <h1 className="font-playfair text-white text-[56px] md:text-[72px] font-semibold mb-6 relative z-10">Contact Us</h1>
        <p className="text-white/60 text-[18px] max-w-2xl mx-auto relative z-10">Nossa equipe de especialistas está pronta para mapear a melhor rota para o seu negócio.</p>
      </div>

      <section className="bg-white py-32 border-b border-black/5">
         <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row gap-16 md:gap-24">
            
            <div className="w-full md:w-1/2 flex flex-col">
               <h2 className="font-playfair font-semibold text-[40px] text-[#111111] leading-[1.1] tracking-[-0.02em] mb-8">
                  Get in touch
               </h2>
               <p className="text-[#666666] text-[18px] mb-12">
                  Preencha o formulário e retornaremos com uma proposta detalhada ou suporte imediato.
               </p>
               
               <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center text-[#E0400C]">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-[#111111] text-[18px]">Headquarters</p>
                        <p className="text-[#666666]">123 Logistics Avenue, NY 10001</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center text-[#E0400C]">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-[#111111] text-[18px]">Phone Support</p>
                        <p className="text-[#666666]">+1 (555) 123-4567</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center text-[#E0400C]">
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-[#111111] text-[18px]">Email Us</p>
                        <p className="text-[#666666]">contact@loginord.com</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="w-full md:w-1/2 bg-[#FAFAFA] rounded-3xl p-10 md:p-12 border border-black/5">
                <form className="flex flex-col gap-6">
                   <div className="flex flex-col gap-2">
                       <label className="font-semibold text-[14px] text-[#111111]">Name</label>
                       <input type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[#E0400C] transition-colors" placeholder="Your full name" />
                   </div>
                   <div className="flex flex-col gap-2">
                       <label className="font-semibold text-[14px] text-[#111111]">Email</label>
                       <input type="email" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[#E0400C] transition-colors" placeholder="you@company.com" />
                   </div>
                   <div className="flex flex-col gap-2">
                       <label className="font-semibold text-[14px] text-[#111111]">Message</label>
                       <textarea className="w-full min-h-[120px] bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[#E0400C] transition-colors" placeholder="How can we help you?" />
                   </div>
                   <button type="button" className="w-full bg-[#E0400C] hover:bg-[#ff551b] text-white px-5 py-4 rounded-xl text-[16px] font-bold transition-all mt-4">
                      Send Message
                   </button>
                </form>
            </div>

         </div>
      </section>

      <Footer />
    </main>
  );
}
