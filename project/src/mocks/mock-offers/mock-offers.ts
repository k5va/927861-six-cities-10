import {datatype} from 'faker';
import {mockOffer} from '..';

const MAX_OFFERS_NUM = 10;

const mockOffers = () => Array.from(new Array(datatype.number(MAX_OFFERS_NUM)), mockOffer);

export default mockOffers;
