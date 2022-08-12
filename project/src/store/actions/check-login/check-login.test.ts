import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import checkLogin from './check-login';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute} from '../../../const';

describe('Tests of checkLogin action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be checkLogin.fulfilled when server returns 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(StatusCodes.OK, []);

    Storage.prototype.getItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkLogin());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkLogin.pending.type,
      checkLogin.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
  });

  it('Should be checkLogin.rejected when server returns 401', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(StatusCodes.UNAUTHORIZED, []);

    Storage.prototype.getItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkLogin());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkLogin.pending.type,
      checkLogin.rejected.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
  });
});
