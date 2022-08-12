import {AuthStatus} from '../../const';
import {UserState} from '../../types';
import {userSlice} from './user-slice';
import {checkLogin, login, logout} from '../actions';
import {mockUser} from '../../mocks';

describe('Tests of user slice reducer', () => {
  it('checkLogin.fulfilled should set user and AuthStatus.Auth', async () => {

    const user = mockUser();

    const state: UserState = {
      user: null,
      authStatus: AuthStatus.Unknown,
    };
    expect(userSlice.reducer(state, {type: checkLogin.fulfilled.type, payload: user}))
      .toEqual({
        user,
        authStatus: AuthStatus.Auth,
      });
  });

  it('checkLogin.rejected should set user and AuthStatus.NoAuth', async () => {
    const state: UserState = {
      user: null,
      authStatus: AuthStatus.Unknown,
    };

    expect(userSlice.reducer(state, {type: checkLogin.rejected.type}))
      .toEqual({
        user: null,
        authStatus: AuthStatus.NoAuth,
      });
  });

  it('login.fulfilled should set user and AuthStatus.Auth', async () => {

    const user = mockUser();

    const state: UserState = {
      user: null,
      authStatus: AuthStatus.Unknown,
    };
    expect(userSlice.reducer(state, {type: login.fulfilled.type, payload: user}))
      .toEqual({
        user,
        authStatus: AuthStatus.Auth,
      });
  });

  it('login.rejected should set user and AuthStatus.NoAuth', async () => {
    const state: UserState = {
      user: null,
      authStatus: AuthStatus.Unknown,
    };

    expect(userSlice.reducer(state, {type: login.rejected.type}))
      .toEqual({
        user: null,
        authStatus: AuthStatus.NoAuth,
      });
  });

  it('logout.fulfilled should set user = null and AuthStatus.NoAuth', async () => {

    const user = mockUser();

    const state: UserState = {
      user,
      authStatus: AuthStatus.Auth,
    };
    expect(userSlice.reducer(state, {type: logout.fulfilled.type}))
      .toEqual({
        user: null,
        authStatus: AuthStatus.NoAuth,
      });
  });
});
