import {
  CREATE_PIAZZA_BOT_STARTED, CREATE_PIAZZA_BOT_SUCCESS, CREATE_PIAZZA_BOT_FAILURE,
  DISABLE_PIAZZA_BOT_STARTED, DISABLE_PIAZZA_BOT_SUCCESS, DISABLE_PIAZZA_BOT_FAILURE
} from './types.js'

import { getCourseData } from './course.js'

import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const createPiazzaBot = (courseId, piazzaCourseId, piazzaMasterPostId) => dispatch => {
  const accessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  dispatch({
    type: CREATE_PIAZZA_BOT_STARTED,
  })

  const piazzaData = new FormData();
  piazzaData.set('piazza_course_id', piazzaCourseId);
  piazzaData.set('piazza_master_post_id', piazzaMasterPostId || '')
  piazzaData.set('content', '')

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/create_piazza_bot`,
    piazzaData,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }
  ).then(function (response) {
    getCourseData(localStorage.getItem('okToken'), courseId)(dispatch)
    dispatch({
      type: CREATE_PIAZZA_BOT_SUCCESS
    })
  }).catch(function (error) {
    dispatch({
      type: CREATE_PIAZZA_BOT_FAILURE,
      payload: {
        msg: 'Piazza Bot creation failed',
        error
      }
    })
  })

}

export const disablePiazzaBot = (courseId, piazzaMasterPostId, piazzaCourseId) => dispatch => {
  const accessToken = decrypt(localStorage.getItem('okToken')).accessToken;

  const piazzaData = new FormData();
  piazzaData.set('piazza_course_id', piazzaCourseId);
  piazzaData.set('piazza_master_post_id', piazzaMasterPostId)

  dispatch({
    type: DISABLE_PIAZZA_BOT_STARTED,
  })

  axios.post(
    `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/disable_piazza`,
    piazzaData,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }
  ).then(function (response) {
    getCourseData(localStorage.getItem('okToken'), courseId)(dispatch)
    dispatch({
      type: DISABLE_PIAZZA_BOT_SUCCESS
    })
  }).catch(function (error) {
    dispatch({
      type: DISABLE_PIAZZA_BOT_FAILURE,
      payload: {
        msg: 'Piazza Bot creation failed',
        error
      }
    })
  })

}
