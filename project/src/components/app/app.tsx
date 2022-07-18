import {AppProps} from './types';
import {Favorites, Login, Main, NotFound, Room} from '../../pages';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {PrivateRoute} from '../../components';

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main offers={offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<Room offers={offers}/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
