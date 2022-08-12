import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, OffersSorting} from '../../components';
import {OffersSortingType} from '../../const';

describe('Component: OffersSorting', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const onSortingChange = jest.fn();

    render(
      <HistoryRouter history={history}>
        <OffersSorting sorting={OffersSortingType.Popular} onSortingChange={onSortingChange} />
      </HistoryRouter>
    );

    for (const sorting of Object.values(OffersSortingType)) {
      expect(screen.getAllByText(new RegExp(sorting, 'i')).length).toBeGreaterThan(0);
    }
  });

  it('Should change sorting', async () => {
    const history = createMemoryHistory();
    const onSortingChange = jest.fn();

    render(
      <HistoryRouter history={history}>
        <OffersSorting sorting={OffersSortingType.Popular} onSortingChange={onSortingChange} />
      </HistoryRouter>
    );

    await screen.getAllByRole('listitem')[Object.keys(OffersSortingType).length - 1]?.click();
    expect(onSortingChange).toBeCalled();
  });
});
