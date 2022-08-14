import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus, NameSpace, AppStatus, AppRoute} from '../../const';
import {State} from '../../types';
import {mockOffer, mockOffers, mockReviews, mockUser} from '../../mocks';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {Room} from '../../pages';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../../components';
import {Route, Routes} from 'react-router-dom';

const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const user = mockUser();

describe('Room page test', () => {
  it('should render correcty with data', () => {
    const nearOffers = mockOffers();
    const currentOffer = mockOffer();
    const reviews = mockReviews();
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth, user},
      [NameSpace.Data]: {
        appStatus: AppStatus.Ready, nearOffers, currentOffer, reviews,
        offers: mockOffers()
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Room}
              element={<Room />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(`/offer/${currentOffer.id}`);

    render(fakeApp);

    expect(screen.getByText(new RegExp(currentOffer.title, 'i'))).toBeInTheDocument();
    for (const offer of nearOffers) {
      expect(screen.getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    }
  });
});
