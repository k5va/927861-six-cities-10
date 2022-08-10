import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import updateFavorites from './update-favorites';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute, FavoritesOperation} from '../../../const';
import {mockOffer} from '../../../mocks';

describe('Tests of updateFavorites action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be updateFavorites.fulfilled when server returns 200', async () => {
    const store = mockStore();
    const offer = mockOffer();
    const token = 'FAKE_TOKEN';

    mockAPI
      .onPost(`${ApiRoute.Favorites}/${offer.id}/${FavoritesOperation.Add}`)
      .reply(StatusCodes.OK, {...offer, isFavorite: true});

    Storage.prototype.getItem = jest.fn(() => token);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(updateFavorites({offerId: offer.id, isFavorite: true}));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      updateFavorites.pending.type,
      updateFavorites.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
  });
});
