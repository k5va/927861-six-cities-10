import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, CityOffers} from '../../components';
import {AppStatus, AuthStatus, Cities, NameSpace} from '../../const';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';
import {mockOffers} from '../../mocks';

const mockStore = configureMockStore<State>();

describe('Component: CityOffers', () => {
  it('should render correctly', () => {
    const offers = mockOffers();
    offers.forEach((offer) => {offer.city.name = Cities.Amsterdam;});

    const store = mockStore({
      [NameSpace.Data]: {offers, appStatus: AppStatus.Ready},
      [NameSpace.App]: {city: Cities.Amsterdam},
      [NameSpace.User]: {authStatus: AuthStatus.Auth},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOffers />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${offers.length} places to stay in ${Cities.Amsterdam}`, 'i')))
      .toBeInTheDocument();
  });

  it('should render NoOffers correctly', () => {

    const store = mockStore({
      [NameSpace.Data]: {offers: [], appStatus: AppStatus.Ready},
      [NameSpace.App]: {city: Cities.Amsterdam},
      [NameSpace.User]: {authStatus: AuthStatus.Auth},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOffers />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(
      new RegExp(`We could not find any property available at the moment in ${Cities.Amsterdam}`, 'i')))
      .toBeInTheDocument();
  });
});
