import {useEffect, useState} from 'react';
import {ReviewCard} from '../../components';
import {api} from '../../store';
import {JSONValue, Review} from '../../types';
import {parseReview} from '../../utils';
import {ReviewsListProps} from './types';

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const [reviews, setReviews] = useState<Review[]>([]);

  // effect for loading reviews
  useEffect(() => {
    const loadReviews = async () => {
      const {data} = await api.get<JSONValue[]>(`/comments/${offerId}`);
      setReviews(data.map(parseReview));
    };

    loadReviews();
  }, [offerId]);

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
