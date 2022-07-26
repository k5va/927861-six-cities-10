import {OfferCardMode} from '../../const';
import {Offer} from '../../types';

type OfferCardProps = {
  offer: Offer;
  mode: OfferCardMode;
  onSelected?: (isSelected: boolean, offer: Offer) => void;
}

export type {OfferCardProps};
