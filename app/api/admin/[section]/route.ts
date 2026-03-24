import { NextRequest, NextResponse } from "next/server";
import { getSectionData, saveSectionData } from "@/lib/services/section.service";

// Define default data for each section to handle empty DB
const DEFAULTS: Record<string, any> = {
  brand: { 
    siteName: "LogiNord", 
    logo: { light: "", dark: "", text: "LogiNord" }, 
    colors: { primary: "#E8431A", background_dark: "#050505", background_light: "#FFFFFF", text_main: "#000000" },
    typography: { google_font: "Urbanist", font_family: "Urbanist, sans-serif" },
    favicon: ""
  },
  navbar: { 
    logoText: "LogiNord",
    links: [], 
    cta: { text: "Contact", href: "/contact", label: "Contact", url: "/contact", show: true } 
  },
  hero: { 
    // Legacy keys for frontend
    title: "Your Freight, Delivered.", 
    subtitle: "Precision in motion.",
    subtitleIndicator: "DRIVEN BY EXCELLENCE.",
    bottomLeftText: "Precision in logistics.",
    bottomRightText: "Get a Quote",
    bottomRightUrl: "/contato",
    type: "url",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    // New keys for editor
    background: { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', opacity: 50 },
    content: { title: "Your Freight, Delivered.", highlight: "LOGISTIC SOLUTIONS", subtitle: "Precision in motion." }
  },
  stats: { label: "FACTS", title: "Quick Numbers", subtitle: "Our impact.", items: [] },
  clients: { logos: [] },
  services: { title: "Our Services", subtitle: "What we do.", items: [] },
  industries: { 
    title: "Industries", 
    subtitle: "Who we serve.",
    cta: { label: "View All", url: "/services" },
    items: [] 
  },
  whyus: { label: "FEATURES", title: "Why Us", subtitle: "Our edge.", items: [] },
  testimonials: { title: "Success Stories", subtitle: "Feedback.", items: [] },
  gallery: { items: [] },
  contact: { 
    title: "Get in Touch", 
    subtitle: "Talk to us.",
    emailDestination: "",
    successMessage: "Enviado!",
    buttonText: "Enviar",
    fields: [
      { label: "Nome", placeholder: "Seu nome", type: "text", required: true, show: true },
      { label: "Email", placeholder: "seu@email.com", type: "email", required: true, show: true },
      { label: "Mensagem", placeholder: "Sua mensagem", type: "textarea", required: true, show: true }
    ]
  },
  faq: { title: "F.A.Q", subtitle: "Questions.", items: [] },
  footer: { 
    description: "Precision in logistics.", 
    copyright: "© 2024 LogiNord.",
    columns: [], 
    socials: { linkedin: "", instagram: "", facebook: "", whatsapp: "" },
    whatsapp: { showFloating: true, showFooter: true, number: "", message: "Olá" }
  },
  settings: { 
    siteName: "LogiNord", 
    seo: { title: "LogiNord", description: "Logistics" },
    integrations: { googleAdsTag: "", metaAdsTag: "", headerTags: "", footerTags: "" },
    siteInfo: { url: "", email: "", phone: "" }
  },
  finalcta: { title: "Ready to move smarter?", subtitle: "Start today.", buttonText: "Get a Quote", buttonUrl: "/contato" },
  "sobre-hero": { title: "Driven by Purpose.", subtitle: "ABOUT US", description: "Precision in logistics.", secondTitle: "Built on Trust.", image: "" },
  "sobre-history": { title: "Our History.", items: [] },
  "sobre-mission": { title: "What Drives Us.", items: [] },
  "sobre-locations": { title: "Our Locations", items: [] },
  "sobre-team": { title: "The Leadership.", items: [] },
  "sobre-certs": { title: "Our Accreditations", items: [] }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const defaultData = DEFAULTS[section] || {};
  
  try {
    const data = await getSectionData(section, defaultData);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  
  try {
    const body = await req.json();
    const updated = await saveSectionData(section, body);
    
    // Log the change in site_content under 'logs'
    try {
      const logs = await getSectionData<any[]>("logs", []);
      logs.unshift({
        section,
        timestamp: new Date().toISOString(),
        action: 'UPDATE'
      });
      await saveSectionData("logs", logs.slice(0, 50));
    } catch (logErr) {
      console.error("Log error:", logErr);
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
