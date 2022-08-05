import {Link} from 'react-router-dom';
import {Header, OffersList, SVGSymbols} from '../../components';
import {AppRoute, OfferCardMode} from '../../const';
import {useAppSelector} from '../../hooks';
import {getFavorites} from '../../store/selectors';
import {Offer} from '../../types';
import {createOffersCityMap} from '../../utils';

function Favorites(): JSX.Element {
  const offers = useAppSelector(getFavorites);
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
                  [...offersCityMap.keys()].map((cityName) => (
                    <li key={cityName} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link to={AppRoute.Root} className="locations__item-link">
                            <span>{cityName}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {
                          offersCityMap.has(cityName) &&
                            <OffersList
                              offers={offersCityMap.get(cityName) as Offer[]}
                              mode={OfferCardMode.Favorites}
                            />
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
