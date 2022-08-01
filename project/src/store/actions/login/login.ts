import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {saveToken} from '../../../api';
import {AuthStatus} from '../../../const';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseUser} from '../../../utils';
import {setAuthStatus, setUser} from '../../actions';

/**
 * Action for login
 * @param {string} type - action type
 * @param {AsyncThunkPayloadCreator} payloadCreator - action callback
 */
const login = createAsyncThunk<
  void, // action callback return value type
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
  'app/login',
  async (args, {dispatch, extra: api}) => {
    const {data} = await api.post<JSONValue>('/login', args);
    dispatch(setAuthStatus({status: AuthStatus.Auth}));
    dispatch(setUser({user: parseUser(data)}));
    saveToken(data['token'] as string);
  },
);

export default login;
