import { NextRequest, NextResponse } from "next/server";
import { getHeroConfig, saveHeroConfig } from "@/lib/services/hero.service";

export async function GET() {
  const config = getHeroConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = saveHeroConfig(body);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
