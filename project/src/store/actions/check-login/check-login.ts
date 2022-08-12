import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute} from '../../../const';
import {AppDispatch, JSONValue, State, User} from '../../../types';
import {parseUser} from '../../../utils';

/**
 * Action for login
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const checkLogin = createAsyncThunk<
  User, // action callback return value type
  undefined, // _arg type
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/checkLogin',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<JSONValue>(ApiRoute.Login);
    return parseUser(data);
  },
);

export default checkLogin;
