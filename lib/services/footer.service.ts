import { supabase } from "../supabase";

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

export async function getFooterConfig(): Promise<FooterConfig> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", "footer")
      .single();

    if (error || !data) {
      return defaultFooterConfig;
    }
    const parsed = data.data as Partial<FooterConfig>;
    return {
      ...defaultFooterConfig,
      ...parsed,
      columns: parsed.columns ?? defaultFooterConfig.columns,
    };
  } catch {
    return defaultFooterConfig;
  }
}

export async function saveFooterConfig(data: Partial<FooterConfig>): Promise<FooterConfig> {
  const current = await getFooterConfig();
  const updated: FooterConfig = {
    ...current,
    ...data,
    columns: data.columns ?? current.columns,
  };
  
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: "footer", data: updated, updated_at: new Date().toISOString() });
    
  if (error) throw error;

  return updated;
}
