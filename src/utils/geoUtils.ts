// Radius of Earth in meters
const EARTH_RADIUS = 6371000;

export function calculateCircleArea(radiusMeters: number): number {
  return Math.PI * Math.pow(radiusMeters, 2);
}
