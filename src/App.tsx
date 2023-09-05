import "./App.css";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CurrentLocationWeather from "./components/CurrentLocationWeather";
import PreviousSearchCard from "./components/PreviousSearchCard";
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

interface WeatherData {
  name: string;
  id: number;

  weather: {
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
}

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [history, setHistory] = useState<WeatherData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams({ city: "" });
  const cityFromParams = searchParams.get("city");

  async function getWeatherData(cityName: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (response.ok) {
        const currentLocationData: WeatherData = await response.json();
        setWeatherData(currentLocationData);
        setErrorMessage(null);
        setSearchParams({ city: cityName }); //update URL parameter here
      } else {
        setErrorMessage("Mesto ne obstaja. Poskusite ponovno.");
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setCityName("");
    setSearchParams({ city: cityName });
  }

  //fetch weather data when params change
  useEffect(() => {
    if (cityFromParams) {
      getWeatherData(cityFromParams);
    }
  }, [cityFromParams]);

  //update history after weatherData is set
  useEffect(() => {
    if (weatherData) {
      setHistory((prevHistory) => {
        // Limit to 5 items
        const newHistory = [...prevHistory.slice(-4), weatherData];
        return newHistory.length > 5 ? newHistory.slice(-5) : newHistory;
      });
    }
  }, [weatherData]);

  // function handlePreviousSearchClick(clickedCityName: string) {
  //   // setSearchParams({ city: "" });
  //   getWeatherData(clickedCityName);
  // }

  return (
    <main className="max-w-3xl p-6 m-auto border rounded-lg border-border">
      <h1 className="pb-6 font-medium tracking-tighter text-title">
        Vremenska napoved
      </h1>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="city_name"
          className="block pb-2 mb-2 text-sm font-medium leading-tight text-left text-dark text-xlarge"
        >
          Lokacija
        </label>
        <input
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          type="text"
          id="city_name"
          className="bg-light border border-border text-dark text-sm rounded-lg block w-full p-2.5 outline-none focus:border-1 focus:ring-2 focus:ring-blue-500"
          placeholder="Vpišite ime mesta in pritisnite tipko enter"
          required
        ></input>
        {errorMessage && (
          <p className="mt-2 tracking-tighter text-left text-red-500 text-large">
            {errorMessage}
          </p>
        )}
      </form>
      {weatherData && (
        <>
          <Suspense
            fallback={
              <p className="font-medium tracking-tighter text-title">
                Iščemo podatke...
              </p>
            }
          >
            <CurrentLocationWeather
              name={weatherData.name}
              temp={weatherData.main.temp}
              feels_like={weatherData.main.feels_like}
              temp_min={weatherData.main.temp_min}
              temp_max={weatherData.main.temp_max}
              humidity={weatherData.main.humidity}
            />
          </Suspense>
        </>
      )}
      {history.length > 0 ? (
        <section className="flex flex-col gap-2">
          <h3 className="mt-8 mb-2 text-sm font-medium leading-tight text-left text-dark text-xlarge">
            Zgodovina
          </h3>
          <div className="flex gap-3">
            {[...history].reverse().map((city, index) => (
              <PreviousSearchCard
                key={index}
                data={city}
                // onClick={handlePreviousSearchClick}
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default App;
