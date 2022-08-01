import {JSONValue, User} from '../../types';

/**
 * Creates user from json data
 * @param {JSONValue} raw - json data
 * @returns {User} - user
 */
const parseUser = (raw: JSONValue): User => (
  {
    id: raw['id'] as number,
    name: raw['name'] as string,
    avatarUrl: raw['avatarUrl'] as string,
    isPro: raw['isPro'] as boolean,
    email: raw['email'] as string,
  });

export default parseUser;
