import {OffersSortingType} from '../../const';
import {Offer} from '../../types';

/**
 * Sorts offers array by given sorting type
 * @param {Offer[]} offers - array of offers
 * @param {OffersSortingType} sorting - sorting type
 * @returns {Offer[]} array of sorted offers
 */
const sortOffers = (offers: Offer[], sorting: OffersSortingType): Offer[] => {
  switch (sorting) {
    case OffersSortingType.PriceLowToHigh:
      return [...offers].sort((offer1, offer2) => offer1.price - offer2.price);
    case OffersSortingType.PriceHighToLow:
      return [...offers].sort((offer1, offer2) => offer2.price - offer1.price);
    case OffersSortingType.TopRated:
      return [...offers].sort((offer1, offer2) => offer2.rating - offer1.rating);
    case OffersSortingType.Popular:
    default:
      return offers;
  }
};

export default sortOffers;
