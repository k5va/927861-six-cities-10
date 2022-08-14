import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus, NameSpace, AppStatus, AppRoute, Cities} from '../../const';
import {State} from '../../types';
import {mockOffers, mockUser} from '../../mocks';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {Main} from '../../pages';
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

describe('Main page test', () => {
  it('should render correctly with no data', () => {
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
      [NameSpace.Data]: {appStatus: AppStatus.Ready, offers: []},
      [NameSpace.App]: {city: Cities.Amsterdam},
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Main />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(user.email as string, 'i'))).toBeInTheDocument();
  });

  it('should render correcty with data', () => {
    const offers = mockOffers().map((offer) =>
      ({...offer, city: {...offer.city, name: Cities.Amsterdam}}));
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
      [NameSpace.Data]: {appStatus: AppStatus.Ready, offers},
      [NameSpace.App]: {city: Cities.Amsterdam},
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Main />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/places to stay in Amsterdam/i)).toBeInTheDocument();
  });
});
