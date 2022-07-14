import {AuthStatus, AppRoute} from '../../const';
import {PrivateRouteProps} from './types';
import {Navigate} from 'react-router-dom';

function PrivateRoute({authStatus, children}: PrivateRouteProps): JSX.Element {
  return authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
