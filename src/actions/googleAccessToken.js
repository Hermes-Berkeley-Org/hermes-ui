import { decrypt } from '../utils/security.js'
import { GET_GOOGLE_ACCESS_TOKEN_SUCCESS, GET_GOOGLE_ACCESS_TOKEN_FAILURE } from './types.js'

export const authenticate = () => dispatch => {
  const encryptedTokens = localStorage.getItem('googleToken');

  if (!encryptedTokens) {
    dispatch({
      type: GET_GOOGLE_ACCESS_TOKEN_FAILURE
    });
    return;
  }

  const { expirationTime, accessToken } = decrypt(encryptedTokens);
  if (new Date().getTime() >= expirationTime) {
    dispatch({
      type: GET_GOOGLE_ACCESS_TOKEN_FAILURE
    });
    return;
  }

  dispatch({
    type: GET_GOOGLE_ACCESS_TOKEN_SUCCESS
  });
}
