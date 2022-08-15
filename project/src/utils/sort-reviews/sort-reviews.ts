import {Review} from '../../types';

/**
 * Sorts reviews by date
 * @param reviews - array of reviews
 * @returns sorted arrat of reviews
 */
const sortReviews = (reviews: Review[]): Review[] =>
  [...reviews].sort((r1, r2) => Date.parse(r2.date) - Date.parse(r1.date));

export default sortReviews;
