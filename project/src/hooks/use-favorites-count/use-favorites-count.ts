import {getOffers} from '../../store/selectors';
import useAppSelector from '../use-app-selector/use-app-selector';

const useFavoritesCount = () => useAppSelector(getOffers).filter(({isFavorite}) => isFavorite).length;

export default useFavoritesCount;
