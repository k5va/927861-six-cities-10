import {User} from '../../types';

type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export default Review;
