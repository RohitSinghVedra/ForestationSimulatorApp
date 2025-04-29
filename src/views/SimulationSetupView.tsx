import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FlaskConical, Leaf, Droplet, Clock, ArrowRight } from 'lucide-react';

const SimulationSetupView: React.FC = () => {
  const { selectedRegion, setSimulationParams, runSimulation, setActiveView } = useAppContext();
  const [method, setMethod] = useState<string>('Mixed plantation');
  const [intensity, setIntensity] = useState<number>(5);
  const [timeline, setTimeline] = useState<number>(30);
  const [waterStrategy, setWaterStrategy] = useState<string>('Drip irrigation');
  
  const [selectedTrees, setSelectedTrees] = useState<string[]>(['Oak', 'Pine', 'Maple']);
  const [selectedShrubs, setSelectedShrubs] = useState<string[]>(['Lavender', 'Rosemary']);
  const [selectedGroundCover, setSelectedGroundCover] = useState<string[]>(['Clover', 'Native grasses']);
  const [selectedWildlife, setSelectedWildlife] = useState<string[]>(['Birds', 'Bees', 'Butterflies']);

  const forestationMethods = [
    { id: 'natural', name: 'Natural regeneration', description: 'Allow nature to reclaim the land with minimal human intervention' },
    { id: 'assisted', name: 'Assisted regeneration', description: 'Help nature along by removing barriers to natural forest growth' },
    { id: 'agroforestry', name: 'Agroforestry', description: 'Combine agriculture and forestry for sustainable land use' },
    { id: 'monoculture', name: 'Monoculture plantation', description: 'Plant a single tree species for maximum efficiency' },
    { id: 'mixed', name: 'Mixed plantation', description: 'Plant multiple tree species for biodiversity and resilience' }
  ];

  const waterManagementOptions = [
    { id: 'rainwater', name: 'Rainwater harvesting', description: 'Collect and store rainwater for later use' },
    { id: 'drip', name: 'Drip irrigation', description: 'Efficient water delivery directly to plant roots' },
    { id: 'swales', name: 'Swales', description: 'Dig channels to slow, spread, and sink water into the landscape' },
    { id: 'ponds', name: 'Retention ponds', description: 'Create water bodies to store water and support wildlife' },
    { id: 'none', name: 'None', description: 'No additional water management' }
  ];

  const handleSubmit = () => {
    setSimulationParams({
      method: method as any,
      intensity,
      timeline,
      flora: {
        trees: selectedTrees,
        shrubs: selectedShrubs,
        groundCover: selectedGroundCover,
        wildlife: selectedWildlife
      },
      waterManagement: {
        strategy: waterStrategy as any,
        coverage: 80
      }
    });
    runSimulation();
  };

  if (!selectedRegion) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Please select a region first</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Simulation Setup</h2>
        <p className="text-gray-600">Configure forestation parameters for {selectedRegion.name || 'Selected Region'}</p>
      </div>

      <div className="space-y-8">
        {/* Forestation Method */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <FlaskConical className="h-6 w-6 text-indigo-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Forestation Method</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {forestationMethods.map((option) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  method === option.name 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => setMethod(option.name)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 border-2 flex items-center justify-center ${
                    method === option.name ? 'border-indigo-500' : 'border-gray-300'
                  }`}>
                    {method === option.name && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{option.name}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flora and Fauna Selection */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm border border-green-100">
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-green-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Flora & Fauna</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Trees</h4>
              <div className="flex flex-wrap gap-2">
                {['Oak', 'Pine', 'Maple', 'Eucalyptus', 'Acacia', 'Birch', 'Cedar'].map((tree) => (
                  <button
                    key={tree}
                    onClick={() => {
                      if (selectedTrees.includes(tree)) {
                        setSelectedTrees(selectedTrees.filter(t => t !== tree));
                      } else {
                        setSelectedTrees([...selectedTrees, tree]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTrees.includes(tree)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tree}
                  </button>
                ))}
              </div>
              
              <h4 className="font-medium text-gray-700 mt-5 mb-3">Shrubs</h4>
              <div className="flex flex-wrap gap-2">
                {['Lavender', 'Rosemary', 'Juniper', 'Hazel', 'Elderberry', 'Holly'].map((shrub) => (
                  <button
                    key={shrub}
                    onClick={() => {
                      if (selectedShrubs.includes(shrub)) {
                        setSelectedShrubs(selectedShrubs.filter(s => s !== shrub));
                      } else {
                        setSelectedShrubs([...selectedShrubs, shrub]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedShrubs.includes(shrub)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {shrub}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Ground Cover</h4>
              <div className="flex flex-wrap gap-2">
                {['Clover', 'Native grasses', 'Moss', 'Wildflowers', 'Ferns', 'Vines'].map((cover) => (
                  <button
                    key={cover}
                    onClick={() => {
                      if (selectedGroundCover.includes(cover)) {
                        setSelectedGroundCover(selectedGroundCover.filter(c => c !== cover));
                      } else {
                        setSelectedGroundCover([...selectedGroundCover, cover]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedGroundCover.includes(cover)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cover}
                  </button>
                ))}
              </div>
              
              <h4 className="font-medium text-gray-700 mt-5 mb-3">Wildlife</h4>
              <div className="flex flex-wrap gap-2">
                {['Birds', 'Bees', 'Butterflies', 'Small mammals', 'Reptiles', 'Amphibians'].map((wildlife) => (
                  <button
                    key={wildlife}
                    onClick={() => {
                      if (selectedWildlife.includes(wildlife)) {
                        setSelectedWildlife(selectedWildlife.filter(w => w !== wildlife));
                      } else {
                        setSelectedWildlife([...selectedWildlife, wildlife]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedWildlife.includes(wildlife)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {wildlife}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Water Management */}
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-5 shadow-sm border border-blue-100">
          <div className="flex items-center mb-4">
            <Droplet className="h-6 w-6 text-blue-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Water Management</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {waterManagementOptions.map((option) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  waterStrategy === option.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setWaterStrategy(option.name)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 border-2 flex items-center justify-center ${
                    waterStrategy === option.name ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    {waterStrategy === option.name && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{option.name}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline and Intensity */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 shadow-sm border border-amber-100">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Timeline & Intensity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Simulation Timeline (years)</h4>
              <div className="flex items-center space-x-4">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5" 
                  value={timeline} 
                  onChange={(e) => setTimeline(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-amber-200 to-amber-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xl font-bold w-12 text-center">{timeline}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Implementation Intensity (1-10)</h4>
              <div className="flex items-center space-x-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={intensity} 
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-yellow-200 to-red-500 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xl font-bold w-12 text-center">{intensity}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Minimal</span>
                <span>Moderate</span>
                <span>Intensive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setActiveView('land')}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          ← Back to Land Analysis
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
        >
          Run Simulation
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SimulationSetupView;