import {Header, SVGSymbols} from '../../components';

function NotFound(): JSX.Element {
  return (
    <>
      <SVGSymbols />
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className='login__title'>404 Not Found</h1>
        </main>
      </div>
    </>
  );
}

export default NotFound;
