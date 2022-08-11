import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, OffersList} from '../../components';
import {AuthStatus, NameSpace, OfferCardMode} from '../../const';
import {mockOffers} from '../../mocks';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';

const mockStore = configureMockStore<State>();
const store = mockStore({
  [NameSpace.User]: {authStatus: AuthStatus.Auth},
});

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offers = mockOffers();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersList offers={offers} mode={OfferCardMode.Cities} />
        </HistoryRouter>
      </Provider>
    );

    for (const offer of offers) {
      expect(screen.getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    }
  });
});
