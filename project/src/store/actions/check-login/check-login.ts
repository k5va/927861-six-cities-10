import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthStatus} from '../../../const';
import {AppDispatch, JSONValue, State} from '../../../types';
import {parseUser} from '../../../utils';
import {setAuthStatus, setUser} from '../../actions';

/**
 * Action for login
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
  'app/checkLogin',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<JSONValue>('/login');
    dispatch(setAuthStatus({status: AuthStatus.Auth}));
    dispatch(setUser({user: parseUser(data)}));
  },
);

export default checkLogin;
