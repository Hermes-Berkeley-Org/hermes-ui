import {
  GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE,
  CREATE_COURSE_STARTED, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILURE,
} from './types.js';
import { createPiazzaBot } from './piazza.js';
import { decrypt } from '../utils/security.js';

const axios = require('axios');

export const getData = (encryptedTokens) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_HOME_DATA_STARTED
  })
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/home/`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function (response) {
      dispatch({
        type: GET_HOME_DATA_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: GET_HOME_DATA_FAILURE,
        payload: { error }
      })
    });
}

export const createCourse = (courseId, courseInfo) => dispatch => {
  const accessToken = decrypt(localStorage.getItem('okToken')).accessToken;
  dispatch({
    type: CREATE_COURSE_STARTED
  })

  const data = new FormData();
  data.set('display_name', courseInfo.displayName);
  data.set('offering', courseInfo.offering);

  axios.post(
      `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/create_course`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      }).then(function (response) {
        if (courseInfo.piazzaCourseUrl) {
          createPiazzaBot(courseId, courseInfo.piazzaCourseUrl, null)(dispatch)
        }
        getData(localStorage.getItem('okToken'))(dispatch)
        dispatch({
          type: CREATE_COURSE_SUCCESS
        })
      }).catch(function (error) {
        dispatch({
          type: CREATE_COURSE_FAILURE,
          payload: { error }
        })
  });
}
