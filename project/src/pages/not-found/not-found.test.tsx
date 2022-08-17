import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthStatus, NameSpace} from '../../const';
import {State} from '../../types';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {NotFound} from '../../pages';
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

describe('NotFound page test', () => {
  it('should render correctly when redirected to false page', () => {
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.Auth},
      [NameSpace.Data]: {offers: []}
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.NotFound}
              element={<NotFound />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push('/some unknown path');

    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
