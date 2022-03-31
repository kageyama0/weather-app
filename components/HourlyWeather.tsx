import React from 'react';

import { timeCovert } from '../lib/timeCovert';
import { hourlyWeather } from '../types/weather';

type Props = {
  hourlyWeather: hourlyWeather;
  timezone: string;
};

export default function HourlyWeather({ hourlyWeather, timezone }: Props) {
  const dateTime = timeCovert(hourlyWeather.dt, timezone);
  // console.log(hourlyWeather);

  return (
    <>
      <div>aaa</div>
    </>
  );
}
