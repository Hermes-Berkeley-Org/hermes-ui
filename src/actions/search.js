import { SEARCH_STARTED, SEARCH_SUCCESS, SEARCH_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const search = (query) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;
  dispatch({
    type: SEARCH_STARTED
  })
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/search?q=${query}`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: SEARCH_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: SEARCH_FAILURE,
        payload: { error }
      })
    });
}
