// MIGRAÇÃO SUPABASE: para migrar este serviço consulte
// /docs/migrar-para-supabase.md

import fs from "fs";
import path from "path";

const HERO_PATH = path.join(process.cwd(), "data", "hero.json");

export type HeroVideoType = "mp4local" | "youtube" | "url";

export interface HeroConfig {
  /** Tipo de vídeo: arquivo local, YouTube ou URL pública */
  type: HeroVideoType;
  /** URL do vídeo (local: /videos/xxx.mp4, ou URL pública) */
  videoUrl: string;
  /** URL do vídeo em versão leve para mobile (480p) — opcional */
  videoUrlMobile: string;
  /** URL do poster (imagem que aparece antes do vídeo carregar) */
  posterUrl: string;
  /** ID do vídeo do YouTube (usado quando type === "youtube") */
  youtubeId: string;
}

const defaultHeroConfig: HeroConfig = {
  type: "url",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  videoUrlMobile: "",
  posterUrl: "",
  youtubeId: "",
};

export function getHeroConfig(): HeroConfig {
  try {
    const raw = fs.readFileSync(HERO_PATH, "utf8");
    return { ...defaultHeroConfig, ...JSON.parse(raw) };
  } catch {
    return defaultHeroConfig;
  }
}

export function saveHeroConfig(data: Partial<HeroConfig>): HeroConfig {
  const current = getHeroConfig();
  const updated: HeroConfig = { ...current, ...data };
  fs.mkdirSync(path.dirname(HERO_PATH), { recursive: true });
  fs.writeFileSync(HERO_PATH, JSON.stringify(updated, null, 2));
  return updated;
}
