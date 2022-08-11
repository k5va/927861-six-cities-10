import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, OfferCard} from '../../components';
import {AuthStatus, NameSpace, OfferCardMode} from '../../const';
import {mockOffer} from '../../mocks';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';

const mockStore = configureMockStore<State>();
const store = mockStore({
  [NameSpace.User]: {authStatus: AuthStatus.Auth},
});

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = mockOffer();
    offer.isPremium = true;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCard offer={offer} mode={OfferCardMode.Cities} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(offer.price), 'i'))).toBeInTheDocument();
  });
});
