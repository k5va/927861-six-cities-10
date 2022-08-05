import {Cities, NameSpace} from '../../../../const';
import {State} from '../../../../types';

const getCity = (state: State): Cities => state[NameSpace.App].city;

export default getCity;
