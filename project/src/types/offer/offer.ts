import {Location} from '../../types';
import {OfferType} from '../../const';

type Offer = {
  id: number;
  city: {
    name: string;
    location: Location;
  };
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: {
    id: number;
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  description: string;
  location: Location;
};

export default Offer;
