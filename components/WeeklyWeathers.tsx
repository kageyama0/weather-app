import React from 'react';
import WeeklyWeather from './WeeklyWeather';
import { weeklyWeather, weeklyWeathers } from '../types/weather';

type Props = {
  weeklyWeathers: weeklyWeathers;
  timezone: string;
};

export default function WeeklyWeathers({ weeklyWeathers, timezone }: Props) {
  return (
    <>
      <h2>明日以降の天気予報</h2>
      <div style={{ display: 'flex', margin: '30px auto', width: '90%' }}>
        {weeklyWeathers.map((weeklyWeather: weeklyWeather, index: number) => {
          if (index == 0) return;
          return <WeeklyWeather key={index} weeklyWeather={weeklyWeather} timezone={timezone} />;
        })}
      </div>
    </>
  );
}
