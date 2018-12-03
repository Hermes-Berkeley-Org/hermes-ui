import { GET_LECTURE_DATA_STARTED, GET_LECTURE_DATA_SUCCESS, GET_LECTURE_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getLectureData = (encryptedTokens, courseId, lectureIndex) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_LECTURE_DATA_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureIndex}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_LECTURE_DATA_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_LECTURE_DATA_FAILURE,
        payload: { error }
      })
    });
}
