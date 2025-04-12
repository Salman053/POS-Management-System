import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "2deb83dabd21bc114532303a382bdc04";

export const useWeather = () => {
  const [weather, setWeather] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      setWeather(res.data.weather[0].main); // e.g., "Rain", "Clear"
    });
  }, []);

  return weather;
};
