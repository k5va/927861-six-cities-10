import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import logout from './logout';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute, AUTH_TOKEN_KEY_NAME} from '../../../const';
import loadOffers from '../load-offers/load-offers';

describe('Tests of logout action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be logout.fulfilled when server returns 200', async () => {
    const store = mockStore();

    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(StatusCodes.NO_CONTENT);

    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logout());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      logout.pending.type,
      loadOffers.pending.type,
      logout.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
