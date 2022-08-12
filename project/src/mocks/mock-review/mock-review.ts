import {datatype, date, music} from 'faker';
import {Review} from '../../types';
import {mockUser} from '..';

const mockReview = (): Review => ({
  id: datatype.number(),
  user: mockUser(),
  rating: datatype.number(),
  comment: music.genre(),
  date: date.past().toISOString(),
});

export default mockReview;
