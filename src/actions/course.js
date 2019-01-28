import { GET_COURSE_DATA_STARTED, GET_COURSE_DATA_SUCCESS, GET_COURSE_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

import toast from '../utils/toast.js';

const axios = require('axios');
const queryString = require('query-string')

export const getCourseData = (courseId) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;
  dispatch({
    type: GET_COURSE_DATA_STARTED
  });
  axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`
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
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;
  const googleAccessToken = decrypt(localStorage.getItem('googleToken')).accessToken;

  const data = new FormData();
  data.set('title', title);
  data.set('date', date);
  data.set('link', link);
  data.set('youtube_access_token', googleAccessToken);
  data.set('piazza_active', course.info['piazza_active'])
  data.set('piazza_course_id', course.info['piazza_course_id'])
  data.set('piazza_master_post_id', course.info['piazza_master_post_id'])

  dispatch({
    type: GET_COURSE_DATA_STARTED
  });

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/create_lecture`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(function (response) {
      getCourseData(courseId)(dispatch);
      toast.success('Successfully created your lecture!')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to create your lecture, please refresh the page and try again')
      }
    });
}

export const deleteLecture = (courseId, lectureUrlName, course, lecture) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  const urlParams = {
    'piazza_active': course.info['piazza_active']
  }
  if (course.info['piazza_active'] === 'active') {
    urlParams['piazza_course_id'] = course.info['piazza_course_id']
    urlParams['piazza_master_post_id'] = course.info['piazza_master_post_id']
    urlParams['lecture_piazza_id'] = lecture['lecture_piazza_id']
  }

  axios.delete(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}?${queryString.stringify(urlParams)}`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`
      }
    }).then(function (response) {
      getCourseData(courseId)(dispatch);
      toast.success('Successfully deleted your lecture')
    }).catch(function (error) {
      toast.error('Failed to delete your lecture, please refresh the page and try again')
    });

}
