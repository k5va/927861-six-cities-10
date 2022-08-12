import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, Header} from '../../components';
import {AuthStatus, NameSpace} from '../../const';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';
import {mockOffers, mockUser} from '../../mocks';

const mockStore = configureMockStore<State>();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const offers = mockOffers().map((offer) => ({...offer, isFavorite: true}));
    const user = mockUser();

    const store = mockStore({
      [NameSpace.Data]: {offers},
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${user.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${offers.length}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
