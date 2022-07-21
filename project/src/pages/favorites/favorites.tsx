import {Header, PlaceCard, SVGSymbols} from '../../components';
import {PlaceCardMode} from '../../const';
import {createOffersCityMap} from '../../utils';
import {FavoritesProps} from './types';

function Favorites({offers}: FavoritesProps): JSX.Element {
  const offersCityMap = createOffersCityMap(offers);

  return (
    <>
      <SVGSymbols />

      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  [...offersCityMap.keys()].map((city) => (
                    <li key={city.name} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="/">
                            <span>{city.name}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {
                          offersCityMap.get(city)?.map(
                            (offer) =>
                              <PlaceCard key={offer.id} offer={offer} mode={PlaceCardMode.Favorites} />
                          )
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    </>
  );
}

export default Favorites;
