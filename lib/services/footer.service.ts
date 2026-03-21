// MIGRAÇÃO SUPABASE: para migrar este serviço consulte
// /docs/migrar-para-supabase.md

import fs from "fs";
import path from "path";

const FOOTER_PATH = path.join(process.cwd(), "data", "footer.json");

export interface FooterLink {
  id: string;
  text: string;
  url: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  description: string;
  columns: FooterColumn[];
}

const defaultFooterConfig: FooterConfig = {
  whatsappNumber: "5511900000000",
  whatsappMessage: "Olá! Gostaria de solicitar uma cotação.",
  description: "Logística de precisão para empresas que exigem o melhor. Tecnologia e compromisso em cada entrega.",
  columns: [
    {
      id: "col1",
      title: "Blog",
      links: [
        { id: "l1", text: "Ver posts", url: "/blog" },
        { id: "l2", text: "Novidades", url: "/blog/novidades" },
      ],
    },
    {
      id: "col2",
      title: "Carreiras",
      links: [
        { id: "l3", text: "Vagas abertas", url: "/carreiras" },
        { id: "l4", text: "Cultura", url: "/carreiras/cultura" },
      ],
    },
  ],
};

export function getFooterConfig(): FooterConfig {
  try {
    const raw = fs.readFileSync(FOOTER_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      ...defaultFooterConfig,
      ...parsed,
      columns: parsed.columns ?? defaultFooterConfig.columns,
    };
  } catch {
    return defaultFooterConfig;
  }
}

export function saveFooterConfig(data: Partial<FooterConfig>): FooterConfig {
  const current = getFooterConfig();
  const updated: FooterConfig = {
    ...current,
    ...data,
    columns: data.columns ?? current.columns,
  };
  fs.mkdirSync(path.dirname(FOOTER_PATH), { recursive: true });
  fs.writeFileSync(FOOTER_PATH, JSON.stringify(updated, null, 2));
  return updated;
}
