import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';

export async function GET(req: NextRequest) {
  try {
    const trafficData = urbanEngine.getTrafficData();
    const odFlows = urbanEngine.getODFlows();

    const totalVehicles = trafficData.reduce((sum, t) => sum + t.totalCount, 0);
    const avgCitySpeed = Math.round(trafficData.reduce((sum, t) => sum + t.avgSpeedKmH, 0) / trafficData.length);
    const totalPedestrians = trafficData.reduce((sum, t) => sum + t.vehiclesCount.pedestrians, 0);

    return NextResponse.json({
      success: true,
      summary: {
        totalVehiclesMonitored: totalVehicles,
        avgCitySpeedKmH: avgCitySpeed,
        pedestriansDetected: totalPedestrians,
        congestedCorridorsCount: trafficData.filter((t) => t.congestionLevel === 'HEAVY' || t.congestionLevel === 'SEVERE_BOTTLENECK').length,
      },
      trafficCorridors: trafficData,
      originDestinationFlows: odFlows,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
