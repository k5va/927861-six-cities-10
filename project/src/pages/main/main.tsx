import {MainProps} from './types';
import {Header, SVGSymbols, CitiesList, CityOffers} from '../../components';
import {createOffersCityMap} from '../../utils';

function Main({offers}: MainProps): JSX.Element {
  const offersCityMap = createOffersCityMap(offers);
  const cities = [...offersCityMap.keys()];

  return (
    <>
      <SVGSymbols />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList />
          <CityOffers city={cities[0]} offers={offers}/>
        </main>
      </div>
    </>
  );
}

export default Main;
