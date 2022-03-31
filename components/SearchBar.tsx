import React, { useState } from 'react';
import Link from 'next/link';
import citylist from '../lib/city.list.json';

import { Input, List } from '@mantine/core';

type CityData = {
  id: number;
  name: string;
  country: string;
};

const allCitiesData: any = citylist;

export const SearchBar = () => {
  const [input_value, setValue] = useState<string>('');
  const [results, setResults] = useState<Array<CityData>>([]);

  const onChange = (event: any) => {
    const value = event.target.value;
    setValue(value);

    let matchingCitiesData: Array<CityData> = [];
    if (value.length >= 3) {
      for (let cityData of allCitiesData) {
        // inputに入力された文字列と頭文字がマッチする都市名があれば、trueにする
        const isMatch: boolean = cityData.name.toLowerCase().startsWith(value.toLowerCase());

        const cityInfo = {
          id: cityData.id,
          name: cityData.name.replace(/\s+/g, '-'),
          country: cityData.country
        };

        if (isMatch) {
          matchingCitiesData.push(cityInfo);
        }
      }
    }

    setResults(matchingCitiesData);
  };

  return (
    <>
      <Input
        variant="default"
        value={input_value}
        onChange={onChange}
        placeholder="都市名(例: Tokyo)を入力してください。"
      />
      {input_value.length > 3 && (
        <List>
          {results.length > 0 ? (
            results.map((city) => {
              return (
                <List.Item key={city.id}>
                  <Link href={`${city.name}-${city.id}`}>
                    <a>
                      {city.name}
                      <span>({city.country})</span>
                    </a>
                  </Link>
                </List.Item>
              );
            })
          ) : (
            <List.Item>一致するデータがありません。</List.Item>
          )}
        </List>
      )}
    </>
  );
};
