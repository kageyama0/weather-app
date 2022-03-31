import React from 'react';
import citylist from '../lib/city.list.json';
import moment from 'moment-timezone';
import { currentWeather, hourlyWeathers, weeklyWeathers } from '../types/weather';
import TodayWeather from '../components/HourlyWeathers';
import WeeklyWeathers from '../components/WeeklyWeathers';

const allCitiesData: any = citylist;

export async function getServerSideProps(context: any) {
  const cityInfo = context.params.city;
  const splitedCityInfo = cityInfo.split('-');
  const id = splitedCityInfo[splitedCityInfo.length - 1];

  const cityData = allCitiesData.find((city: any) => city.id.toString() == id);

  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_MAP_API_KEY}&exclude=minutely&units=metric`;

  const res = await fetch(apiUrl);
  const res_data = await res.json();

  if (!res_data) {
    return {
      notFound: true
    };
  }

  const timezone: string = res_data.timezone;
  const currentWeather: currentWeather = res_data.current;
  const hourlyWeathers = getHourlyWeather(res_data.hourly, res_data.timezone);
  const weeklyWeathers: weeklyWeathers = res_data.daily;

  return {
    props: {
      city: cityData.name + '(' + cityData.country + ')',
      timezone: timezone,
      currentWeather: currentWeather,
      hourlyWeathers: hourlyWeathers,
      weeklyWeathers: weeklyWeathers
    }
  };
}

const getHourlyWeather = (hourlyData: hourlyWeathers, timezone: string) => {
  const endOfDay = moment().tz(timezone).endOf('day').valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);
  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

type Props = {
  city: string;
  timezone: string;
  currentWeather: currentWeather;
  hourlyWeathers: hourlyWeathers;
  weeklyWeathers: weeklyWeathers;
};

export default function CityPage({ city, timezone, currentWeather, hourlyWeathers, weeklyWeathers }: Props) {
  return (
    <>
      <h1>{city}の天気</h1>

      <TodayWeather hourlyWeathers={hourlyWeathers} timezone={timezone} />
      <WeeklyWeathers weeklyWeathers={weeklyWeathers} timezone={timezone} />
    </>
  );
}
