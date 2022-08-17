import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus, NameSpace, AppStatus, AppRoute} from '../../const';
import {State} from '../../types';
import {mockOffers, mockUser} from '../../mocks';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {Favorites} from '../../pages';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../../components';
import {Route, Routes} from 'react-router-dom';

const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const user = mockUser();

describe('Favorites page test', () => {
  it('should render correctly with no data', () => {
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
      [NameSpace.Data]: {appStatus: AppStatus.Ready, favorites: [], offers: []},
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<Favorites />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i))
      .toBeInTheDocument();
  });

  it('should render correcty with data', () => {
    const favorites = mockOffers().map((offer) => ({...offer, isFavorite: true}));
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
      [NameSpace.Data]: {
        appStatus: AppStatus.Ready, favorites, offers: favorites
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<Favorites />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(user.email as string, 'i'))).toBeInTheDocument();
    for (const offer of favorites) {
      expect(screen.getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    }
  });
});
