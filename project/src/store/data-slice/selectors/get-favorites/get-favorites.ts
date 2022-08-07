import {NameSpace} from '../../../../const';
import {Offer, State} from '../../../../types';

const getFavorites = (state: State): Offer[] => state[NameSpace.Data].favorites;

export default getFavorites;
