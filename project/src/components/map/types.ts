import {City, Offer} from '../../types';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | undefined;
  mode: string;
};

export type {MapProps};
