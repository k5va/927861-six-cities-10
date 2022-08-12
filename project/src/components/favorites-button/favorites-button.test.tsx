import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {HistoryRouter, FavoritesButton} from '../../components';
import {AppRoute, AuthStatus, NameSpace} from '../../const';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';
import {mockOffer} from '../../mocks';

const mockStore = configureMockStore<State>();

describe('Component: FavoritesButton', () => {
  it('should render correctly', () => {
    const offer = mockOffer();
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesButton offerId={offer.id} isFavorite={offer.isFavorite}
            width="10" height="10" className='test'
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should navigate to Login if not Auth', async () => {
    const offer = mockOffer();
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.NoAuth},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesButton offerId={offer.id} isFavorite={offer.isFavorite}
            width="10" height="10" className='test'
          />
        </HistoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toEqual(AppRoute.Login);
  });

  it('Should dispatch updateFavorites', async () => {
    const offer = mockOffer();
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth},
    });
    store.dispatch = jest.fn();
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesButton offerId={offer.id} isFavorite={offer.isFavorite}
            width="10" height="10" className='test'
          />
        </HistoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(store.dispatch).toBeCalled();
  });
});
