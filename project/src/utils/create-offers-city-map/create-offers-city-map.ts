import {City, Offer} from '../../types';

/**
 * Creates offer-city map from array of offers
 * @param {Offer[]} offers - array of offers
 * @returns {Map<City, Offer[]>} offers city map
 */
const createOffersCityMap = (offers: Offer[]): Map<City, Offer[]> => {
  const offersCityMap: Map<City, Offer[]> = new Map();

  offers.forEach((offer) => {
    if (offersCityMap.has(offer.city)) {
      offersCityMap.get(offer.city)?.push(offer);
    } else {
      offersCityMap.set(offer.city, [offer]);
    }
  });

  return offersCityMap;
};

export default createOffersCityMap;
