import {PlaceCardMode} from '../../const';
import {Offer} from '../../types';

type OffersListProps = {
  offers: Offer[];
  mode: PlaceCardMode;
  onActiveOfferChange?: (offer: Offer) => void;
}

export type {OffersListProps};


