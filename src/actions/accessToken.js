import { SAVE_ACCESS_TOKEN, GET_ACCESS_TOKEN_SUCCESS, GET_ACCESS_TOKEN_STARTED, GET_ACCESS_TOKEN_FAILURE } from './types.js'

const axios = require('axios');
const queryString = require('query-string')

export const sendFailure = () => dispatch => {
  dispatch({
    type: GET_ACCESS_TOKEN_FAILURE
  })
}

const refresh = (refreshToken) => dispatch => {
  const currentUrl = new URL(window.location.href);
  axios({
    method: 'post',
    url: process.env.REACT_APP_TOKEN_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: queryString.stringify({
      'refresh_token': refreshToken,
      'client_secret': process.env.REACT_APP_CLIENT_SECRET,
      'client_id': process.env.REACT_APP_CLIENT_ID,
      'grant_type': 'refresh_token',
      'redirect_uri': `${currentUrl.origin}/authorized`
    })
  }).then(function (response) {
    dispatch({
      type: GET_ACCESS_TOKEN_SUCCESS,
      payload: {
        accessToken: response.data['access_token'],
        refreshToken: response.data['refresh_token']
      }
    })
  }).catch(function (accessTokenError) {
    dispatch({
      type: GET_ACCESS_TOKEN_FAILURE,
      payload: { error: accessTokenError }
    })
  });
}

export const authenticate = ({ accessToken, refreshToken }) => dispatch => {
  dispatch({
    type: GET_ACCESS_TOKEN_STARTED
  })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_TEST_TOKEN_URL}?${queryString.stringify({'access_token': accessToken})}`
  }).then(function (response) {
    dispatch({
      type: GET_ACCESS_TOKEN_SUCCESS,
      payload: { accessToken, refreshToken }
    })
  }).catch(function (accessTokenError) {
    refresh(refreshToken)
  });
}
