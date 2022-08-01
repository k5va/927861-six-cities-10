import {AppRoute, AuthStatus} from '../../const';

type PrivateRouteProps = {
  status: AuthStatus | AuthStatus[];
  to: AppRoute;
  children: JSX.Element;
}

export type {PrivateRouteProps};
