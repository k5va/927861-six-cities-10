import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {dropToken} from '../../../api';
import {AppDispatch, State} from '../../../types';

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
  'app/logout',
  async (_arg, {extra: api}) => {
    await api.delete('/logout');
    dropToken();
  },
);

export default checkLogin;
