import {datatype, name, system} from 'faker';
import {mockCity} from '..';
import {OfferType} from '../../const';
import {Offer} from '../../types';

const FAKE_ARRAY_SIZE = 10;

const mockOffer = (): Offer => ({
  id: datatype.number(),
  city: mockCity(),
  previewImage: system.filePath(),
  images: Array.from(new Array(FAKE_ARRAY_SIZE), () => system.filePath()),
  title: name.title(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  type: OfferType.Apartment,
  bedrooms: datatype.number(),
  maxAdults: datatype.number(),
  price: datatype.number(),
  goods: Array.from(new Array(FAKE_ARRAY_SIZE), () => datatype.string()),
  description: datatype.string(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  host: {
    id: datatype.number(),
    name: name.title(),
    isPro: datatype.boolean(),
    avatarUrl: system.filePath()
  }
});

export default mockOffer;
