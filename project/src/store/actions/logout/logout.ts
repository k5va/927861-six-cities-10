import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthStatus} from '../../../const';
import {AppDispatch, State} from '../../../types';
import {setAuthStatus, setUser} from '../../actions';

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
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dispatch(setAuthStatus({status: AuthStatus.NoAuth}));
    dispatch(setUser({user: null}));
  },
);

export default checkLogin;
