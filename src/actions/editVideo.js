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

export const createVitamin = (courseId, lectureUrlName, videoIndex, vitaminData) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/create_vitamin`,
    vitaminData,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      getEditData(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully created your vitamin!')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to create your vitamin, please refresh the page and try again')
      }
    });
}

export const editVitamin = (courseId, lectureUrlName, videoIndex, vitaminIndex, vitaminData) => dispatch => {

};

export const deleteVitamin = (courseId, lectureUrlName, videoIndex, vitaminIndex) => dispatch => {

};

export const createResource = (courseId, lectureUrlName, videoIndex, resourceData) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/create_resource`,
    resourceData,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      getEditData(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully created your resource!')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to create your resource, please refresh the page and try again')
      }
    });
}

export const editResource = (courseId, lectureUrlName, videoIndex, resourceIndex, resourceData) => dispatch => {

};

export const deleteResource = (courseId, lectureUrlName, videoIndex, resourceIndex) => dispatch => {

};
