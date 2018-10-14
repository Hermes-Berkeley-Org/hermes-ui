import { GET_COURSE_DATA_STARTED, GET_COURSE_DATA_SUCCESS, GET_COURSE_DATA_FAILURE } from './types.js'
import { decrypt } from './security.js'

const queryString = require('query-string')
const axios = require('axios');

export const getData = (encryptedTokens) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  console.log('ACCESS TOKEN', accessToken)
  dispatch({
    type: GET_COURSE_DATA_STARTED
  })
  axios(`${process.env.REACT_APP_OK_TEST_TOKEN_URL}?${queryString.stringify({'access_token': accessToken})}`,
    {}).then(function (response) {
      dispatch({
        type: GET_COURSE_DATA_SUCCESS,
        payload: response.data
      })
    })
    .catch(function (error) {
      dispatch({
        type: GET_COURSE_DATA_FAILURE,
        payload: { error }
      })
    });
}
