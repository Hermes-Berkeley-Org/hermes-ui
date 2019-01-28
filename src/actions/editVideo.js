import { GET_EDIT_DATA_STARTED, GET_EDIT_DATA_SUCCESS, GET_EDIT_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

import toast from '../utils/toast.js';

const axios = require('axios');

export const getVitaminsAndResources = (courseId, lectureUrlName, videoIndex) => dispatch => {
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
    { vitamin: vitaminData},
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      getVitaminsAndResources(courseId, lectureUrlName, videoIndex)(dispatch);
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
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/edit_vitamin/${vitaminIndex}`,
    { vitamin: vitaminData},
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      getVitaminsAndResources(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully edited your vitamin!')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to edit your vitamin, please refresh the page and try again')
      }
    });
};

export const answerVitamin = (courseId, lectureUrlName, videoIndex, vitaminIndex, answer) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/answer_vitamin/${vitaminIndex}`,
    { answer },
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      toast.success('Submitted!')
    }).catch(function (error) {
      toast.error('Couldn\'t submit, please refresh the page')
    });

}

export const deleteVitamin = (courseId, lectureUrlName, videoIndex, vitaminIndex) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  axios.delete(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/delete_vitamin/${vitaminIndex}`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
      }
    }).then(function (response) {
      getVitaminsAndResources(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully deleted your vitamin')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to delete your vitamin, please refresh the page and try again')
      }
    });
};

export const createResource = (courseId, lectureUrlName, videoIndex, { title, link }) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  const resourceData = new FormData();
  resourceData.set('title', title);
  resourceData.set('link', link);

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/create_resource`,
    resourceData,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(function (response) {
      getVitaminsAndResources(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully created your resource!')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to create your resource, please refresh the page and try again')
      }
    });
}

export const editResource = (courseId, lectureUrlName, videoIndex, resourceIndex, { title, link }) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  const resourceData = new FormData();
  resourceData.set('title', title);
  resourceData.set('link', link);

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/edit_resource/${resourceIndex}`,
    resourceData,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      getVitaminsAndResources(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully edited your resource!')
    }).catch(function (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to edit your resource, please refresh the page and try again')
      }
    });
};

export const deleteResource = (courseId, lectureUrlName, videoIndex, resourceIndex) => dispatch => {
  const okAccessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: GET_EDIT_DATA_STARTED
  });

  axios.delete(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/delete_resource/${resourceIndex}`,
    {
      headers: {
        'Authorization': `Bearer ${okAccessToken}`,
      }
    }).then(function (response) {
      getVitaminsAndResources(courseId, lectureUrlName, videoIndex)(dispatch);
      toast.success('Successfully deleted your resource')
    }).catch(function (error) {
      toast.error('Failed to delete your resource, please refresh the page and try again')
    });
};
