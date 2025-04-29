import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Thermometer, Droplets, Wind, Sun, Wind as AirIcon } from 'lucide-react';

const ClimateDataView: React.FC = () => {
  const { climateData, selectedRegion, setActiveView } = useAppContext();

  if (!climateData || !selectedRegion) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No climate data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Climate Data</h2>
        <p className="text-gray-600">Analysis for {selectedRegion.name || 'Selected Region'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Card */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 shadow-sm border border-orange-100">
          <div className="flex items-center mb-4">
            <Thermometer className="h-6 w-6 text-orange-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Temperature</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current</span>
              <span className="font-medium text-gray-800">{climateData.temperature.current}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average</span>
              <span className="font-medium text-gray-800">{climateData.temperature.average}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Range</span>
              <span className="font-medium text-gray-800">{climateData.temperature.min}°C - {climateData.temperature.max}°C</span>
            </div>

            {/* Temperature Trend */}
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">Recent Trend</div>
              <div className="flex items-end h-16 space-x-1">
                {climateData.temperature.history.map((temp, i) => (
                  <div 
                    key={i}
                    className="bg-orange-500 rounded-t w-full"
                    style={{ 
                      height: `${(temp / climateData.temperature.max) * 100}%`,
                      opacity: 0.5 + (i * 0.1)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rainfall Card */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 shadow-sm border border-blue-100">
          <div className="flex items-center mb-4">
            <Droplets className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Rainfall</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Annual</span>
              <span className="font-medium text-gray-800">{climateData.rainfall.annual} mm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Average</span>
              <span className="font-medium text-gray-800">
                {Math.round(climateData.rainfall.annual / 12)} mm
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trend</span>
              <span className="font-medium text-gray-800 capitalize">{climateData.rainfall.trend}</span>
            </div>

            {/* Rainfall Distribution */}
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">Monthly Distribution</div>
              <div className="flex items-end h-16 space-x-1">
                {climateData.rainfall.monthly.map((rain, i) => (
                  <div 
                    key={i}
                    className="bg-blue-500 rounded-t w-full"
                    style={{ 
                      height: `${(rain / Math.max(...climateData.rainfall.monthly)) * 100}%`
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-5 shadow-sm border border-teal-100">
          <div className="flex items-center mb-4">
            <Wind className="h-6 w-6 text-teal-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Humidity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average</span>
              <span className="font-medium text-gray-800">{climateData.humidity.average}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Morning</span>
              <span className="font-medium text-gray-800">{climateData.humidity.morning}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Afternoon</span>
              <span className="font-medium text-gray-800">{climateData.humidity.afternoon}%</span>
            </div>
            
            {/* Humidity Gauge */}
            <div className="mt-4">
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-teal-500 rounded-full"
                  style={{ width: `${climateData.humidity.average}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* UV Index Card */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 shadow-sm border border-purple-100">
          <div className="flex items-center mb-4">
            <Sun className="h-6 w-6 text-purple-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">UV Index</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average</span>
              <span className="font-medium text-gray-800">{climateData.uvIndex.average}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Peak</span>
              <span className="font-medium text-gray-800">{climateData.uvIndex.peak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Risk Level</span>
              <span className="font-medium text-gray-800">
                {climateData.uvIndex.average < 3 ? 'Low' : 
                 climateData.uvIndex.average < 6 ? 'Moderate' : 
                 climateData.uvIndex.average < 8 ? 'High' : 'Very High'}
              </span>
            </div>
            
            {/* UV Index Visualization */}
            <div className="mt-4">
              <div className="flex h-4 rounded-full overflow-hidden">
                <div className="w-1/4 bg-green-500"></div>
                <div className="w-1/4 bg-yellow-500"></div>
                <div className="w-1/4 bg-orange-500"></div>
                <div className="w-1/4 bg-red-500"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
                <span>Extreme</span>
              </div>
              <div className="relative mt-2">
                <div 
                  className="absolute w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2"
                  style={{ left: `${(climateData.uvIndex.average / 12) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <AirIcon className="h-6 w-6 text-gray-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Air Quality</h3>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <div className="text-4xl font-bold text-center mb-2">
                {climateData.airQuality.aqi}
              </div>
              <div className="text-center text-sm text-gray-600">
                AQI
              </div>
              <div className="text-center mt-1 text-sm font-medium">
                {climateData.airQuality.aqi < 50 ? 'Good' : 
                 climateData.airQuality.aqi < 100 ? 'Moderate' : 
                 climateData.airQuality.aqi < 150 ? 'Unhealthy for Sensitive Groups' : 'Unhealthy'}
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">PM2.5</p>
                <p className="font-semibold">{climateData.airQuality.pollutants.pm25} µg/m³</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PM10</p>
                <p className="font-semibold">{climateData.airQuality.pollutants.pm10} µg/m³</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ozone (O₃)</p>
                <p className="font-semibold">{climateData.airQuality.pollutants.o3} ppb</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nitrogen Dioxide (NO₂)</p>
                <p className="font-semibold">{climateData.airQuality.pollutants.no2} ppb</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setActiveView('land')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          View Land Analysis →
        </button>
      </div>
    </div>
  );
};

export default ClimateDataView;