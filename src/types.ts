export type DebrisCategory =
  | 'ghost_net'
  | 'plastic'
  | 'toxic_drum'
  | 'metal_debris'
  | 'marine_life';

export type ThreatLevel = 'low' | 'moderate' | 'critical';

export interface BoundingBox {
  label: string;
  category: DebrisCategory;
  confidence: number;
  threatLevel: ThreatLevel;
  x: number; // 0 to 1
  y: number; // 0 to 1
  width: number; // 0 to 1
  height: number; // 0 to 1
  color: string;
  estimatedWeightKg?: number;
}

export interface MarineMetrics {
  marinePollutionIndex: number; // 0 to 100
  debrisCount: number;
  ghostNetsDetected: number;
  plasticsCount: number;
  chemicalHazardsCount: number;
  protectedSpeciesCount: number;
  waterTurbidityPct: number; // 0 to 100%
  currentDepthMeters: number;
  waterTempCelsius: number;
}

export interface Scenario {
  id: string;
  title: string;
  location: string;
  coordinates: string;
  depthMeters: number;
  turbidityPct: number;
  tempCelsius: number;
  description: string;
  expectedThreat: ThreatLevel;
  sampleDetections: BoundingBox[];
  narrativeReport: string;
}

export interface ROVMission {
  missionId: string;
  timestamp: string;
  targetCoords: string;
  targetDepth: number;
  threatLevel: ThreatLevel;
  debrisSummary: string[];
  totalEstimatedWeightKg: number;
  recommendedAction: string;
  rovPayload: string;
  status: 'QUEUED' | 'DEPLOYED' | 'STANDBY';
}

export interface EventLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'alert' | 'info' | 'bio' | 'dispatch';
  threatLevel?: ThreatLevel;
}

export interface CumulativeStats {
  totalScans: number;
  totalDebrisCount: number;
  totalMassKg: number;
  protectedSpeciesCount: number;
  averageMpi: number;
}
