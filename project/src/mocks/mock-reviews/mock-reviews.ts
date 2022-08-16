import {datatype} from 'faker';
import {mockReview} from '..';

const MAX_REVIEWS_NUM = 10;
const MIN_REVIEWS_NUM = 2;

const mockReviews = () => Array.from(
  new Array(datatype.number({min: MIN_REVIEWS_NUM, max: MAX_REVIEWS_NUM})),
  mockReview
);

export default mockReviews;
