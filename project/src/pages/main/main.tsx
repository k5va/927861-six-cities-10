import {Header, SVGSymbols, CitiesList, CityOffers, NoOffers, Spinner} from '../../components';
import {AppStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAppStatus, getCity, getOffers} from '../../store/selectors';
import {findCityOffers} from '../../utils';

function Main(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const appStatus = useAppSelector(getAppStatus);
  const cityOffers = findCityOffers(city, offers);

  return (
    <>
      <SVGSymbols />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          {appStatus === AppStatus.Pending && <Spinner />}
          <CitiesList />
          {cityOffers.length ? <CityOffers offers={cityOffers} /> : <NoOffers city={city} />}
        </main>
      </div>
    </>
  );
}

export default Main;
