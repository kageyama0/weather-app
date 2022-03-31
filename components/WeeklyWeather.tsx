import React from 'react';
import Image from 'next/image';

import { timeCovert } from '../lib/timeCovert';
import { weeklyWeather } from '../types/weather';

type Props = {
  weeklyWeather: weeklyWeather;
  timezone: string;
};

export default function WeeklyWeather({ weeklyWeather, timezone }: Props) {
  const dateTime = timeCovert(weeklyWeather.dt, timezone);

  return (
    <>
      <div>
        {dateTime.month}/{dateTime.day}/({dateTime.weekday})
        <div>
          <Image
            src={`https://openweathermap.org/img/wn/${weeklyWeather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            width="100px"
            height="100px"
          />
        </div>
        <div style={{ display: 'flex', margin: 'auto', textAlign: 'center' }}>
          <div style={{ color: 'red' }}>{Math.floor(weeklyWeather.temp.max)}&deg;C</div>
          <div style={{ color: 'blue', paddingLeft: '10px' }}>{Math.ceil(weeklyWeather.temp.min)}&deg;C</div>
        </div>
      </div>
    </>
  );
}
