import {Offer} from '../../types';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offer: Offer) => void;
}

export type {OffersListProps};


