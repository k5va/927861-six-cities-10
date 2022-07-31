import {AUTH_TOKEN_KEY_NAME} from '../../const';
import {Token} from '../../types';

const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export default getToken;
