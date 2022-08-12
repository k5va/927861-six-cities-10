import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {dropToken} from '../../../api';
import { ApiRoute } from '../../../const';
import {AppDispatch, State} from '../../../types';
import loadOffers from '../load-offers/load-offers';

/**
 * Action for logout
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const checkLogin = createAsyncThunk<
  void, // action callback return value type
  undefined, // _arg type
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(loadOffers());
  },
);

export default checkLogin;
