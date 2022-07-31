import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppStatus} from '../../../const';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseOffer} from '../../../utils';
import {setOffers, setAppStatus} from '../../actions';

/**
 * Action for loading all offers from server
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const loadOffers = createAsyncThunk<
  void, // action callback return value type
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
    dispatch(setOffers({offers: data.map(parseOffer)}));
    dispatch(setAppStatus({status: AppStatus.Ready}));
  },
);

export default loadOffers;
