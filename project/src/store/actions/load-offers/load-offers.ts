import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, JSONValue, Offer, State} from '../../../types';
import {parseOffer} from '../../../utils';

/**
 * Action for loading all offers from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadOffers = createAsyncThunk<
  Offer[], // action callback return value type
  undefined, // _arg type
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<JSONValue[]>('/hotels');
    return data.map(parseOffer);
  },
);

export default loadOffers;
