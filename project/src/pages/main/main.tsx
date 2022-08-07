import {Header, SVGSymbols, CitiesList, CityOffers, Spinner} from '../../components';
import {AppStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAppStatus} from '../../store/selectors';

function Main(): JSX.Element {
  const appStatus = useAppSelector(getAppStatus);

  if (appStatus === AppStatus.Pending) {
    return <Spinner />;
  }

  return (
    <>
      <SVGSymbols />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList />
          <CityOffers />
        </main>
      </div>
    </>
  );
}

export default Main;
