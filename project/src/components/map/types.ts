import {City, Offer} from '../../types';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
  mode: string;
};

export type {MapProps};
