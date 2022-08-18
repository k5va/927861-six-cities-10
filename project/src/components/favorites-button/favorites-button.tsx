import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateFavorites} from '../../store/actions';
import {getAuthStatus} from '../../store/selectors';
import {FavoritesButtonProps} from './types';

function FavoritesButton({offerId, isFavorite, width, height, className}: FavoritesButtonProps) {
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favoritesButtonClickHandler = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(updateFavorites({offerId, isFavorite: !isFavorite}));
  };

  return (
    <button
      onClick={favoritesButtonClickHandler}
      className={`
        ${className}-button
        ${isFavorite ? `${className}-button--active` : ''}
        button
      `}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoritesButton;
