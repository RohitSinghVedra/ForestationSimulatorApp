import React from 'react';
import { MapPin, Cloud, Trees, FlaskConical, LineChart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import RegionInfoCard from './RegionInfoCard';

const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectedRegion,
    climateData,
    landData,
    simulationResults,
    setIsMobileMenuOpen,
  } = useAppContext();

  const menuItems = [
    {
      id: 'map',
      label: 'Map Selection',
      icon: <MapPin />,
      available: true,
    },
    {
      id: 'climate',
      label: 'Climate Data',
      icon: <Cloud />,
      available: !!selectedRegion && !!climateData,
    },
    {
      id: 'land',
      label: 'Land Analysis',
      icon: <Trees />,
      available: !!selectedRegion && !!landData,
    },
    {
      id: 'simulation',
      label: 'Simulation Setup',
      icon: <FlaskConical />,
      available: !!selectedRegion && !!climateData && !!landData,
    },
    {
      id: 'results',
      label: 'Simulation Results',
      icon: <LineChart />,
      available: !!simulationResults,
    },
  ] as const;

  const handleNavigation = (view: typeof activeView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Top Area: Region Info */}
      <div className="p-4 border-b border-gray-200">
        <RegionInfoCard />
      </div>

      {/* Scrollable Menu */}
      <nav className="py-4 flex-1 overflow-y-auto">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => item.available && handleNavigation(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left ${
                  activeView === item.id
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${!item.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={!item.available}
              >
                <span className="inline-block mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
