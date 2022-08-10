import {AppStatus, OfferType} from '../../const';
import {City, Offer} from '../../types';
import {dataSlice} from './data-slice';
import {resetCurrentOffer} from './data-slice';
import {datatype, name, system} from 'faker';

const FAKE_ARRAY_SIZE = 10;

const makeFakeCity = (): City => ({
  name: name.title(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  }
});

const makeFakeCurrentOffer = (): Offer => ({
  id: datatype.number(),
  city: makeFakeCity(),
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

describe('Reducer: dataSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        currentOffer: null,
        nearOffers: [],
        reviews: [],
        favorites: [],
        appStatus: AppStatus.Pending,
      });
  });

  it('should reset current offer', () => {
    const state = {
      offers: [],
      currentOffer: makeFakeCurrentOffer(),
      nearOffers: [],
      reviews: [],
      favorites: [],
      appStatus: AppStatus.Pending,
    };
    expect(dataSlice.reducer(state, resetCurrentOffer()))
      .toEqual({
        offers: [],
        currentOffer: null,
        nearOffers: [],
        reviews: [],
        favorites: [],
        appStatus: AppStatus.Pending,
      });
  });
});
