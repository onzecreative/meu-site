// MIGRAÇÃO SUPABASE: para migrar este serviço consulte
// /docs/migrar-para-supabase.md

import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export interface ImageInfo {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

export function getImages(): ImageInfo[] {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    const files = fs.readdirSync(UPLOADS_DIR).filter(
      (f) => !f.startsWith(".") && /\.(jpe?g|png|gif|webp|svg)$/i.test(f)
    );
    return files.map((name) => {
      const filePath = path.join(UPLOADS_DIR, name);
      const stat = fs.statSync(filePath);
      return {
        name,
        url: `/uploads/${name}`,
        size: stat.size,
        createdAt: stat.birthtime.toISOString(),
      };
    }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function saveImage(
  buffer: Buffer,
  originalName: string
): Promise<ImageInfo> {
  const sharp = (await import("sharp")).default;
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });

  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const base = path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, "-");
  const timestamp = Date.now();
  const fileName = `${base}-${timestamp}${ext === ".jpg" || ext === ".jpeg" ? ".webp" : ext}`;
  const filePath = path.join(UPLOADS_DIR, fileName);

  // Converte para WebP se for jpeg/jpg, redimensiona para max 1920px
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    await sharp(buffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(filePath.replace(/\.[^.]+$/, ".webp"));
    const finalPath = filePath.replace(/\.[^.]+$/, ".webp");
    const finalName = fileName.replace(/\.[^.]+$/, ".webp");
    const stat = fs.statSync(finalPath);
    return {
      name: finalName,
      url: `/uploads/${finalName}`,
      size: stat.size,
      createdAt: new Date().toISOString(),
    };
  }

  fs.writeFileSync(filePath, buffer);
  const stat = fs.statSync(filePath);
  return {
    name: fileName,
    url: `/uploads/${fileName}`,
    size: stat.size,
    createdAt: new Date().toISOString(),
  };
}

export function deleteImage(name: string): boolean {
  try {
    const filePath = path.join(UPLOADS_DIR, name);
    // Previne path traversal
    if (!filePath.startsWith(UPLOADS_DIR)) return false;
    fs.unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
}
