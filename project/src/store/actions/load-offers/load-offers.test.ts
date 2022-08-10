import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import loadOffers from './load-offers';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute} from '../../../const';
import {mockOffers} from '../../../mocks';

describe('Tests of loadOffers action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be loadOffers.fulfilled when server returns 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiRoute.Offers)
      .reply(StatusCodes.OK, mockOffers());

    Storage.prototype.getItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOffers());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      loadOffers.pending.type,
      loadOffers.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
  });
});
