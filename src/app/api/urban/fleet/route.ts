import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const busId = searchParams.get('id');

    if (busId) {
      const bus = urbanEngine.getBusById(busId);
      if (!bus) return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
      return NextResponse.json({ success: true, data: bus });
    }

    const fleet = urbanEngine.getFleet();
    return NextResponse.json({
      success: true,
      count: fleet.length,
      data: fleet,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
