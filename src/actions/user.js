import { GET_ROLE_STARTED, GET_ROLE_SUCCESS, GET_ROLE_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getRole = (encryptedTokens, courseId) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_ROLE_STARTED
  })
  dispatch({
    type: GET_ROLE_SUCCESS,
    payload: {
      'role': 'instructor'
    }
  })
  // axios(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/${courseId}/role/`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   }).then(function (response) {
  //     dispatch({
  //       type: GET_ROLE_SUCCESS,
  //       payload: response.data
  //     })
  //   })
  //   .catch(function (error) {
  //     dispatch({
  //       type: GET_ROLE_FAILURE,
  //       payload: { error }
  //     })
  //   });
}
