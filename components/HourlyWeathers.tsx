import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { timeCovert } from '../lib/timeCovert';
import { hourlyWeathers, hourlyWeather } from '../types/weather';

type Props = {
  hourlyWeathers: hourlyWeathers;
  timezone: string;
};

export default function HourlyWeather({ hourlyWeathers, timezone }: Props) {
  const chart_data: Array<{ name: string; 気温: number; 天気: string }> = [];
  for (let hourlyWeather of hourlyWeathers) {
    const dateTime = timeCovert(hourlyWeather.dt, timezone);
    const name = String(Number(dateTime.hour)) + "時";
    chart_data.push({ name: name, 気温: hourlyWeather.temp, 天気: hourlyWeather.weather[0].description });
  }

  return (
    <>
      <h2>今日の天気予報</h2>
      <LineChart width={900} height={250} data={chart_data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="気温" stroke="#8884d8" />
      </LineChart>
    </>
  );
}
