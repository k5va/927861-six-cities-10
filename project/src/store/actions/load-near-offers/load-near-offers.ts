import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseOffer} from '../../../utils';
import {setNearOffers} from '../../actions';

/**
 * Action for loading near offers from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadNearOffers = createAsyncThunk<
  void, // action callback return value type
  { // arg type
    offerId: number,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/loadNearOffers',
  async ({offerId}, {dispatch, extra: api}) => {
    const {data} = await api.get<JSONValue[]>(`/hotels/${offerId}/nearby`);
    dispatch(setNearOffers({offers: data.map(parseOffer)}));
  },
);

export default loadNearOffers;
