import {AUTH_TOKEN_KEY_NAME} from '../../const';

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export default dropToken;
