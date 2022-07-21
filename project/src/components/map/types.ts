import {Location, Offer} from '../../types';

type MapProps = {
  city: Location;
  offers: Offer[];
  selectedOffer: Offer | undefined;
};

export type {MapProps};
