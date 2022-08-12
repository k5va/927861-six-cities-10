import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, Map} from '../../components';
import {OfferCardMode} from '../../const';
import {mockCity, mockOffers} from '../../mocks';

describe('Component: Map', () => {
  it('should render all given offers to markers', () => {
    const offers = mockOffers();
    const city = mockCity();

    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Map city={city} offers={offers} selectedOffer={null} mode={OfferCardMode.Cities} />
      </HistoryRouter>
    );

    expect(screen.getAllByAltText(/marker/i).length).toEqual(offers.length);
  });
});
