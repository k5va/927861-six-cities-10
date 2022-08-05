import {AuthStatus} from '../../const';
import User from '../user/user';

type UserState = {
  authStatus: AuthStatus,
  user: User | null,
};

export default UserState;
