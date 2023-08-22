interface HistoryWeatherData {
  name: string;
  main: { temp: number };
}

interface PreviousSearchCardProps {
  data: HistoryWeatherData;
  onClick: (cityName: string) => void;
}

function PreviousSearchCard({ data, onClick }: PreviousSearchCardProps) {
  return (
    <article
      onClick={() => onClick(data.name)}
      className="flex flex-col gap-2 p-2 transition-all duration-300 border rounded-lg cursor-pointer border-border hover:border-dark basis-1/5 grow-0"
    >
      <h3 className="block text-sm tracking-tighter text-dark text-xlarge">
        {data.name}
      </h3>
      <p className="font-medium tracking-tighter text-heading">
        {Math.floor(data.main.temp)}°C
      </p>
    </article>
  );
}

export default PreviousSearchCard;
