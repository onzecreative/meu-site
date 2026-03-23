"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/UI/Sidebar";
import Header from "./components/UI/Header";
import Dashboard from "./components/Dashboard";
import BrandEditor from "./components/editors/BrandEditor";
import NavbarEditor from "./components/editors/NavbarEditor";
import HeroEditor from "./components/editors/HeroEditor";
import StatsEditor from "./components/editors/StatsEditor";
import ClientsEditor from "./components/editors/ClientsEditor";
import ServicesEditor from "./components/editors/ServicesEditor";
import IndustriesEditor from "./components/editors/IndustriesEditor";
import WhyUsEditor from "./components/editors/WhyUsEditor";
import TestimonialsEditor from "./components/editors/TestimonialsEditor";
import FinalCTAEditor from "./components/editors/FinalCTAEditor";
import SobreEditor from "./components/editors/SobreEditor";
import GalleryEditor from "./components/editors/GalleryEditor";
import ContactEditor from "./components/editors/ContactEditor";
import FAQEditor from "./components/editors/FAQEditor";
import FooterEditor from "./components/editors/FooterEditor";
import SettingsEditor from "./components/editors/SettingsEditor";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-inter overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
            {activeTab === 'brand' && <BrandEditor />}
            {activeTab === 'navbar' && <NavbarEditor />}
            {activeTab === 'hero' && <HeroEditor />}
            {activeTab === 'stats' && <StatsEditor />}
            {activeTab === 'clients' && <ClientsEditor />}
            {activeTab === 'services' && <ServicesEditor />}
            {activeTab === 'industries' && <IndustriesEditor />}
            {activeTab === 'whyus' && <WhyUsEditor />}
            {activeTab === 'testimonials' && <TestimonialsEditor />}
            {activeTab === 'finalcta' && <FinalCTAEditor />}
            {activeTab === 'sobre' && <SobreEditor />}
            {activeTab === 'gallery' && <GalleryEditor />}
            {activeTab === 'contact' && <ContactEditor />}
            {activeTab === 'faq' && <FAQEditor />}
            {activeTab === 'footer' && <FooterEditor />}
            {activeTab === 'settings' && <SettingsEditor />}
          </div>
        </main>
      </div>
      
      {/* Global Toast / Notifications can be added here */}
    </div>
  );
}
