export type CameraStatus = 'ACTIVE' | 'DEGRADED' | 'OFFLINE';
export type EdgeDeviceStatus = 'ACTIVE' | 'OPTIMIZING' | 'STANDBY' | 'ERROR';
export type DefectSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DefectStatus = 'DETECTED' | 'VERIFIED' | 'CONVERTED_TO_GRIEVANCE' | 'SCHEDULED' | 'REPAIRED';
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentStatus = 'FLAGGED' | 'INVESTIGATING' | 'DISPATCHED_POLICE' | 'RESOLVED' | 'DISMISSED';
export type CongestionLevel = 'FREE_FLOW' | 'MODERATE' | 'HEAVY' | 'SEVERE_BOTTLENECK';

export type DefectType = 
  | 'POTHOLE'
  | 'CRACK'
  | 'DAMAGED_ROAD'
  | 'MISSING_DIVIDER'
  | 'MISSING_ZEBRA_CROSSING'
  | 'DAMAGED_TRAFFIC_SIGN'
  | 'MISSING_SIGN'
  | 'WATERLOGGING'
  | 'ROAD_OBSTACLE';

export type IncidentType =
  | 'HIT_AND_RUN'
  | 'RASH_DRIVING'
  | 'COLLISION_NEAR_MISS'
  | 'DANGEROUS_OVERTAKE'
  | 'PEDESTRIAN_CONFLICT'
  | 'SCHOOL_ZONE_ALERT'
  | 'ROAD_OBSTRUCTION';

export interface BusCameraState {
  front: CameraStatus;
  rear: CameraStatus;
  leftSide: CameraStatus;
  rightSide: CameraStatus;
  cabin: CameraStatus;
}

export interface BusFleetItem {
  id: string;
  busNumber: string; // e.g., 'TN-01-N-9421'
  routeCode: string; // e.g., '21G'
  routeName: string; // e.g., 'Broadway <-> Tambaram'
  depot: string; // e.g., 'Central Depot / T Nagar'
  driverName: string;
  lat: number;
  lng: number;
  speedKmH: number;
  headingDeg: number;
  status: 'ONLINE' | 'OFFLINE' | 'IDLE';
  cameras: BusCameraState;
  edgeAI: {
    status: EdgeDeviceStatus;
    model: string;
    fps: number;
    gpuTempC: number;
    npuUsagePct: number;
    bandwidthSavedPct: number;
    eventsProcessedToday: number;
  };
  lastEvent?: {
    type: string;
    time: string;
    confidence: number;
  };
  connectivity: '5G_HIGH' | '4G_STABLE' | 'DEGRADED';
  lastUpdated: string;
}

export interface RoadDefectItem {
  id: string;
  defectType: DefectType;
  title: string;
  confidence: number; // 0 - 100
  severity: DefectSeverity;
  status: DefectStatus;
  lat: number;
  lng: number;
  locality: string;
  district: string;
  state: string;
  busId: string;
  busRoute: string;
  cameraPosition: 'FRONT' | 'REAR' | 'LEFT' | 'RIGHT';
  timestamp: string;
  repeatedDetections: number; // e.g. detected by 4 buses
  busesInvolved: string[];
  evidenceImageUrl: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
  convertedGrievanceRef?: string;
  ministryJurisdiction: string;
}

export interface TrafficIntelligenceData {
  corridorId: string;
  corridorName: string;
  lat: number;
  lng: number;
  vehiclesCount: {
    cars: number;
    bikes: number;
    buses: number;
    trucks: number;
    autos: number;
    pedestrians: number;
  };
  totalCount: number;
  densityIndex: number; // 0 - 100
  avgSpeedKmH: number;
  congestionLevel: CongestionLevel;
  flowRateVehiclesPerMin: number;
  bottleneckAlert?: string;
  timestamp: string;
}

export interface OriginDestinationFlow {
  id: string;
  origin: string;
  destination: string;
  peakPeriod: string;
  volumePerHour: number;
  avgTravelTimeMin: number;
  expectedTimeMin: number;
  delayMin: number;
  congestionIndex: number;
}

export interface IncidentRecord {
  id: string;
  type: IncidentType;
  title: string;
  timestamp: string;
  lat: number;
  lng: number;
  locality: string;
  district: string;
  busId: string;
  busRoute: string;
  cameraPosition: 'FRONT' | 'REAR' | 'LEFT' | 'RIGHT' | 'CABIN';
  vehicleType?: string;
  vehicleMakeModel?: string;
  vehicleColor?: string;
  licensePlate?: string;
  ocrConfidence?: number;
  trackingId?: string;
  speedRecordedKmH?: number;
  confidence: number;
  severity: IncidentSeverity;
  status: IncidentStatus;
  evidenceClipPlaceholder: string;
  vehicleCropUrl?: string;
  plateCropUrl?: string;
  description: string;
}

export interface ANPRItem {
  id: string;
  licensePlate: string;
  vehicleType: string;
  makeModel: string;
  color: string;
  ocrConfidence: number;
  timestamp: string;
  lat: number;
  lng: number;
  locality: string;
  busId: string;
  speedKmH: number;
  violationFlag?: string;
}

export interface RoutePerformanceItem {
  routeCode: string;
  routeName: string;
  totalBuses: number;
  origin: string;
  destination: string;
  lengthKm: number;
  expectedDurationMin: number;
  currentAvgDurationMin: number;
  delayMin: number;
  avgSpeedKmH: number;
  congestionStatus: 'NORMAL' | 'MODERATE_DELAY' | 'HEAVY_CONGESTION';
  frequentBottlenecks: string[];
  reliabilityScore: number;
}

export interface EdgeAIModelItem {
  id: string;
  name: string;
  category: string;
  framework: string;
  status: 'ONLINE' | 'OPTIMIZING' | 'STANDBY';
  confidenceThresholdPct: number;
  fps: number;
  detectionsToday: number;
  lastInferenceTime: string;
  memoryMb: number;
  description: string;
}

export interface MaintenancePriorityItem {
  id: string;
  defectId: string;
  title: string;
  defectType: DefectType;
  locality: string;
  district: string;
  lat: number;
  lng: number;
  severity: DefectSeverity;
  detectionFrequency: number;
  busesReporting: string[];
  firstDetectedAt: string;
  lastDetectedAt: string;
  affectedBusRoutes: string[];
  nearbyBusVolumeDaily: number;
  suggestedPriorityScore: number; // 1 - 100
  recommendedAction: string;
  status: 'ACTION_REQUIRED' | 'GRIEVANCE_FILED' | 'WORK_ORDER_ISSUED' | 'REPAIRED';
  associatedGrievanceRef?: string;
}
