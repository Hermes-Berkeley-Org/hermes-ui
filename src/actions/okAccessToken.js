import { GET_OK_ACCESS_TOKEN_SUCCESS, GET_OK_ACCESS_TOKEN_STARTED, GET_OK_ACCESS_TOKEN_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');
const queryString = require('query-string')

export const sendFailure = () => dispatch => {
  dispatch({
    type: GET_OK_ACCESS_TOKEN_FAILURE
  })
}

export const authenticate = (encryptedTokens) => dispatch => {
  const { accessToken, refreshToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_OK_ACCESS_TOKEN_STARTED
  })
  axios(`${process.env.REACT_APP_OK_TEST_TOKEN_URL}?${queryString.stringify({'access_token': accessToken})}`,
    {}).then(function (response) {
      dispatch({
        type: GET_OK_ACCESS_TOKEN_SUCCESS
      })
    }).catch(function (accessTokenError) {
      const currentUrl = new URL(window.location.href);
      axios(process.env.REACT_APP_OK_TOKEN_URL, {
        method: 'POST',
        data: queryString.stringify({
          'refresh_token': refreshToken,
          'client_secret': process.env.REACT_APP_CLIENT_SECRET,
          'client_id': process.env.REACT_APP_CLIENT_ID,
          'grant_type': 'refresh_token',
          'redirect_uri': `${currentUrl.origin}/authorized`
        })
      }).then(function (response) {
        dispatch({
          type: GET_OK_ACCESS_TOKEN_SUCCESS,
          payload: {
            accessToken: response.data['access_token'],
            refreshToken: response.data['refresh_token']
          }
        })
      }).catch(function (accessTokenError) {
        dispatch({
          type: GET_OK_ACCESS_TOKEN_FAILURE,
          payload: { error: accessTokenError }
        })
      });
    });
}
