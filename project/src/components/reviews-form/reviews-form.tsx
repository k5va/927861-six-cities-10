import React, {ChangeEvent, useState} from 'react';
import {AppStatus, ReviewLength, ReviewRate} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {postReview} from '../../store';
import {getAppStatus} from '../../store/selectors';
import {ReviewsFormProps} from './types';

const DEFAULT_RATE = ReviewRate.get('terribly') as number;
const DEFAULT_TEXT = '';

function ReviewsForm({offerId}: ReviewsFormProps): JSX.Element {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [currentRate, setRate] = useState(DEFAULT_RATE);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(getAppStatus);

  const rateChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => setRate(Number(evt.target.value));
  const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => setText(evt.target.value);
  const resetForm = () => {
    if (text !== DEFAULT_TEXT) {
      setText(DEFAULT_TEXT);
    }
    if (currentRate !== DEFAULT_RATE) {
      setRate(DEFAULT_RATE);
    }
  };

  if (appStatus === AppStatus.Ready && wasSubmitted) { // clear form fields
    resetForm();
    setWasSubmitted(false);
  }

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        setWasSubmitted(true);
        dispatch(postReview({offerId: offerId, comment: text, rating: currentRate}));
      }}
      className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[...ReviewRate.entries()].map(([title, rate]) => (
          <React.Fragment key={rate}>
            <input
              onChange={rateChangeHandler}
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
        onChange={textChangeHandler}
        minLength={ReviewLength.Min}
        maxLength={ReviewLength.Max}
        disabled={appStatus === AppStatus.Pending}
        required
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount"> {ReviewLength.Min} characters</b>.
        </p>
        <button
          disabled={
            text.length < ReviewLength.Min
            || text.length > ReviewLength.Max
            || appStatus === AppStatus.Pending
          }
          className="reviews__submit form__submit button"
          type="submit"
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
