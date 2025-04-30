import React from 'react';
import { useAppContext } from '../context/AppContext';

const RegionInfoCard: React.FC = () => {
  const { selectedShape } = useAppContext();

  if (!selectedShape) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm shadow">
        <p className="text-gray-500 italic">No shape selected. Draw a circle to measure area.</p>
      </div>
    );
  }

  if (selectedShape.type !== 'circle') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm shadow">
        <p className="text-gray-500 italic">Only circle shapes are supported for area preview.</p>
      </div>
    );
  }
  
  const radius = selectedShape?.type === 'circle' ? selectedShape.radius : undefined;
  const areaSqKm = radius ? Math.PI * Math.pow(radius / 1000, 2) : 0;
  const radiusKm = radius ? radius / 1000 : 0;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm mt-4">
      <div className="font-semibold text-green-700 mb-1">🗺️ Selected Area</div>
      <div className="text-gray-800">
        {areaSqKm.toFixed(2)} km²
        <div className="text-gray-500 text-xs">Radius: {radiusKm.toFixed(2)} km</div>
      </div>
    </div>
  );
};

export default RegionInfoCard;
