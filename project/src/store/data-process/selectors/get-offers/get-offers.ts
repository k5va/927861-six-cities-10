import {NameSpace} from '../../../../const';
import {Offer, State} from '../../../../types';

const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export default getOffers;
