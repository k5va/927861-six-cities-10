import {Favorites, Login, Main, NotFound, Room} from '../../pages';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {PrivateRoute, Spinner} from '../../components';
import {useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/selectors';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Main />}
      />
      <Route
        path={AppRoute.Login}
        element={
          <PrivateRoute status={[AuthStatus.NoAuth, AuthStatus.Unknown]} to={AppRoute.Root}>
            <Login />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute status={AuthStatus.Auth} to={AppRoute.Login}>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Room}
        element={<Room />}
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
