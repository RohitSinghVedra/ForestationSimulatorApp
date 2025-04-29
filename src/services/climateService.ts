// src/services/climateService.ts

const API_KEY = "19c231b1d68756f80434a1b14c403dd5"; // Your OpenWeatherMap API key

export async function getWeatherData(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    temperature: {
      current: data.main.temp,
      min: data.main.temp_min,
      max: data.main.temp_max,
    },
    humidity: data.main.humidity,
    uvIndex: "placeholder", // OpenWeather UV Index requires a separate call (we’ll add next)
    airQuality: "placeholder", // We’ll add real air quality after this too
    location: data.name,
  };
}
