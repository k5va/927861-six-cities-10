import {Offer} from '../../types';

type PlaceCardProps = {
  offer: Offer;
  isFavoriteMode?: boolean;
  onMouseOver?: (offer: Offer) => void;
}

export type {PlaceCardProps};
