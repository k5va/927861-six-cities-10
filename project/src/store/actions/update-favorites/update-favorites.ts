import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute, FavoritesOperation} from '../../../const';
import {AppDispatch, Offer, State} from '../../../types';
import {parseOffer} from '../../../utils';

/**
 * Action for posting review to server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const updateFavorites = createAsyncThunk<
  Offer, // action callback return value type
  { // _arg type
    offerId: number,
    isFavorite: boolean,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/updateFavorites',
  async ({offerId, isFavorite}, {extra: api}) => {
    const {data} = await api.post(
      `${ApiRoute.Favorites}/${offerId}/${isFavorite
        ? FavoritesOperation.Add
        : FavoritesOperation.Remove}`
    );
    return parseOffer(data);
  },
);

export default updateFavorites;
