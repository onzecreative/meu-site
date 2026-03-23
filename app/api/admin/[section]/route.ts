import { NextRequest, NextResponse } from "next/server";
import { getSectionData, saveSectionData } from "@/lib/services/section.service";

// Define default data for each section to handle empty DB
const DEFAULTS: Record<string, any> = {
  brand: { siteName: "LogiNord", logo: "", colors: { primary: "#E8431A" } },
  navbar: { links: [], cta: { text: "Contact", href: "/contact" } },
  hero: { title: "Your Freight, Delivered.", subtitle: "Precision in motion." },
  stats: { label: "FACTS", items: [] },
  clients: { logos: [] },
  services: { title: "Our Services", items: [] },
  industries: { title: "Industries", items: [] },
  whyus: { title: "Why Us", items: [] },
  testimonials: { title: "Success Stories", items: [] },
  gallery: { items: [] },
  contact: { title: "Get in Touch" },
  faq: { items: [] },
  footer: { columns: [], socials: {} },
  settings: { siteName: "LogiNord", seo: {} },
  finalcta: { title: "Ready to move smarter?", buttonText: "Get a Quote", buttonUrl: "/contato" },
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
