import {NameSpace, AuthStatus} from '../../../../const';
import {State} from '../../../../types';

const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;

export default getAuthStatus;
