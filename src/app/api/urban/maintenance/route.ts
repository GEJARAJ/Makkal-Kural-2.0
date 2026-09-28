import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';

export async function GET(req: NextRequest) {
  try {
    const maintenance = urbanEngine.getMaintenancePriorities();
    return NextResponse.json({
      success: true,
      count: maintenance.length,
      data: maintenance,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
