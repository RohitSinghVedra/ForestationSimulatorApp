// Region Types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Region {
  id: string;
  name?: string;
  type: 'polygon' | 'rectangle' | 'circle';
  coordinates: Coordinates[];
  area?: number; // in sq km
}

// Climate Data Types
export interface Temperature {
  current: number;
  min: number;
  max: number;
  average: number;
  history: number[];
}

export interface Rainfall {
  annual: number;
  monthly: number[];
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface Humidity {
  average: number;
  morning: number;
  afternoon: number;
}

export interface UVIndex {
  average: number;
  peak: number;
}

export interface AirQuality {
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
}

export interface ClimateData {
  temperature: Temperature;
  rainfall: Rainfall;
  humidity: Humidity;
  uvIndex: UVIndex;
  airQuality: AirQuality;
}

// Land Data Types
export interface LandComposition {
  forest: number; // percentage
  grassland: number;
  desert: number;
  water: number;
  urban: number;
  agricultural: number;
}

export interface SoilData {
  type: string;
  ph: number;
  fertility: 'Low' | 'Medium' | 'High';
  nutrients: {
    nitrogen: 'Low' | 'Medium' | 'High';
    phosphorus: 'Low' | 'Medium' | 'High';
    potassium: 'Low' | 'Medium' | 'High';
  };
}

export interface WaterAccess {
  groundwater: {
    depth: number; // meters
    quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  };
  surfaceWater: {
    distance: number; // kilometers
    type: 'River' | 'Lake' | 'Stream' | 'None';
    seasonality: 'Seasonal' | 'Perennial' | 'Intermittent';
  };
  precipitation: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
}

export interface LandData {
  composition: LandComposition;
  soil: SoilData;
  waterAccess: WaterAccess;
}

// Simulation Types
export interface FloraFauna {
  trees: string[];
  shrubs: string[];
  groundCover: string[];
  wildlife: string[];
}

export interface WaterManagement {
  strategy: 'Rainwater harvesting' | 'Drip irrigation' | 'Swales' | 'Retention ponds' | 'None';
  coverage: number; // percentage
}

export interface SimulationParams {
  method: 'Natural regeneration' | 'Assisted regeneration' | 'Agroforestry' | 'Monoculture plantation' | 'Mixed plantation';
  flora: FloraFauna;
  waterManagement: WaterManagement;
  timeline: number; // years
  intensity: number; // 1-10 scale
}

export interface SimulationResult {
  year: number;
  forestCoverage: number; // percentage
  temperature: {
    average: number;
  };
  rainfall: {
    annual: number;
  };
  biodiversity: {
    index: number; // 0-1 scale
  };
  carbonSequestration: number; // tons of CO2
  waterQuality: number; // 0-100 scale
}