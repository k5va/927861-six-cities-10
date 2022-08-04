import {NameSpace} from '../../../../const';
import {Review, State} from '../../../../types';

const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;

export default getReviews;
