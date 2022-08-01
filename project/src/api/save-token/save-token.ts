import {AUTH_TOKEN_KEY_NAME} from '../../const';
import {Token} from '../../types';

const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export default saveToken;
