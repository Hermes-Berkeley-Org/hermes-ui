import { GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE } from './types.js'

const axios = require('axios');
const queryString = require('query-string')

export const getData = () => dispatch => {
  dispatch({
    type: GET_HOME_DATA_STARTED
  })
  const accessToken = localStorage.getItem('ACCESS_TOKEN')
  axios({
    method: 'get',
    url: `https://okpy.org/api/v3/user?access_token=${accessToken}`,
  }).then(function (response) {
    dispatch({
      type: GET_HOME_DATA_SUCCESS,
      payload: response
    })
  }).catch(function (error) {
    dispatch({
      type: GET_HOME_DATA_FAILURE,
      payload: { error }
    })
  });
}
