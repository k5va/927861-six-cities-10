import {Offer, Review} from '..';
import {AppStatus} from '../../const';

type DataState = {
  offers: Offer[];
  currentOffer: Offer | null;
  nearOffers: Offer[];
  reviews: Review[];
  appStatus: AppStatus;
};

export default DataState;
