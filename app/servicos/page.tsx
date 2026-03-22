import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Industries from "../components/Industries";

export const metadata = {
  title: "Nossos Serviços",
  description: "Conheça todas as opções de logística, desde o transporte rodoviário até soluções globais.",
};

export default function ServicosPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-40 pb-0 bg-[#111111] text-center min-h-[30vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15l15 15-15 15M30 15l15 15-15 15' stroke='white' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }} />
        <h1 className="font-playfair text-white text-[56px] md:text-[72px] font-semibold mb-6">Our Services</h1>
        <p className="text-white/60 text-[18px] max-w-2xl mx-auto">Soluções modulares para cada desafio de transporte e armazenamento do seu negócio.</p>
      </div>
      
      {/* Reusing existing configured components */}
      <Services />
      <Industries />
      
      <Footer />
    </main>
  );
}
