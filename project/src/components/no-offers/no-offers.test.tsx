import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, NoOffers} from '../../components';
import {Cities} from '../../const';

describe('Component: NoOffers', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NoOffers city={Cities.Amsterdam} />
      </HistoryRouter>,
    );

    const paragraphElement = screen.getByText(
      `We could not find any property available at the moment in ${Cities.Amsterdam}`
    );

    expect(paragraphElement).toBeInTheDocument();
  });
});
