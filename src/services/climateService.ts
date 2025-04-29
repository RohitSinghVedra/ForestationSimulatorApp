const API_KEY = "19c231b1d68756f80434a1b14c403dd5"; // Your OpenWeatherMap API key

export async function getWeatherData(lat: number, lon: number) {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const weatherData = await weatherResponse.json();

  // Fetch UV Index
  const uvResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  let uvIndex = "unavailable";
  if (uvResponse.ok) {
    const uvData = await uvResponse.json();
    uvIndex = uvData.value;
  }

  return {
    temperature: {
      current: weatherData.main.temp,
      average: weatherData.main.temp, // Placeholder, replace with proper average if needed
      min: weatherData.main.temp_min,
      max: weatherData.main.temp_max,
    },
    humidity: weatherData.main.humidity,
    uvIndex: uvIndex,
    airQuality: "placeholder", // We'll add real air quality next
    location: weatherData.name,
  };
}
