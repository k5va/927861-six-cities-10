import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import loadFavorites from './load-favorites';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute} from '../../../const';
import {mockOffers} from '../../../mocks';

describe('Tests of loadFavorites action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be loadFavorites.fulfilled when server returns 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiRoute.Favorites)
      .reply(StatusCodes.OK, mockOffers());

    Storage.prototype.getItem = jest.fn(() => 'FAKE_TOKEN');

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadFavorites());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      loadFavorites.pending.type,
      loadFavorites.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
  });
});
