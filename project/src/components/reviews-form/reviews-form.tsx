import React, {ChangeEvent, useState} from 'react';
import {ReviewRate} from '../../const';
import {api} from '../../store';
import {ReviewsFormProps} from './types';

function ReviewsForm({offerId}: ReviewsFormProps): JSX.Element {
  const [text, setText] = useState('');
  const [currentRate, setRate] = useState(ReviewRate.get('terribly') as number);

  const onRateChange = (evt: ChangeEvent<HTMLInputElement>) => setRate(Number(evt.target.value));
  const onTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setText(evt.target.value);

  const postReview = async (comment: string, rating: number) => {
    await api.post(`/comments/${offerId}`, {comment, rating});
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        postReview(text, currentRate);
      }}
      className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[...ReviewRate.entries()].map(([title, rate]) => (
          <React.Fragment key={rate}>
            <input
              onChange={onRateChange}
              checked={currentRate === rate}
              value={rate}
              id={`${rate}-stars`}
              className="form__rating-input visually-hidden" name="rating" type="radio"
            />
            <label
              htmlFor={`${rate}-stars`}
              title={title}
              className="reviews__rating-label form__rating-label"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        value={text}
        onChange={onTextChange}
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
