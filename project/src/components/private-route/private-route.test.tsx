import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus, AppRoute, NameSpace, AppStatus, ApiRoute} from '../../const';
import {HistoryRouter, PrivateRoute} from '../../components';
import {State} from '../../types';
import {mockUser} from '../../mocks';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {StatusCodes} from 'http-status-codes';
import {Route, Routes } from 'react-router-dom';
import {Favorites, Login} from '../../pages';

const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const user = mockUser();

describe('PrivateRoute test', () => {
  it('should render Login when not authenticated user navigate to "/favorite"', () => {
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.NoAuth, user},
      [NameSpace.Data]: {appStatus: AppStatus.Ready},
    });

    const history = createMemoryHistory();
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute status={[AuthStatus.NoAuth, AuthStatus.Unknown]} to={AppRoute.Root}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute status={AuthStatus.Auth} to={AppRoute.Login}>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render Favorites when Auth user navigate to "/favorite"', () => {
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
      [NameSpace.Data]: {
        appStatus: AppStatus.Ready, favorites: [], offers: []
      },
    });

    const history = createMemoryHistory();
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute status={AuthStatus.Auth} to={AppRoute.Login}>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    mockAPI
      .onGet(ApiRoute.Favorites)
      .reply(StatusCodes.OK, []);

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
