import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {FavoritesOperation} from '../../../const';
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
    operation: FavoritesOperation,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/updateFavorites',
  async ({offerId, operation}, {extra: api}) => {
    const {data} = await api.post(`/favorite/${offerId}/${operation}`);
    return parseOffer(data);
  },
);

export default updateFavorites;
