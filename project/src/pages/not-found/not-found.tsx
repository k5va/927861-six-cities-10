import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo"
                  width="81" height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className='login__title'>404 Not Found</h1>
      </main>
    </div>
  );
}

export default NotFound;
