import {Offer} from '../../types';

/**
 * Finds offers of given city
 * @param {string} cityName - city's name
 * @param {Offer[]} allOffers - array of all offers
 * @returns {Offer[]} - array of given city's offers
 */
const findCityOffers = (cityName: string, allOffers: Offer[]): Offer[] =>
  allOffers.filter(({city}) => city.name === cityName);

export default findCityOffers;
