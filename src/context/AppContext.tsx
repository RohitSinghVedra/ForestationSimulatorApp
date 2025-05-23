import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppContextType, SelectedShape } from '../types/AppContextTypes';
import { Region, ClimateData, LandData, SimulationParams, SimulationResult } from '../types';
import {
  fetchClimateData,
  fetchBiodiversityData,
  fetchSoilData,
  analyzeLandCover,
  simulateForestationImpact
} from '../services/api';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedShape, setSelectedShape] = useState<SelectedShape | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [climateData, setClimateData] = useState<ClimateData | null>(null);
  const [landData, setLandData] = useState<LandData | null>(null);
  const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'map' | 'climate' | 'land' | 'simulation' | 'results'>('map');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const fetchData = async (region: Region) => {
    setIsLoading(true);
    try {
      const [climate, biodiversity, soil, landCover] = await Promise.all([
        fetchClimateData(region.coordinates),
        fetchBiodiversityData(region.coordinates),
        fetchSoilData(region.coordinates),
        analyzeLandCover(region.coordinates)
      ]);

      setClimateData(climate);

      const clayValue = soil.properties?.clay?.values?.[0] ?? 0;
      const sandValue = soil.properties?.sand?.values?.[0] ?? 0;
      const nitrogenValue = soil.properties?.nitrogen?.values?.[0] ?? 0;
      const phValue = soil.properties?.phh2o?.values?.[0] ?? 7;
      const cecValue = soil.properties?.cec?.values?.[0] ?? 0;

      const processedLandData: LandData = {
        composition: landCover,
        soil: {
          type: clayValue > sandValue ? 'Clay' : 'Sandy',
          ph: phValue,
          fertility: nitrogenValue > 50 ? 'High' :
                     nitrogenValue > 25 ? 'Medium' : 'Low',
          nutrients: {
            nitrogen: nitrogenValue > 50 ? 'High' :
                      nitrogenValue > 25 ? 'Medium' : 'Low',
            phosphorus: 'Medium',
            potassium: cecValue > 20 ? 'High' :
                       cecValue > 10 ? 'Medium' : 'Low'
          }
        },
        waterAccess: {
          groundwater: {
            depth: Math.round(Math.random() * 100 + 20),
            quality: 'Good'
          },
          surfaceWater: {
            distance: Math.round(Math.random() * 10),
            type: 'River',
            seasonality: 'Perennial'
          },
          precipitation: climate.rainfall.annual > 2000 ? 'Very High' :
                         climate.rainfall.annual > 1500 ? 'High' :
                         climate.rainfall.annual > 1000 ? 'Moderate' :
                         climate.rainfall.annual > 500 ? 'Low' : 'Very Low'
        }
      };

      setLandData(processedLandData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRegion) {
      fetchData(selectedRegion);
      setActiveView('climate');
    }
  }, [selectedRegion]);

  const runSimulation = () => {
    if (!simulationParams || !selectedRegion || !climateData || !landData) return;

    setIsLoading(true);

    const results = simulateForestationImpact({
      ...simulationParams,
      initialCoverage: landData.composition.forest,
      initialTemp: climateData.temperature.average,
      initialRainfall: climateData.rainfall.annual
    });

    setSimulationResults(results);
    setIsLoading(false);
    setActiveView('results');
  };

  return (
    <AppContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        climateData,
        landData,
        simulationParams,
        simulationResults,
        setSimulationResults,
        runSimulation,
        isLoading,
        activeView,
        setActiveView,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        selectedShape,
        setSelectedShape
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
