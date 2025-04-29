import React from 'react';
import { useAppContext } from '../context/AppContext';

const RegionInfoCard: React.FC = () => {
  const { selectedShape } = useAppContext();

  if (!selectedShape) return null;

  const { radius } = selectedShape; // in meters
  const areaSqKm = Math.PI * Math.pow(radius / 1000, 2);
  const radiusKm = radius / 1000;

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
