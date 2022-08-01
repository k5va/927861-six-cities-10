import {PrivateRouteProps} from './types';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

function PrivateRoute({children, status, to}: PrivateRouteProps): JSX.Element {
  const {authStatus} = useAppSelector((state) => state);

  if (Array.isArray(status)) {
    return status.some((item) => item === authStatus) ? children : <Navigate to={to} />;
  }

  return authStatus === status ? children : <Navigate to={to} />;
}

export default PrivateRoute;
