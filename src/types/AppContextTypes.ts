import { Region, ClimateData, LandData, SimulationParams, SimulationResult } from ".";

export type ShapeType = 'circle' | 'polygon';

export interface SelectedShape {
  type: ShapeType;
  center?: { lat: number; lng: number };   // for circle
  radius?: number;                         // for circle
  coordinates?: [number, number][];        // for polygon
}

export interface AppContextType {
  selectedRegion: Region | null;
  setSelectedRegion: (region: Region | null) => void;
  climateData: ClimateData | null;
  landData: LandData | null;
  simulationParams: SimulationParams | null;
  simulationResults: SimulationResult[] | null;
  setSimulationResults: (results: SimulationResult[]) => void;
  runSimulation: () => void;
  isLoading: boolean;
  activeView: 'map' | 'climate' | 'land' | 'simulation' | 'results';
  setActiveView: (view: 'map' | 'climate' | 'land' | 'simulation' | 'results') => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  selectedShape: SelectedShape | null;
  setSelectedShape: (shape: SelectedShape | null) => void;
}
