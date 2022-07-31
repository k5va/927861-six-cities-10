import {AuthStatus, AppRoute} from '../../const';
import {PrivateRouteProps} from './types';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const {authStatus} = useAppSelector((state) => state);

  return authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
