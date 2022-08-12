import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import postReview from './post-review';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute} from '../../../const';
import {mockId, mockReview, mockReviews} from '../../../mocks';

describe('Tests of postReview action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be postReview.fulfilled when server returns 200', async () => {
    const store = mockStore();
    const review = mockReview();
    const offerId = mockId();
    const token = 'FAKE_TOKEN';

    mockAPI
      .onPost(`${ApiRoute.Reviews}/${offerId}`)
      .reply(StatusCodes.OK, review)
      .onGet(`${ApiRoute.Reviews}/${offerId}`)
      .reply(StatusCodes.OK, mockReviews());

    Storage.prototype.getItem = jest.fn(() => token);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReview({offerId, comment: review.comment, rating: review.rating}));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      postReview.pending.type,
      postReview.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(2);
  });
});
