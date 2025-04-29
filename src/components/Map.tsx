import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useAppContext } from '../context/AppContext';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map: React.FC = () => {
  const { setSelectedRegion } = useAppContext();
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const calculateArea = (layer: L.Layer): number => {
    if (layer instanceof L.Circle) {
      return Math.PI * Math.pow(layer.getRadius() / 1000, 2);
    } else if (layer instanceof L.Polygon) {
      return L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 1000000;
    }
    return 0;
  };

  const getCoordinates = (layer: L.Layer) => {
    if (layer instanceof L.Circle) {
      const center = layer.getLatLng();
      const radius = layer.getRadius();
      return {
        center: { lat: center.lat, lng: center.lng },
        radius: radius
      };
    } else if (layer instanceof L.Polygon) {
      return layer.getLatLngs()[0].map((coord: L.LatLng) => ({
        lat: coord.lat,
        lng: coord.lng
      }));
    }
    return [];
  };

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const type = e.layerType;
    
    const region = {
      id: `region-${Date.now()}`,
      name: 'Selected Region',
      type: type,
      coordinates: getCoordinates(layer),
      area: Math.round(calculateArea(layer))
    };

    setSelectedRegion(region);
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: L.Layer) => {
      const type = layer instanceof L.Circle ? 'circle' : 
                   layer instanceof L.Rectangle ? 'rectangle' : 'polygon';
      
      const region = {
        id: `region-${Date.now()}`,
        name: 'Selected Region',
        type: type,
        coordinates: getCoordinates(layer),
        area: Math.round(calculateArea(layer))
      };

      setSelectedRegion(region);
    });
  };

  const handleDeleted = () => {
    setSelectedRegion(null);
  };

  useEffect(() => {
    // Fix Leaflet icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: icon,
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  }, []);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        minZoom={2}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="bottomright"
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
            draw={{
              rectangle: {
                shapeOptions: {
                  color: '#10B981',
                  fillOpacity: 0.3
                }
              },
              circle: {
                shapeOptions: {
                  color: '#10B981',
                  fillOpacity: 0.3
                }
              },
              polygon: {
                shapeOptions: {
                  color: '#10B981',
                  fillOpacity: 0.3
                },
                allowIntersection: false,
                drawError: {
                  color: '#e1e4e8',
                  message: '<strong>Cannot draw intersecting lines!</strong>'
                }
              },
              polyline: false,
              circlemarker: false,
              marker: false
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Instructions Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Select Region</h2>
            <p className="text-gray-600">Use the drawing tools in the bottom right to select a region on the map for analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;