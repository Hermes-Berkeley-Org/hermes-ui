import { GET_COURSE_DATA_STARTED, GET_COURSE_DATA_SUCCESS, GET_COURSE_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');
const queryString = require('query-string')

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

export const createLecture = (courseId, { title, date, link, course }) => dispatch => {
  const okEncryptedTokens = localStorage.getItem('okToken');
  const googleEncryptedTokens = localStorage.getItem('googleToken');
  const okAccessToken = decrypt(okEncryptedTokens).accessToken;
  const googleAccessToken = decrypt(googleEncryptedTokens).accessToken;

  const data = new FormData();
  data.set('title', title);
  data.set('date', date);
  data.set('link', link);
  data.set('youtube_access_token', googleAccessToken);
  data.set('piazza_active', course.info['piazza_active'])
  data.set('piazza_course_id', course.info['piazza_course_id'])
  data.set('piazza_master_post_id', course.info['piazza_master_post_id'])

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/create_lecture`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(function (response) {
      getCourseData(okEncryptedTokens, courseId)(dispatch);
    }).catch(function (error) {
      // TODO: Display the error better
      alert(error);
    });
}

export const deleteLecture = (courseId, lectureUrlName, course) => dispatch => {
  const okEncryptedTokens = localStorage.getItem('okToken');
  const okAccessToken = decrypt(okEncryptedTokens).accessToken;

  const urlParams = {
    'piazza_active': course.info['piazza_active']
  }
  if (course.info['piazza_active'] === 'active') {
    urlParams['piazza_course_id'] = course.info['piazza_course_id']
    urlParams['piazza_master_post_id'] = course.info['piazza_master_post_id']
  }

  axios.delete(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}?${queryString.stringify(urlParams)}`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`
      }
    }).then(function (response) {
      getCourseData(okEncryptedTokens, courseId)(dispatch);
    }).catch(function (error) {
      // TODO: Display the error better
      alert(error);
    });

}
