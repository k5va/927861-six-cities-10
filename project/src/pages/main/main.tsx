import {Header, SVGSymbols, CitiesList, CityOffers} from '../../components';
import {useAppSelector} from '../../hooks';
import {findCityOffers} from '../../utils';

function Main(): JSX.Element {
  const {offers, city} = useAppSelector((state) => state);
  const cityOffers = findCityOffers(city, offers);

  return (
    <>
      <SVGSymbols />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList />
          {cityOffers.length && <CityOffers offers={cityOffers}/>}
        </main>
      </div>
    </>
  );
}

export default Main;
