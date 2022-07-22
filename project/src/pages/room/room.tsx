import {RoomProps} from './types';
import {useParams} from 'react-router-dom';
import {OfferCardMode} from '../../const';
import {NotFound} from '../../pages';
import {Header, Map, OffersList, ReviewsForm,
  ReviewsList, SVGSymbols, Rating} from '../../components';

function Room({offers}: RoomProps): JSX.Element {
  const params = useParams();
  const offer = offers.find(({id}) => id === Number(params.id));
  const nearOffers = offers.slice(1, 4); // TODO: temporary!

  if (!offer) {
    return <NotFound />;
  }

  const {title, isPremium, rating, type, maxAdults,
    bedrooms, price, host, goods, description} = offer;

  return (
    <>
      <SVGSymbols />
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.map((src) =>
                  (
                    <div key={src} className="property__image-wrapper">
                      <img className="property__image" src={src} alt={offer.title} />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  isPremium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <Rating rate={offer.rating} />
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper"
                    >
                      <img className="property__avatar user__avatar"
                        src={host.avatarUrl} width="74" height="74" alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    <span className="property__user-status">{host.isPro && 'Pro'}</span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                    <p className="property__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList />
                  <ReviewsForm />
                </section>
              </div>
            </div>
            <Map
              city={offer.city}
              offers={[offer, ...nearOffers]}
              selectedOffer={offer}
              mode={'property'}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList offers={nearOffers} mode={OfferCardMode.Near} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Room;
