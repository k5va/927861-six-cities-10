import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, CitiesList} from '../../components';
import {Cities, NameSpace} from '../../const';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';

const mockStore = configureMockStore<State>();
const store = mockStore({
  [NameSpace.App]: {city: Cities.Amsterdam},
});

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>
    );

    for (const city of Object.values(Cities)) {
      expect(screen.getByText(new RegExp(city, 'i'))).toBeInTheDocument();
    }
  });
});
