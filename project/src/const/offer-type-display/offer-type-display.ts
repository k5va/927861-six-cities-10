import {OfferType} from '../../const';

const OfferTypeDisplay: Record<OfferType, string> = {
  [OfferType.Apartment]: 'Apartment',
  [OfferType.Hotel]: 'Hotel',
  [OfferType.House]: 'House',
  [OfferType.Room]: 'Private Room',
};

export default OfferTypeDisplay;
