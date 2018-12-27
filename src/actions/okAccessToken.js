import { GET_OK_ACCESS_TOKEN_SUCCESS, GET_OK_ACCESS_TOKEN_STARTED, GET_OK_ACCESS_TOKEN_FAILURE, CLEAR_SESSION } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');
const queryString = require('query-string')

export const sendFailure = () => dispatch => {
  dispatch({
    type: GET_OK_ACCESS_TOKEN_FAILURE
  })
}

export const logout = () => dispatch => {
  localStorage.clear();
  dispatch({
    type: CLEAR_SESSION
  })
}

export const authenticate = (encryptedTokens) => dispatch => {
  const { accessToken, refreshToken } = decrypt(encryptedTokens)
  console.log("OK ACCESS TOKEN", accessToken)
  dispatch({
    type: GET_OK_ACCESS_TOKEN_STARTED
  })
  axios(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/hello`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_OK_ACCESS_TOKEN_SUCCESS
      })
    }).catch(function (accessTokenError) {
      const currentUrl = new URL(window.location.href);
      axios(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/ok_refresh?refresh_token=${refreshToken}`, {
        method: 'GET'
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
