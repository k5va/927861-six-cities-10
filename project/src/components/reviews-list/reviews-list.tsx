import {reviews} from '../../mocks';
import {ReviewCard} from '../../components';

function ReviewsList(): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
      </ul>
    </>
  );
}

export default ReviewsList;
