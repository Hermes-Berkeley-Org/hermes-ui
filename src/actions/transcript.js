import { GET_TRANSCRIPT_STARTED, GET_TRANSCRIPT_SUCCESS, GET_TRANSCRIPT_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getTranscript = (courseId, lectureUrlName, videoIndex) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;
  dispatch({
    type: GET_TRANSCRIPT_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/transcript`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_TRANSCRIPT_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_TRANSCRIPT_FAILURE,
        payload: { error }
      })
    });
}
