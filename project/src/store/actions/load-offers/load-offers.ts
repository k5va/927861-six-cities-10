import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { OfferType } from '../../../const';
import {AppDispatch, Offer, State} from '../../../types';
import {setOffers} from '../../actions';

type JSONValue = { [key: string]: number | boolean | string | string[] | JSONValue };

const createOffer = (raw: JSONValue): Offer => {
  const city: JSONValue = raw['city'] as JSONValue;
  const cityLocation: JSONValue = city['location'] as JSONValue;
  const host: JSONValue = raw['host'] as JSONValue;
  const location: JSONValue = raw['location'] as JSONValue;

  return {
    id: raw['id'] as number,
    city: {
      name: city['name'] as string,
      location: {
        longitude: cityLocation['longitude'] as number,
        latitude: cityLocation['latitude'] as number,
        zoom: cityLocation['zoom'] as number,
      },
    },
    previewImage: raw['previewImage'] as string,
    images: raw['images'] as string[],
    title: raw['title'] as string,
    isFavorite: raw['isFavorite'] as boolean,
    isPremium: raw['isPremium'] as boolean,
    rating: raw['rating'] as number,
    type: raw['type'] as OfferType,
    bedrooms: raw['bedrooms'] as number,
    maxAdults: raw['maxAdults'] as number,
    price: raw['price'] as number,
    goods: raw['goods'] as string[],
    host: {
      id: host['id'] as number,
      name: host['name'] as string,
      isPro: host['isPro'] as boolean,
      avatarUrl: host['avatarUrl'] as string,
    },
    description: raw['description'] as string,
    location: {
      longitude: location['longitude'] as number,
      latitude: location['latitude'] as number,
      zoom: location['zoom'] as number,
    },
  };
};

const loadOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<JSONValue[]>('/hotels');
    dispatch(setOffers({offers: data.map(createOffer)}));
  },
);

export default loadOffers;
