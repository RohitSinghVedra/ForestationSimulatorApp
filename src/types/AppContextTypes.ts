import { Region, ClimateData, LandData, SimulationParams, SimulationResult } from ".";

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
  selectedShape: {
    center: { lat: number; lng: number };
    radius: number;
  } | null;
  setSelectedShape: (shape: { center: { lat: number; lng: number }; radius: number } | null) => void;
}
