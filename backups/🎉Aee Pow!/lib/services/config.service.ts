// MIGRAÇÃO SUPABASE: para migrar este serviço consulte
// /docs/migrar-para-supabase.md

import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "config.json");

export interface SiteConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  font: string;
  site: {
    title: string;
    description: string;
    url: string;
  };
  social: {
    instagram: string;
    whatsapp: string;
    linkedin: string;
  };
  email: {
    destination: string;
    senderName: string;
  };
}

const defaultConfig: SiteConfig = {
  colors: {
    primary: "#DE3F0B",
    secondary: "#111111",
    background: "#1C1C1C",
    text: "#FFFFFF",
  },
  font: "Inter",
  site: {
    title: "LogiNord",
    description: "Sua Carga, Entregue com Precisão.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "",
  },
  social: { instagram: "", whatsapp: "", linkedin: "" },
  email: { destination: "", senderName: "LogiNord Contato" },
};

export function getConfig(): SiteConfig {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return defaultConfig;
  }
}

export function saveConfig(data: Partial<SiteConfig>): SiteConfig {
  const current = getConfig();
  const updated = {
    ...current,
    ...data,
    colors: { ...current.colors, ...(data.colors || {}) },
    site: { ...current.site, ...(data.site || {}) },
    social: { ...current.social, ...(data.social || {}) },
    email: { ...current.email, ...(data.email || {}) },
  };
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2));
  return updated;
}
