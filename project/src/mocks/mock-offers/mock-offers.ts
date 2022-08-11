import {datatype} from 'faker';
import {mockOffer} from '..';

const MIN_OFFERS_NUM = 2;
const MAX_OFFERS_NUM = 10;

const mockOffers = () => Array.from(
  new Array(datatype.number({min: MIN_OFFERS_NUM, max: MAX_OFFERS_NUM})),
  mockOffer
);

export default mockOffers;
