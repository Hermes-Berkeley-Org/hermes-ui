import { GET_TRANSCRIPT_STARTED, GET_TRANSCRIPT_SUCCESS, GET_TRANSCRIPT_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getTranscript = (encryptedTokens, courseId, lectureUrlName, videoIndex) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_TRANSCRIPT_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/transcript`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
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
