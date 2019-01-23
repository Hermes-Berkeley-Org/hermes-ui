import { GET_EDIT_DATA_STARTED, GET_EDIT_DATA_SUCCESS, GET_EDIT_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

import toast from '../utils/toast.js';

const axios = require('axios');
const queryString = require('query-string')

export const getEditData = (courseId, lectureUrlName, videoIndex) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;
  dispatch({
    type: GET_EDIT_DATA_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/edit`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_EDIT_DATA_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_EDIT_DATA_FAILURE,
        payload: { error }
      })
    });
}
