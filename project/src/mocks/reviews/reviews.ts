import {Review} from '../../types';
import jsonData from './reviews.json';

type JSONValue = { [key: string]: number | boolean | string | string[] | JSONValue };

function createReview(raw: JSONValue): Review {
  const user: JSONValue = raw['user'] as JSONValue;

  return {
    id: raw['id'] as number,
    user: {
      id: user['id'] as number,
      name: user['name'] as string,
      isPro: user['isPro'] as boolean,
      avatarUrl: user['avatarUrl'] as string,
    },
    rating: raw['rating'] as number,
    comment: raw['comment'] as string,
    date: new Date(raw['date'] as string),
  };
}

export default jsonData.map(createReview);
