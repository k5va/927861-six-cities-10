import {Link} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {useAppDispatch, useAppSelector, useFavoritesCount} from '../../hooks';
import {getAuthStatus, getUser} from '../../store/selectors';
import {logout} from '../../store';

function Header(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const user = useAppSelector(getUser);
  const favoritesCount = useFavoritesCount();
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo"
                width="81" height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus !== AuthStatus.Auth ?
                <li className="header__nav-item user">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li> :
                <>
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{user?.email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      to={AppRoute.Root}
                      onClick={() => dispatch(logout())}
                      className="header__nav-link"
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
