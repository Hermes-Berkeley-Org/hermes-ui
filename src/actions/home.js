import { GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getData = (encryptedTokens) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  console.log('ACCESS TOKEN', accessToken)
  dispatch({
    type: GET_HOME_DATA_STARTED
  })
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/home/`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_HOME_DATA_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_HOME_DATA_FAILURE,
        payload: { error }
      })
    });
}
