import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';

export async function GET(req: NextRequest) {
  try {
    const summary = urbanEngine.getCommandCenterSummary();
    const recentDefects = urbanEngine.getDefects().slice(0, 5);
    const recentIncidents = urbanEngine.getIncidents().slice(0, 4);
    const trafficSummary = urbanEngine.getTrafficData();

    return NextResponse.json({
      success: true,
      summary,
      recentDefects,
      recentIncidents,
      trafficSummary,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
