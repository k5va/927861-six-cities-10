import {AuthStatus} from '../../const';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

export type {PrivateRouteProps};
