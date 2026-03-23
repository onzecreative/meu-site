import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = await params;
  const filePath = path.join(process.cwd(), 'data', `${section}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = await params;
  const filePath = path.join(process.cwd(), 'data', `${section}.json`);
  const logsPath = path.join(process.cwd(), 'data', 'logs.json');

  try {
    const body = await request.json();
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));

    // Log the change
    try {
      const logsData = await fs.readFile(logsPath, 'utf8');
      const logs = JSON.parse(logsData);
      const newLog = {
        section,
        timestamp: new Date().toISOString(),
        action: 'UPDATE'
      };
      logs.unshift(newLog);
      await fs.writeFile(logsPath, JSON.stringify(logs.slice(0, 10), null, 2));
    } catch (logError) {
      console.error('Failed to log change:', logError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}
