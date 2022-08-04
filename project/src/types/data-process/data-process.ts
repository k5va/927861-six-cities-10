import {Offer, Review} from '../../types';

type DataProcess = {
  offers: Offer[];
  currentOffer: Offer | null;
  nearOffers: Offer[];
  reviews: Review[];
};

export default DataProcess;
