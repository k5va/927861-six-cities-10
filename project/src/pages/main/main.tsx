import {Header, SVGSymbols, CitiesList, CityOffers} from '../../components';

function Main(): JSX.Element {
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
