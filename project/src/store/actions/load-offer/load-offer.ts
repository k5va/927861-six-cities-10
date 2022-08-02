import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseOffer} from '../../../utils';
import {setCurrentOffer} from '../../actions';

/**
 * Action for loading offer from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadOffer = createAsyncThunk<
  void, // action callback return value type
  { // _arg type
    offerId: number,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/loadOffer',
  async ({offerId}, {dispatch, extra: api}) => {
    const {data} = await api.get<JSONValue>(`/hotels/${offerId}`);
    dispatch(setCurrentOffer({offer: parseOffer(data)}));
  },
);

export default loadOffer;
