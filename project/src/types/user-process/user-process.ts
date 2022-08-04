import {AuthStatus} from '../../const';
import User from '../user/user';

type UserProcess = {
  authStatus: AuthStatus,
  user: User | null,
};

export default UserProcess;
