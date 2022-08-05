import {Offer, Review} from '..';

type DataState = {
  offers: Offer[];
  currentOffer: Offer | null;
  nearOffers: Offer[];
  reviews: Review[];
};

export default DataState;
