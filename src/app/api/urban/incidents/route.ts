import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const license = searchParams.get('license');

    let incidents = urbanEngine.getIncidents();
    let anprRecords = urbanEngine.getANPRRecords();

    if (type && type !== 'all') {
      incidents = incidents.filter((i) => i.type === type);
    }

    if (license && license.trim()) {
      const q = license.trim().toLowerCase();
      anprRecords = anprRecords.filter((a) => a.licensePlate.toLowerCase().includes(q));
      incidents = incidents.filter((i) => i.licensePlate?.toLowerCase().includes(q));
    }

    return NextResponse.json({
      success: true,
      incidentsCount: incidents.length,
      anprCount: anprRecords.length,
      incidents,
      anprRecords,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
