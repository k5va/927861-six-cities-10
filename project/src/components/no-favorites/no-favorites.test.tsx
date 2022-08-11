import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, NoFavorites} from '../../components';

describe('Component: NoFavorites', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NoFavorites />
      </HistoryRouter>,
    );

    const textElement = screen.getByText('Nothing yet saved.');

    expect(textElement).toBeInTheDocument();
  });
});
