import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LineChart, BarChart, Leaf, Thermometer, Droplets, ChevronsUpDown } from 'lucide-react';

const SimulationResultsView: React.FC = () => {
  const { simulationResults, simulationParams, selectedRegion, setActiveView } = useAppContext();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  if (!simulationResults || !simulationParams || !selectedRegion) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No simulation results available</p>
      </div>
    );
  }

  const currentResult = selectedYear 
    ? simulationResults.find(r => r.year === selectedYear) 
    : simulationResults[simulationResults.length - 1];

  const initialResult = simulationResults[0];
  
  if (!currentResult) return null;
  
  // Calculate change percentages
  const forestCoverageChange = ((currentResult.forestCoverage - initialResult.forestCoverage) / initialResult.forestCoverage) * 100;
  const temperatureChange = currentResult.temperature.average - initialResult.temperature.average;
  const rainfallChange = ((currentResult.rainfall.annual - initialResult.rainfall.annual) / initialResult.rainfall.annual) * 100;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Simulation Results</h2>
        <p className="text-gray-600">
          Projection for {selectedRegion.name || 'Selected Region'} using {simulationParams.method}
        </p>
      </div>

      {/* Timeline Slider */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
        
        <div className="mb-4">
          <input 
            type="range" 
            min={simulationResults[0].year} 
            max={simulationResults[simulationResults.length - 1].year}
            step="5"
            value={selectedYear || simulationResults[simulationResults.length - 1].year}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-gray-200 via-green-300 to-green-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            {simulationResults.map((result) => (
              <span key={result.year} className="relative">
                <span className="absolute -translate-x-1/2">{result.year}</span>
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <span className="text-3xl font-bold text-green-700">{currentResult.year}</span>
          <p className="text-gray-600">Projected Year</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Forest Coverage */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm border border-green-100">
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-green-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Forest Coverage</h3>
          </div>
          
          <div className="text-3xl font-bold text-green-700 mb-2">{Math.round(currentResult.forestCoverage)}%</div>
          
          <div className="flex items-center">
            <ChevronsUpDown className={`h-5 w-5 mr-1 ${forestCoverageChange >= 0 ? 'text-green-500 rotate-180' : 'text-red-500'}`} />
            <span className={`text-sm font-medium ${forestCoverageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {forestCoverageChange > 0 ? '+' : ''}{Math.round(forestCoverageChange)}% from start
            </span>
          </div>
          
          <div className="mt-3 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${currentResult.forestCoverage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Temperature */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 shadow-sm border border-orange-100">
          <div className="flex items-center mb-4">
            <Thermometer className="h-6 w-6 text-orange-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Temperature</h3>
          </div>
          
          <div className="text-3xl font-bold text-orange-700 mb-2">{currentResult.temperature.average.toFixed(1)}°C</div>
          
          <div className="flex items-center">
            <ChevronsUpDown className={`h-5 w-5 mr-1 ${temperatureChange <= 0 ? 'text-green-500 rotate-180' : 'text-red-500'}`} />
            <span className={`text-sm font-medium ${temperatureChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {temperatureChange > 0 ? '+' : ''}{temperatureChange.toFixed(1)}°C from start
            </span>
          </div>
          
          <div className="mt-3 relative pt-5">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="w-1/3 bg-blue-500"></div>
              <div className="w-1/3 bg-green-500"></div>
              <div className="w-1/3 bg-red-500"></div>
            </div>
            <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-gray-500">
              <span>Cooler</span>
              <span>Optimal</span>
              <span>Warmer</span>
            </div>
            <div className="relative mt-1">
              <div 
                className="absolute w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2"
                style={{ left: `${((currentResult.temperature.average - 15) / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Rainfall */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 shadow-sm border border-blue-100">
          <div className="flex items-center mb-4">
            <Droplets className="h-6 w-6 text-blue-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Annual Rainfall</h3>
          </div>
          
          <div className="text-3xl font-bold text-blue-700 mb-2">{Math.round(currentResult.rainfall.annual)} mm</div>
          
          <div className="flex items-center">
            <ChevronsUpDown className={`h-5 w-5 mr-1 ${rainfallChange >= 0 ? 'text-green-500 rotate-180' : 'text-red-500'}`} />
            <span className={`text-sm font-medium ${rainfallChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {rainfallChange > 0 ? '+' : ''}{Math.round(rainfallChange)}% from start
            </span>
          </div>
          
          <div className="mt-3 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentResult.rainfall.annual / 2000) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 mm</span>
            <span>1000 mm</span>
            <span>2000 mm</span>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Forest Coverage Over Time */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <LineChart className="h-6 w-6 text-gray-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Forest Coverage Over Time</h3>
          </div>
          
          <div className="h-48 mt-4 relative">
            <div className="absolute inset-0">
              <div className="h-full flex items-end">
                {simulationResults.map((result, index) => (
                  <div key={result.year} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-4/5 bg-green-500 rounded-t ${
                        result.year === (selectedYear || simulationResults[simulationResults.length - 1].year) 
                          ? 'bg-green-600' 
                          : ''
                      }`}
                      style={{ height: `${(result.forestCoverage / 100) * 100}%` }}
                    ></div>
                    <div className={`text-xs mt-1 ${
                      result.year === (selectedYear || simulationResults[simulationResults.length - 1].year) 
                        ? 'font-bold text-green-700' 
                        : 'text-gray-500'
                    }`}>
                      {result.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Biodiversity Index */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 shadow-sm border border-purple-100">
          <div className="flex items-center mb-4">
            <BarChart className="h-6 w-6 text-purple-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Biodiversity & Water Quality</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Biodiversity Index</span>
                <span className="text-sm font-medium">
                  {currentResult.biodiversity.index.toFixed(2)} / 1.0
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${currentResult.biodiversity.index * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Water Quality</span>
                <span className="text-sm font-medium">
                  {Math.round(currentResult.waterQuality)}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${currentResult.waterQuality}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Carbon Sequestration</span>
                <span className="text-sm font-medium">
                  {Math.round(currentResult.carbonSequestration).toLocaleString()} tons
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(currentResult.carbonSequestration / 25000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 shadow-sm border border-amber-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
        
        <ul className="space-y-2">
          <li className="flex">
            <span className="mr-2">•</span>
            <span>By {currentResult.year}, the forest coverage is projected to {forestCoverageChange >= 0 ? 'increase' : 'decrease'} by {Math.abs(Math.round(forestCoverageChange))}%, reaching {Math.round(currentResult.forestCoverage)}% of the total area.</span>
          </li>
          <li className="flex">
            <span className="mr-2">•</span>
            <span>Average temperature is expected to {temperatureChange <= 0 ? 'decrease' : 'increase'} by {Math.abs(temperatureChange).toFixed(1)}°C due to increased vegetation.</span>
          </li>
          <li className="flex">
            <span className="mr-2">•</span>
            <span>Annual rainfall patterns show a {rainfallChange >= 0 ? 'positive' : 'negative'} trend with {Math.abs(Math.round(rainfallChange))}% change from baseline.</span>
          </li>
          <li className="flex">
            <span className="mr-2">•</span>
            <span>The selected {simulationParams.method} approach with {simulationParams.flora.trees.length} tree species will sequester approximately {Math.round(currentResult.carbonSequestration).toLocaleString()} tons of carbon.</span>
          </li>
          <li className="flex">
            <span className="mr-2">•</span>
            <span>Biodiversity index improves from {initialResult.biodiversity.index.toFixed(2)} to {currentResult.biodiversity.index.toFixed(2)}, indicating a healthier ecosystem.</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setActiveView('simulation')}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          ← Back to Simulation Setup
        </button>
        <button
          onClick={() => setActiveView('map')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Select New Region
        </button>
      </div>
    </div>
  );
};

export default SimulationResultsView;