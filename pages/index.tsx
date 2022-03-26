import type { NextPage } from 'next';
import { Table } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import useSWR from 'swr';

const getWeatherInfo = (cityName: string): [any, boolean] => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=${process.env.NEXT_PUBLIC_WEATHER_MAP_API_KEY}`;

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(apiUrl, fetcher);
  console.log("data:",data);

  if (error) {
    console.error(error);
  }

  const isLoading = !error && !data;

  return [data, isLoading];
};

const Home: NextPage = () => {
  let cityName: string = 'Kobe';

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
          <th>経度</th>
          <th>緯度</th>
          <th>現在の温度</th>
        </tr>
      </thead>
      <tbody>
        <tr key={cityWeatherInfo.id}>
          <td>{cityWeatherInfo.name}</td>
          <td>{cityWeatherInfo.coord.lon}</td>
          <td>{cityWeatherInfo.coord.lat}</td>
          <td>{cityWeatherInfo.main.temp}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Home;
