import {NameSpace} from '../../../../const';
import {Offer, State} from '../../../../types';

const getNearOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export default getNearOffers;
