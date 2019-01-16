import { GET_ROLE_STARTED, GET_ROLE_SUCCESS, GET_ROLE_FAILURE, GET_ROLE_NO_COURSE_FOUND } from './types.js'
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
      let courseFound = false;
      response.data.participations
            .filter(participation => participation['course_id'] === courseId)
            .forEach(function(participation, index) {
        dispatch({
          type: GET_ROLE_SUCCESS,
          payload: participation
        })
        courseFound = true;
      });
      if (!courseFound) {
        dispatch({
          type: GET_ROLE_NO_COURSE_FOUND
        })
      }
    })
    .catch(function (error) {
      dispatch({
        type: GET_ROLE_FAILURE,
        payload: { error }
      })
    });
}
