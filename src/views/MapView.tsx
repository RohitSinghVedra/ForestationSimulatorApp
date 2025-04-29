import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Map from '../components/Map';
import ClimateDataView from './ClimateDataView';
import LandDataView from './LandDataView';
import SimulationSetupView from './SimulationSetupView';
import SimulationResultsView from './SimulationResultsView';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const MapView: React.FC = () => {
  const { activeView, isLoading } = useAppContext();
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const renderPanel = () => {
    switch (activeView) {
      case 'climate':
        return <ClimateDataView />;
      case 'land':
        return <LandDataView />;
      case 'simulation':
        return <SimulationSetupView />;
      case 'results':
        return <SimulationResultsView />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading data and analyzing the selected region...</p>
          </div>
        </div>
      )}

      {/* Map component */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        activeView !== 'map' && !isPanelCollapsed ? 'lg:mr-[50%]' : 'w-full'
      }`}>
        <Map />
      </div>

      {/* Data panel */}
      {activeView !== 'map' && (
        <div className={`absolute top-0 bottom-0 bg-white shadow-lg transition-all duration-500 ${
          isPanelCollapsed 
            ? 'w-12 right-0' 
            : 'w-full lg:w-1/2 right-0'
        }`}>
          {/* Collapse toggle button */}
          <button
            onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
            className="absolute left-0 top-1/2 -translate-x-full transform bg-white p-2 rounded-l-md shadow-md z-10"
          >
            {isPanelCollapsed ? <ChevronLeft /> : <ChevronRight />}
          </button>

          <div className={`h-full overflow-y-auto ${isPanelCollapsed ? 'hidden' : 'block'}`}>
            {renderPanel()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;