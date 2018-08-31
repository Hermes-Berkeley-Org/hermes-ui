import { SAVE_ACCESS_TOKEN, GET_ACCESS_TOKEN_SUCCESS, GET_ACCESS_TOKEN_STARTED, GET_ACCESS_TOKEN_FAILURE } from './types.js'

const axios = require('axios');
const queryString = require('query-string')

export const saveAccessToken = (accessToken) => dispatch => {
   dispatch({
      type: SAVE_ACCESS_TOKEN,
      payload: accessToken
   })
}

export const authenticate = () => dispatch => {
  dispatch({
    type: GET_ACCESS_TOKEN_STARTED
  })
  const token = localStorage.getItem('ACCESS_TOKEN')
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_TEST_TOKEN_URL}?${queryString.stringify({'access_token': token})}`
  }).then(function (response) {
    dispatch({
      type: GET_ACCESS_TOKEN_SUCCESS,
      payload: { token }
    })
  }).catch(function (accessTokenError) {
    dispatch({
      type: GET_ACCESS_TOKEN_FAILURE,
      payload: { error: accessTokenError }
    })
  });
}
