import type { NextPage } from 'next';
import { SearchBar } from '../components/SearchBar';


const Home: NextPage = () => {
  return (
    <>
      <h1>Weather App</h1>
      <SearchBar />
    </>
  );
};

export default Home;
