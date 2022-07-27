import {OffersSortingType} from '../../const';

type OffersSortingProps = {
  sorting: OffersSortingType;
  onSortingChange: (sorting: OffersSortingType) => void;
}

export type {OffersSortingProps};
