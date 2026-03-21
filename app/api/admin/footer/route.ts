import { NextRequest, NextResponse } from "next/server";
import { getFooterConfig, saveFooterConfig } from "@/lib/services/footer.service";

export async function GET() {
  const config = getFooterConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = saveFooterConfig(body);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
