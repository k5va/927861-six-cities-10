import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {saveToken} from '../../../api';
import { ApiRoute } from '../../../const';
import {AppDispatch, JSONValue, State, User} from '../../../types';
import {parseUser} from '../../../utils';

/**
 * Action for login
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const login = createAsyncThunk<
  User, // action callback return value type
  { // _arg type
    email: string,
    password: string,
  },
  { // thunkAPI params types
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/login',
  async (args, {extra: api}) => {
    const {data} = await api.post<JSONValue>(ApiRoute.Login, args);
    saveToken(data['token'] as string);
    return parseUser(data);
  },
);

export default login;
