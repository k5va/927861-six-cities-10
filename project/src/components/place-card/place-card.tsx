import {Link} from 'react-router-dom';
import {PlaceCardProps} from './types';

function PlaceCard({offer, mode, onMouseOver}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, title, price, type} = offer;

  return (
    <article
      className={`${mode}__card place-card`}
      onMouseOver={() => onMouseOver?.(offer)}
    >
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> :
          null
      }
      <div className={`${mode}__image-wrapper place-card__image-wrapper`}>
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </a>
      </div>
      <div className={`${mode}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
