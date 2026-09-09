import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (![".mp4", ".mov", ".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      return NextResponse.json({ error: "Formato de arquivo inválido." }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeName = file.name.substring(0, file.name.lastIndexOf(".")).replace(/[^a-zA-Z0-9-_]/g, "-");
    const fileName = `uploads/${safeName}-${timestamp}${ext}`;

    const { error } = await supabase.storage
      .from("public_assets")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return NextResponse.json({ error: "Falha ao enviar arquivo para o Supabase." }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("public_assets")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (e) {
    console.error("Upload Error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
