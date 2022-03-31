import { Table } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import useSWR from 'swr';

const getWeatherInfo = (cityName: string): [any, boolean] => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=${process.env.NEXT_PUBLIC_WEATHER_MAP_API_KEY}`;

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(apiUrl, fetcher);
  // console.log('data:', data);

  const isLoading = !error && !data;

  return [data, isLoading];
};

type Props = {
  cityName: string;
};

export const WeatherInfo = ({ cityName }: Props) => {
  const [cityWeatherInfo, isLoading] = getWeatherInfo(cityName);

  if (isLoading) {
    const visible = true;
    return (
      <div style={{ width: 400, position: 'relative' }}>
        <LoadingOverlay visible={visible} />
      </div>
    );
  } else {
    if (cityWeatherInfo == null) {
      return <div>データがありません</div>;
    }
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>都市の名前</th>
          <th>天気</th>
          <th>現在の気温</th>
          <th>湿度</th>
          <th>風速</th>
        </tr>
      </thead>
      <tbody>
        <tr key={cityWeatherInfo.id}>
          <td>{cityWeatherInfo.name}</td>
          <td>{cityWeatherInfo.weather[0].main}</td>
          <td>{cityWeatherInfo.main.temp}°C</td>
          <td>{cityWeatherInfo.main.humidity}%</td>
          <td>{cityWeatherInfo.wind.speed}m/s</td>
        </tr>
      </tbody>
    </Table>
  );
};
