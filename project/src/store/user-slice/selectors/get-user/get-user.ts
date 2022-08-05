import {NameSpace} from '../../../../const';
import {State, User} from '../../../../types';

const getUser = (state: State): User | null => state[NameSpace.User].user;

export default getUser;
