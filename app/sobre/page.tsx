import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Sobre Nós",
  description: "Conheça mais sobre a LogiNord, nossa história e infraestrutura de ponta.",
};

export default function SobrePage() {
  return (
    <main>
      <Navbar />
      <div className="pt-40 pb-24 bg-[#111111] text-center min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="font-playfair text-white text-[64px] font-semibold mb-6">About Us</h1>
        <p className="text-white/60 text-[18px] max-w-2xl mx-auto">Em construção. Adicione componentes do Admin aqui.</p>
      </div>
      <Footer />
    </main>
  );
}
