import {
  INITIAL_BUS_FLEET,
  INITIAL_ROAD_DEFECTS,
  INITIAL_TRAFFIC_DATA,
  INITIAL_OD_FLOWS,
  INITIAL_INCIDENTS,
  INITIAL_ANPR_RECORDS,
  INITIAL_ROUTE_PERFORMANCE,
  INITIAL_EDGE_MODELS,
  INITIAL_MAINTENANCE_ITEMS,
} from './mock-data';
import {
  BusFleetItem,
  RoadDefectItem,
  TrafficIntelligenceData,
  OriginDestinationFlow,
  IncidentRecord,
  ANPRItem,
  RoutePerformanceItem,
  EdgeAIModelItem,
  MaintenancePriorityItem,
  DefectType,
  DefectSeverity,
} from '@/types/urban-intelligence';

class UrbanIntelligenceEngine {
  private buses: BusFleetItem[] = [...INITIAL_BUS_FLEET];
  private defects: RoadDefectItem[] = [...INITIAL_ROAD_DEFECTS];
  private traffic: TrafficIntelligenceData[] = [...INITIAL_TRAFFIC_DATA];
  private odFlows: OriginDestinationFlow[] = [...INITIAL_OD_FLOWS];
  private incidents: IncidentRecord[] = [...INITIAL_INCIDENTS];
  private anprRecords: ANPRItem[] = [...INITIAL_ANPR_RECORDS];
  private routes: RoutePerformanceItem[] = [...INITIAL_ROUTE_PERFORMANCE];
  private models: EdgeAIModelItem[] = [...INITIAL_EDGE_MODELS];
  private maintenance: MaintenancePriorityItem[] = [...INITIAL_MAINTENANCE_ITEMS];

  constructor() {
    // Start background simulation timer on server/client if needed
  }

  // 1. FLEET TELEMETRY
  getFleet(): BusFleetItem[] {
    // Add micro-coordinate drift so fleet feels active and alive
    return this.buses.map((bus) => {
      if (bus.status !== 'ONLINE') return bus;
      const driftLat = (Math.random() - 0.5) * 0.0004;
      const driftLng = (Math.random() - 0.5) * 0.0004;
      const speedFluctuation = Math.floor((Math.random() - 0.5) * 4);
      return {
        ...bus,
        lat: Number((bus.lat + driftLat).toFixed(5)),
        lng: Number((bus.lng + driftLng).toFixed(5)),
        speedKmH: Math.max(12, Math.min(55, bus.speedKmH + speedFluctuation)),
        lastUpdated: new Date().toISOString(),
      };
    });
  }

  getBusById(busId: string): BusFleetItem | undefined {
    return this.getFleet().find((b) => b.id.toLowerCase() === busId.toLowerCase() || b.busNumber.toLowerCase().includes(busId.toLowerCase()));
  }

  // 2. ROAD DEFECTS
  getDefects(): RoadDefectItem[] {
    return this.defects;
  }

  getDefectById(defectId: string): RoadDefectItem | undefined {
    return this.defects.find((d) => d.id === defectId);
  }

  addDefect(defect: RoadDefectItem): void {
    this.defects.unshift(defect);
  }

  updateDefectStatus(defectId: string, status: RoadDefectItem['status'], grievanceRef?: string): boolean {
    const d = this.defects.find((x) => x.id === defectId);
    if (d) {
      d.status = status;
      if (grievanceRef) d.convertedGrievanceRef = grievanceRef;
      return true;
    }
    return false;
  }

  // 3. TRAFFIC & OD
  getTrafficData(): TrafficIntelligenceData[] {
    return this.traffic;
  }

  getODFlows(): OriginDestinationFlow[] {
    return this.odFlows;
  }

  // 4. INCIDENTS & ANPR
  getIncidents(): IncidentRecord[] {
    return this.incidents;
  }

  getANPRRecords(): ANPRItem[] {
    return this.anprRecords;
  }

  addIncident(incident: IncidentRecord): void {
    this.incidents.unshift(incident);
  }

  // 5. ROUTES
  getRoutes(): RoutePerformanceItem[] {
    return this.routes;
  }

  // 6. MODELS
  getEdgeModels(): EdgeAIModelItem[] {
    return this.models;
  }

  // 7. MAINTENANCE PRIORITIES
  getMaintenancePriorities(): MaintenancePriorityItem[] {
    return this.maintenance;
  }

  // 8. OVERALL SYSTEM STATS
  getCommandCenterSummary() {
    const fleet = this.getFleet();
    const onlineBuses = fleet.filter((b) => b.status === 'ONLINE').length;
    const totalCameras = fleet.length * 5;
    const activeCameras = fleet.reduce((acc, b) => {
      let c = 0;
      if (b.cameras.front === 'ACTIVE') c++;
      if (b.cameras.rear === 'ACTIVE') c++;
      if (b.cameras.leftSide === 'ACTIVE') c++;
      if (b.cameras.rightSide === 'ACTIVE') c++;
      if (b.cameras.cabin === 'ACTIVE') c++;
      return acc + c;
    }, 0);

    const totalDefects = this.defects.length;
    const potholesCount = this.defects.filter((d) => d.defectType === 'POTHOLE').length;
    const waterloggingCount = this.defects.filter((d) => d.defectType === 'WATERLOGGING').length;
    const totalIncidents = this.incidents.length;
    const anprDetectionsCount = this.anprRecords.length;
    const activeBottlenecksCount = this.traffic.filter((t) => t.congestionLevel === 'HEAVY' || t.congestionLevel === 'SEVERE_BOTTLENECK').length;

    const totalAIEventsToday = fleet.reduce((sum, b) => sum + b.edgeAI.eventsProcessedToday, 0) + 420;
    const avgBandwidthSavedPct = (fleet.reduce((sum, b) => sum + b.edgeAI.bandwidthSavedPct, 0) / fleet.length).toFixed(1);

    return {
      onlineBuses,
      totalBuses: fleet.length,
      activeCameras,
      totalCameras,
      totalAIEventsToday,
      totalDefects,
      potholesCount,
      waterloggingCount,
      totalIncidents,
      anprDetectionsCount,
      activeBottlenecksCount,
      avgBandwidthSavedPct,
      unresolvedMaintenanceIssues: this.maintenance.filter((m) => m.status === 'ACTION_REQUIRED').length,
    };
  }
}

// Global Singleton
const globalForUrban = globalThis as unknown as { urbanEngine?: UrbanIntelligenceEngine };
export const urbanEngine = globalForUrban.urbanEngine ?? new UrbanIntelligenceEngine();
if (process.env.NODE_ENV !== 'production') globalForUrban.urbanEngine = urbanEngine;
