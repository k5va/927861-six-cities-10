import {PlaceCardMode} from '../../const';
import {Offer} from '../../types';

type PlaceCardProps = {
  offer: Offer;
  mode: PlaceCardMode;
  onMouseOver?: (offer: Offer) => void;
}

export type {PlaceCardProps};
