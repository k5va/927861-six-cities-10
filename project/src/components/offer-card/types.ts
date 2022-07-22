import {OfferCardMode} from '../../const';
import {Offer} from '../../types';

type PlaceCardProps = {
  offer: Offer;
  mode: OfferCardMode;
  onMouseOver?: (offer: Offer) => void;
}

export type {PlaceCardProps};
