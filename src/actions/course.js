import { GET_COURSE_DATA_STARTED, GET_COURSE_DATA_SUCCESS, GET_COURSE_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getCourseData = (encryptedTokens, courseId) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_COURSE_DATA_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_COURSE_DATA_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_COURSE_DATA_FAILURE,
        payload: { error }
      })
    });
}

export const createLecture = (encryptedTokens, courseId, lecture) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
}
