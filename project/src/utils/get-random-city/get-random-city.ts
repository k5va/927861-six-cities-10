import {Cities} from '../../const';

/**
 * Returns random city
 * @returns Radom city
 */
const getRandomCity = (): Cities => {
  const cities = Object.values(Cities);

  return cities[Math.floor(cities.length * Math.random())];
};

export default getRandomCity;
