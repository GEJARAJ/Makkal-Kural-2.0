import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';

export async function GET(req: NextRequest) {
  try {
    const models = urbanEngine.getEdgeModels();
    const fleet = urbanEngine.getFleet();
    const totalProcessed = fleet.reduce((sum, b) => sum + b.edgeAI.eventsProcessedToday, 0);
    const avgFps = (fleet.reduce((sum, b) => sum + b.edgeAI.fps, 0) / fleet.length).toFixed(1);

    return NextResponse.json({
      success: true,
      summary: {
        activeEdgeNodes: fleet.filter((b) => b.edgeAI.status === 'ACTIVE').length,
        totalFleetBuses: fleet.length,
        totalEventsAnalyzedToday: totalProcessed,
        avgEdgeFPS: avgFps,
        avgBandwidthSavedPct: 98.6,
      },
      models,
      pipelineArchitecture: {
        videoIngestFps: 30,
        localInferenceWindowMs: 33,
        evidenceClipDurationSec: '5-10s compressed',
        cloudSyncPolicy: 'Event-driven only (Zero continuous video streaming)',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
