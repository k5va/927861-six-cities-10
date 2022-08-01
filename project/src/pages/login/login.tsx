import {useState} from 'react';
import {SVGSymbols} from '../../components';
import {useAppDispatch} from '../../hooks';
import {login} from '../../store/actions';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  return (
    <>
      <SVGSymbols />
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                onSubmit={(evt) => {
                  evt.preventDefault();
                  dispatch(login({email, password}));
                }}
                className="login__form form" action="#" method="post"
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    value={email}
                    onChange={({target}) => setEmail(target.value)}
                    className="login__input form__input" type="email" name="email"
                    placeholder="Email" required
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    className="login__input form__input" type="password" name="password"
                    placeholder="Password" required
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
