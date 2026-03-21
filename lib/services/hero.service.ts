import { supabase } from "../supabase";

export type HeroVideoType = "mp4local" | "youtube" | "url";

export interface HeroConfig {
  type: HeroVideoType;
  videoUrl: string;
  videoUrlMobile: string;
  posterUrl: string;
  youtubeId: string;
}

const defaultHeroConfig: HeroConfig = {
  type: "url",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  videoUrlMobile: "",
  posterUrl: "",
  youtubeId: "",
};

export async function getHeroConfig(): Promise<HeroConfig> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", "hero")
      .single();

    if (error || !data) {
      return defaultHeroConfig;
    }
    return { ...defaultHeroConfig, ...(data.data as Partial<HeroConfig>) };
  } catch {
    return defaultHeroConfig;
  }
}

export async function saveHeroConfig(data: Partial<HeroConfig>): Promise<HeroConfig> {
  const current = await getHeroConfig();
  const updated = { ...current, ...data };
  
  await supabase
    .from("site_content")
    .upsert({ id: "hero", data: updated, updated_at: new Date().toISOString() });
    
  return updated;
}
