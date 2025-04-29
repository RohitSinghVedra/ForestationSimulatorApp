import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Trees, Droplet, Mountain } from 'lucide-react';

const LandDataView: React.FC = () => {
  const { landData, selectedRegion, setActiveView } = useAppContext();

  if (!landData || !selectedRegion) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No land data available</p>
      </div>
    );
  }

  // Helper function to get color based on land type
  const getLandTypeColor = (type: string) => {
    const colors = {
      forest: 'bg-green-500',
      grassland: 'bg-lime-500',
      desert: 'bg-yellow-500',
      water: 'bg-blue-500',
      urban: 'bg-gray-500',
      agricultural: 'bg-amber-500',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-300';
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Land Analysis</h2>
        <p className="text-gray-600">Analysis for {selectedRegion.name || 'Selected Region'}</p>
      </div>

      {/* Land Composition */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center mb-4">
          <Trees className="h-6 w-6 text-green-600" />
          <h3 className="ml-2 text-lg font-semibold text-gray-800">Land Composition</h3>
        </div>

        <div className="mb-4">
          <div className="h-8 flex rounded-full overflow-hidden">
            {Object.entries(landData.composition).map(([type, percentage]) => (
              <div 
                key={type}
                className={`${getLandTypeColor(type)}`}
                style={{ width: `${percentage}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(landData.composition).map(([type, percentage]) => (
            <div key={type} className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${getLandTypeColor(type)}`}></div>
              <div>
                <div className="text-sm font-medium capitalize">{type}</div>
                <div className="text-lg font-semibold">{percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soil Information */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 shadow-sm border border-amber-100 mb-6">
        <div className="flex items-center mb-4">
          <Mountain className="h-6 w-6 text-amber-600" />
          <h3 className="ml-2 text-lg font-semibold text-gray-800">Soil Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <span className="text-gray-600">Soil Type</span>
              <div className="text-xl font-semibold">{landData.soil.type}</div>
            </div>
            
            <div className="mb-4">
              <span className="text-gray-600">pH Level</span>
              <div className="text-xl font-semibold">{landData.soil.ph}</div>
              <div className="relative h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
                  style={{ width: `${(landData.soil.ph / 14) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Acidic (0)</span>
                <span>Neutral (7)</span>
                <span>Alkaline (14)</span>
              </div>
            </div>

            <div>
              <span className="text-gray-600">Fertility</span>
              <div className="text-xl font-semibold">{landData.soil.fertility}</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Nutrient Levels</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Nitrogen (N)</span>
                  <span className="text-sm font-medium">{landData.soil.nutrients.nitrogen}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ 
                      width: landData.soil.nutrients.nitrogen === 'Low' ? '33%' :
                             landData.soil.nutrients.nitrogen === 'Medium' ? '66%' : '100%'
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Phosphorus (P)</span>
                  <span className="text-sm font-medium">{landData.soil.nutrients.phosphorus}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500"
                    style={{ 
                      width: landData.soil.nutrients.phosphorus === 'Low' ? '33%' :
                             landData.soil.nutrients.phosphorus === 'Medium' ? '66%' : '100%'
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Potassium (K)</span>
                  <span className="text-sm font-medium">{landData.soil.nutrients.potassium}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500"
                    style={{ 
                      width: landData.soil.nutrients.potassium === 'Low' ? '33%' :
                             landData.soil.nutrients.potassium === 'Medium' ? '66%' : '100%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Water Access */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 shadow-sm border border-blue-100 mb-6">
        <div className="flex items-center mb-4">
          <Droplet className="h-6 w-6 text-blue-600" />
          <h3 className="ml-2 text-lg font-semibold text-gray-800">Water Access</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Groundwater</h4>
            <div className="mb-2">
              <span className="text-gray-600 text-sm">Depth</span>
              <div className="text-xl font-semibold">{landData.waterAccess.groundwater.depth} meters</div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Quality</span>
              <div className="text-xl font-semibold">{landData.waterAccess.groundwater.quality}</div>
            </div>
          </div>

          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Surface Water</h4>
            <div className="mb-2">
              <span className="text-gray-600 text-sm">Type</span>
              <div className="text-xl font-semibold">{landData.waterAccess.surfaceWater.type}</div>
            </div>
            <div className="mb-2">
              <span className="text-gray-600 text-sm">Distance</span>
              <div className="text-xl font-semibold">{landData.waterAccess.surfaceWater.distance} km</div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Seasonality</span>
              <div className="text-xl font-semibold">{landData.waterAccess.surfaceWater.seasonality}</div>
            </div>
          </div>

          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Precipitation</h4>
            <div className="text-xl font-semibold mb-2">{landData.waterAccess.precipitation}</div>
            
            <div className="mt-4">
              <div className="w-full h-24 flex items-end">
                {['Very Low', 'Low', 'Moderate', 'High', 'Very High'].map((level, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-4/5 bg-blue-500 rounded-t ${
                        landData.waterAccess.precipitation === level ? 'bg-blue-600' : 'bg-blue-200'
                      }`}
                      style={{ height: `${20 * (i + 1)}%` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-1 text-center">
                      {level.split(' ').map(word => word.charAt(0)).join('')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setActiveView('climate')}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          ← Back to Climate Data
        </button>
        <button
          onClick={() => setActiveView('simulation')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Setup Simulation →
        </button>
      </div>
    </div>
  );
};

export default LandDataView;