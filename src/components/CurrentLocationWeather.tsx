interface CurrentLocationWeatherProps {
  name: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

function CurrentLocationWeather({
  name,
  temp,
  feels_like,
  temp_min,
  temp_max,
  humidity,
}: CurrentLocationWeatherProps) {
  return (
    <article className="block w-full p-6 my-4 border rounded-lg border-border">
      <h3 className="block pb-2 mb-2 text-sm font-medium tracking-tighter text-dark text-xlarge">
        {name}
      </h3>
      {/* <p>id:{weatherData.id}</p> */}
      <p className="mt-2 mb-1 font-medium tracking-tighter text-center text-title">
        {Math.round(temp)}°C
      </p>
      <p className="mb-12">Feels like: {Math.round(feels_like)}°C</p>
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-sm text-gray">Min: {Math.round(temp_min)}°C</p>
        <p className="text-sm text-gray">Max: {Math.round(temp_max)}°C</p>
        <p className="text-sm text-gray">Humidity: {humidity}%</p>
      </div>
    </article>
  );
}

export default CurrentLocationWeather;
