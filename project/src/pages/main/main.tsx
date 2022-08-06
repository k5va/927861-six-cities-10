import {useEffect} from 'react';
import {Header, SVGSymbols, CitiesList, CityOffers, Spinner} from '../../components';
import {AppStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loadOffers} from '../../store';
import {getAppStatus} from '../../store/selectors';

function Main(): JSX.Element {
  const appStatus = useAppSelector(getAppStatus);
  const dispatch = useAppDispatch();

  // effect for loading offers
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

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
