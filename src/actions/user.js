import { GET_ROLE_STARTED, GET_ROLE_SUCCESS, GET_ROLE_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getRole = (encryptedTokens, courseId) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_ROLE_STARTED
  })
  axios(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/user_data`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      response.data.participations.filter(participation => participation['course_id'] === courseId).map((participation, index) => (
        dispatch({
          type: GET_ROLE_SUCCESS,
          payload: participation
        })
      ));

    })
    .catch(function (error) {
      dispatch({
        type: GET_ROLE_FAILURE,
        payload: { error }
      })
    });
}
