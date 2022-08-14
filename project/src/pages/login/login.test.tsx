import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus, NameSpace, AppRoute} from '../../const';
import {State} from '../../types';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../api';
import {Action} from '@reduxjs/toolkit';
import {Login} from '../../pages';
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

describe('Login page test', () => {
  it('should render correctly when not Auth', () => {
    const store = mockStore({
      [NameSpace.User]: {authStatus: AuthStatus.NoAuth},
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<Login />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
