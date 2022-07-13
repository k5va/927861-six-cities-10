import {AppProps} from './types';
import {Favorites, Login, Main, NotFound, Room} from '../../pages';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';

function App({placesCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main placesCount={placesCount}/>} />
        <Route path={AppRoute.LOGIN} element={<Login/>} />
        <Route path={AppRoute.FAVORITES} element={<Favorites/>} />
        <Route path={AppRoute.ROOM} element={<Room/>} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
