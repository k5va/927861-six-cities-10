import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus, AppRoute, NameSpace, AppStatus, Cities, ApiRoute} from '../../const';
import {App, HistoryRouter} from '../../components';
import {State} from '../../types';
import {mockOffer, mockOffers, mockReviews, mockUser} from '../../mocks';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {StatusCodes} from 'http-status-codes';

const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const user = mockUser();
const offer = mockOffer();

const store = mockStore({
  [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
  [NameSpace.Data]: {
    appStatus: AppStatus.Ready,
    offers: [], favorites: [], currentOffer: offer,
    nearOffers: [], reviews: []
  },
  [NameSpace.App]: {city: Cities.Amsterdam},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Main when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render Room when user navigate to "/offer"', () => {
    const offerId = offer.id;
    mockAPI
      .onGet(`${ApiRoute.Offers}/${offerId}`)
      .reply(StatusCodes.OK, mockOffer())
      .onGet(`${ApiRoute.Offers}/${offerId}/${ApiRoute.Near}`)
      .reply(StatusCodes.OK, mockOffers())
      .onGet(`${ApiRoute.Reviews}/${offerId}`)
      .reply(StatusCodes.OK, mockReviews());

    history.push(`/offer/${offerId}`);

    render(fakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render Favorites when user navigate to "/favorite"', () => {
    mockAPI
      .onGet(ApiRoute.Favorites)
      .reply(StatusCodes.OK, []);

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render NotFound when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
