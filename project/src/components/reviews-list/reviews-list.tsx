import {ReviewCard} from '../../components';
import {useAppSelector} from '../../hooks';
import {getReviews} from '../../store/selectors';

function ReviewsList(): JSX.Element {
  const reviews = useAppSelector(getReviews);

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
