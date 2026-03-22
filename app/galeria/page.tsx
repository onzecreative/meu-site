import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";

export const metadata = {
  title: "Galeria e Frota",
  description: "Veja nossa frota em ação e a estrutura que garante a entrega perfeita.",
};

export default function GaleriaPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-40 pb-24 bg-[#111111] text-center flex flex-col justify-center items-center relative overflow-hidden border-b border-white/10">
        <h1 className="font-playfair text-white text-[56px] md:text-[72px] font-semibold mb-6 relative z-10">Fleet & Gallery</h1>
        <p className="text-white/60 text-[18px] max-w-2xl mx-auto relative z-10">A potência por trás de cada entrega. Explore nossos veículos e centros de distribuição.</p>
      </div>
      
      <section className="bg-white py-24">
         <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square bg-black/5 rounded-3xl overflow-hidden group">
                   <img src={`https://picsum.photos/seed/truck${i}/800/800`} alt="Gallery image" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
            ))}
         </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
