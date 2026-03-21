import { NextRequest, NextResponse } from "next/server";
import { getSectionData, saveSectionData } from "@/lib/services/section.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing section ID" }, { status: 400 });

  const data = await getSectionData(id, {});
  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing section ID" }, { status: 400 });

    const body = await req.json();
    const updated = await saveSectionData(id, body);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
