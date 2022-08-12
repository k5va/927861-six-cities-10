import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import loadCurrentOffer from './load-current-offer';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute} from '../../../const';
import {mockId, mockOffer, mockOffers, mockReviews} from '../../../mocks';

describe('Tests of loadCurrentOffer action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be loadCurrentOffer.fulfilled when server returns 200', async () => {
    const store = mockStore();
    const offerId = mockId();

    mockAPI
      .onGet(`${ApiRoute.Offers}/${offerId}`)
      .reply(StatusCodes.OK, mockOffer())
      .onGet(`${ApiRoute.Offers}/${offerId}${ApiRoute.Near}`)
      .reply(StatusCodes.OK, mockOffers())
      .onGet(`${ApiRoute.Reviews}/${offerId}`)
      .reply(StatusCodes.OK, mockReviews());

    Storage.prototype.getItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadCurrentOffer({offerId}));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      loadCurrentOffer.pending.type,
      loadCurrentOffer.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(3);
  });
});
