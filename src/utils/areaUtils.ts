export const getSelectedAreaDetails = (radius: number) => {
    const areaMeters = Math.PI * Math.pow(radius, 2);
    const areaKm2 = (areaMeters / 1_000_000).toFixed(2);
    return {
      areaMeters,
      areaKm2,
    };
  };
  