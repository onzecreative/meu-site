import { NextRequest, NextResponse } from "next/server";
import { getFooterConfig, saveFooterConfig } from "@/lib/services/footer.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getFooterConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  try {
    try {
    const data = await req.json();
    const updated = await saveFooterConfig(data);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Erro desconhecido" }, { status: 400 });
  }
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
