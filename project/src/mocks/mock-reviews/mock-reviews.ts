import {datatype} from 'faker';
import {mockReview} from '..';

const MAX_REVIEWS_NUM = 10;

const mockReviews = () => Array.from(new Array(datatype.number(MAX_REVIEWS_NUM)), mockReview);

export default mockReviews;
