import {OfferCardMode} from '../../const';
import {Offer} from '../../types';

type OffersListProps = {
  offers: Offer[];
  mode: OfferCardMode;
  onActiveOfferChange?: (offer: Offer) => void;
}

export type {OffersListProps};


