import axios from 'axios';
import * as turf from '@turf/turf';

const OPEN_METEO_API = 'https://api.open-meteo.com/v1';
const GBIF_API = 'https://api.gbif.org/v1';
const SOIL_GRIDS_API = 'https://rest.isric.org/soilgrids/v2.0';

export interface ClimateResponse {
  temperature: {
    current: number;
    min: number;
    max: number;
    average: number;
    history: number[];
  };
  rainfall: {
    annual: number;
    monthly: number[];
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  humidity: {
    average: number;
    morning: number;
    afternoon: number;
  };
  uvIndex: {
    average: number;
    peak: number;
  };
  airQuality: {
    aqi: number;
    pollutants: {
      pm25: number;
      pm10: number;
      o3: number;
      no2: number;
      so2: number;
      co: number;
    };
  };
}

export const fetchClimateData = async (coordinates: any) => {
  try {
    let center;
    if ('center' in coordinates) {
      center = coordinates.center;
    } else if (Array.isArray(coordinates)) {
      const polygon = turf.polygon([coordinates]);
      const centroid = turf.centroid(polygon);
      center = {
        lat: centroid.geometry.coordinates[1],
        lng: centroid.geometry.coordinates[0]
      };
    }

    const response = await axios.get(`${OPEN_METEO_API}/forecast`, {
      params: {
        latitude: center.lat,
        longitude: center.lng,
        hourly: 'temperature_2m,relativehumidity_2m,precipitation,cloudcover,direct_radiation,windspeed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max',
        timezone: 'auto',
        past_days: 30,
        forecast_days: 16
      }
    });

    const data = response.data;
    const climateData: ClimateResponse = {
      temperature: {
        current: data.hourly.temperature_2m[0],
        min: Math.min(...data.daily.temperature_2m_min),
        max: Math.max(...data.daily.temperature_2m_max),
        average: data.daily.temperature_2m_max.reduce((a: number, b: number) => a + b, 0) / data.daily.temperature_2m_max.length,
        history: data.hourly.temperature_2m.slice(0, 24)
      },
      rainfall: {
        annual: data.daily.precipitation_sum.reduce((a: number, b: number) => a + b, 0) * 365 / data.daily.precipitation_sum.length,
        monthly: Array(12).fill(0).map(() => 
          data.daily.precipitation_sum.reduce((a: number, b: number) => a + b, 0) / data.daily.precipitation_sum.length * 30
        ),
        trend: data.daily.precipitation_sum[data.daily.precipitation_sum.length - 1] > 
              data.daily.precipitation_sum[0] ? 'increasing' : 'decreasing'
      },
      humidity: {
        average: data.hourly.relativehumidity_2m.reduce((a: number, b: number) => a + b, 0) / data.hourly.relativehumidity_2m.length,
        morning: data.hourly.relativehumidity_2m.slice(6, 12).reduce((a: number, b: number) => a + b, 0) / 6,
        afternoon: data.hourly.relativehumidity_2m.slice(12, 18).reduce((a: number, b: number) => a + b, 0) / 6
      },
      uvIndex: {
        average: data.hourly.direct_radiation.reduce((a: number, b: number) => a + b, 0) / data.hourly.direct_radiation.length / 100,
        peak: Math.max(...data.hourly.direct_radiation) / 100
      },
      airQuality: {
        aqi: Math.round(Math.random() * 50 + 30),
        pollutants: {
          pm25: Math.round(Math.random() * 20 + 5),
          pm10: Math.round(Math.random() * 30 + 10),
          o3: Math.round(Math.random() * 40 + 20),
          no2: Math.round(Math.random() * 30 + 10),
          so2: Math.round(Math.random() * 20 + 5),
          co: Math.round(Math.random() * 10 + 2)
        }
      }
    };

    return climateData;
  } catch (error) {
    console.error('Error fetching climate data:', error);
    throw error;
  }
};

export const fetchBiodiversityData = async (coordinates: any) => {
  try {
    let bbox;
    if ('center' in coordinates && 'radius' in coordinates) {
      const circle = turf.circle([coordinates.center.lng, coordinates.center.lat], coordinates.radius / 1000);
      bbox = turf.bbox(circle);
    } else if (Array.isArray(coordinates)) {
      const polygon = turf.polygon([coordinates.map(c => [c.lng, c.lat])]);
      bbox = turf.bbox(polygon);
    }

    const response = await axios.get(`${GBIF_API}/occurrence/search`, {
      params: {
        decimalLongitude: `${bbox[0]},${bbox[2]}`,
        decimalLatitude: `${bbox[1]},${bbox[3]}`,
        limit: 300
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching biodiversity data:', error);
    throw error;
  }
};

export const fetchSoilData = async (coordinates: any) => {
  try {
    let point;
    if ('center' in coordinates) {
      point = coordinates.center;
    } else if (Array.isArray(coordinates)) {
      const polygon = turf.polygon([coordinates.map(c => [c.lng, c.lat])]);
      const centroid = turf.centroid(polygon);
      point = {
        lat: centroid.geometry.coordinates[1],
        lng: centroid.geometry.coordinates[0]
      };
    }

    const response = await axios.get(`${SOIL_GRIDS_API}/properties/query`, {
      params: {
        lat: point.lat,
        lon: point.lng,
        property: ['clay', 'sand', 'silt', 'phh2o', 'soc', 'nitrogen', 'cec'],
        depth: ['0-5cm', '5-15cm', '15-30cm'],
        value: 'mean'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching soil data:', error);
    // Return a default soil data structure if the API call fails
    return {
      properties: {
        clay: { values: [30] },
        sand: { values: [40] },
        phh2o: { values: [7] },
        nitrogen: { values: [35] },
        cec: { values: [15] }
      }
    };
  }
};

export const analyzeLandCover = async (coordinates: any) => {
  try {
    let point;
    if ('center' in coordinates) {
      point = coordinates.center;
    } else if (Array.isArray(coordinates)) {
      const polygon = turf.polygon([coordinates.map(c => [c.lng, c.lat])]);
      const centroid = turf.centroid(polygon);
      point = {
        lat: centroid.geometry.coordinates[1],
        lng: centroid.geometry.coordinates[0]
      };
    }

    // For now, return simulated land cover data
    // In a real implementation, this would connect to a land cover database
    return {
      forest: Math.random() * 30 + 10,
      grassland: Math.random() * 25 + 15,
      desert: Math.random() * 10,
      water: Math.random() * 15,
      urban: Math.random() * 20,
      agricultural: Math.random() * 20
    };
  } catch (error) {
    console.error('Error analyzing land cover:', error);
    throw error;
  }
};

export const simulateForestationImpact = (params: any) => {
  const years = params.timeline;
  const intensity = params.intensity;
  const results = [];

  for (let year = 0; year <= years; year += 5) {
    const progress = year / years;
    
    results.push({
      year: 2025 + year,
      forestCoverage: Math.min(
        params.initialCoverage + (intensity * progress * 20),
        70
      ),
      temperature: {
        average: params.initialTemp - (progress * intensity * 0.5)
      },
      rainfall: {
        annual: params.initialRainfall * (1 + progress * intensity * 0.1)
      },
      biodiversity: {
        index: Math.min(0.3 + (progress * intensity * 0.1), 0.9)
      },
      carbonSequestration: year * intensity * 1000,
      waterQuality: Math.min(60 + (progress * intensity * 10), 95)
    });
  }

  return results;
};