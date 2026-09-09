import { NextRequest, NextResponse } from "next/server";
import { getSectionData } from "@/lib/services/section.service";

export async function GET() {
  try {
    const logs = await getSectionData<any[]>("logs", []);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json([]);
  }
}
