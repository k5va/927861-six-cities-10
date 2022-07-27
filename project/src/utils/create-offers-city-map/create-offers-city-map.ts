import {Offer} from '../../types';

/**
 * Creates offer-city map from array of offers
 * @param {Offer[]} offers - array of offers
 * @returns {Map<string, Offer[]>} offers city map
 */
const createOffersCityMap = (offers: Offer[]): Map<string, Offer[]> => {
  const offersCityMap: Map<string, Offer[]> = new Map();

  offers.forEach((offer) => {
    if (offersCityMap.has(offer.city.name)) {
      offersCityMap.get(offer.city.name)?.push(offer);
    } else {
      offersCityMap.set(offer.city.name, [offer]);
    }
  });

  return offersCityMap;
};

export default createOffersCityMap;
