import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (![".mp4", ".mov"].includes(ext)) {
      return NextResponse.json({ error: "Formato inválido. Use MP4 ou MOV." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    fs.mkdirSync(VIDEOS_DIR, { recursive: true });

    const timestamp = Date.now();
    const safeName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, "-");
    const fileName = `${safeName}-${timestamp}${ext}`;
    const filePath = path.join(VIDEOS_DIR, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ url: `/videos/${fileName}` });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
