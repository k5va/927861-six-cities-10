import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {api} from '../../../api';
import {State} from '../../../types';
import login from './login';
import {StatusCodes} from 'http-status-codes';
import {ApiRoute, AUTH_TOKEN_KEY_NAME} from '../../../const';
import {mockUser} from '../../../mocks';

describe('Tests of login action', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should be login.fulfilled when server returns 200', async () => {
    const store = mockStore();
    const user = mockUser();
    const token = 'FAKE_TOKEN';

    mockAPI
      .onPost(ApiRoute.Login)
      .reply(StatusCodes.OK, {...user, token});

    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(login({email: user.email as string, password: 'FAKE_PASSWORD'}));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      login.pending.type,
      login.fulfilled.type
    ]);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, token);
  });
});
