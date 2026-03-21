import { NextRequest, NextResponse } from "next/server";
import { getHeroConfig, saveHeroConfig } from "@/lib/services/hero.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getHeroConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await saveHeroConfig(body);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
