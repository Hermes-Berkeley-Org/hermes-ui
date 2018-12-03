import { GET_VIDEO_DATA_STARTED, GET_VIDEO_DATA_SUCCESS, GET_VIDEO_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getVideoData = (encryptedTokens, courseId, lectureIndex, videoIndex) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_VIDEO_DATA_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureIndex}/video/${videoIndex}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_VIDEO_DATA_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_VIDEO_DATA_FAILURE,
        payload: { error }
      })
    });
}
