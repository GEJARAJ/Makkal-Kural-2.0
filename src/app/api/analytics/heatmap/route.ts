import { NextRequest, NextResponse } from 'next/server';
import { getHeatmapComplaints } from '@/lib/supabase/database';

export async function GET(req: NextRequest) {
  try {
    const complaints = await getHeatmapComplaints();
    return NextResponse.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error: any) {
    console.error('Error in /api/analytics/heatmap:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
