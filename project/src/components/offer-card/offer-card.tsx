import {Link} from 'react-router-dom';
import {Rating, FavoritesButton} from '../../components';
import {OfferCardProps} from './types';
import {memo} from 'react';
import {OfferTypeDisplay} from '../../const';

function OfferCard({offer, mode, onSelected}: OfferCardProps): JSX.Element {
  const {id, isFavorite, isPremium, previewImage, title, price, type, rating} = offer;

  return (
    <article
      className={`${mode}__card place-card`}
      onMouseOver={() => onSelected?.(true, offer)}
      onMouseLeave={() => onSelected?.(false, offer)}
    >
      {
        isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }
      <div className={`${mode}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className={`${mode}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton
            offerId={id} isFavorite={isFavorite}
            className="place-card__bookmark" width="18" height="19"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <Rating rate={rating} />
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{OfferTypeDisplay[type]}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard);
