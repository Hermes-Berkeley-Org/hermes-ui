import { GET_OK_ACCESS_TOKEN_SUCCESS, GET_OK_ACCESS_TOKEN_STARTED, GET_OK_ACCESS_TOKEN_FAILURE, CLEAR_SESSION } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

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

export const authenticate = () => dispatch => {
  const { accessToken, refreshToken } = decrypt(localStorage.getItem('okToken'))
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
