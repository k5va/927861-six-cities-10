import {AppStatus, NameSpace} from '../../../../const';
import {State} from '../../../../types';

const getAppStatus = (state: State): AppStatus => state[NameSpace.Data].appStatus;

export default getAppStatus;
