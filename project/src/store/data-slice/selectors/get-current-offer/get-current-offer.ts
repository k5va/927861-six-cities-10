import {NameSpace} from '../../../../const';
import {Offer, State} from '../../../../types';

const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;

export default getCurrentOffer;
