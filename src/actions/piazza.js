import {
  CREATE_PIAZZA_BOT_STARTED, CREATE_PIAZZA_BOT_SUCCESS, CREATE_PIAZZA_BOT_FAILURE,
  DISABLE_PIAZZA_BOT_STARTED, DISABLE_PIAZZA_BOT_SUCCESS, DISABLE_PIAZZA_BOT_FAILURE,
  ASK_PIAZZA_QUESTION_STARTED, ASK_PIAZZA_QUESTION_SUCCESS, ASK_PIAZZA_QUESTION_FAILURE
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

export const askPiazzaQuestion = (courseId,
  { question, videoTitle, videoUrl, timestamp, piazzaCourseId,
    piazzaLecturePostId, anonymous
  }) => dispatch => {
    const accessToken = decrypt(localStorage.getItem('okToken')).accessToken;

    const piazzaData = new FormData();
    piazzaData.set('question', question);
    piazzaData.set('video_title', videoTitle)
    piazzaData.set('video_url', videoUrl)
    piazzaData.set('timestamp', timestamp)
    piazzaData.set('piazza_course_id', piazzaCourseId)
    piazzaData.set('piazza_lecture_post_id', piazzaLecturePostId)
    piazzaData.set('anonymous', anonymous ? 'anon' : 'nonanon')

    dispatch({
      type: ASK_PIAZZA_QUESTION_STARTED
    })

    axios.post(
      `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/question`,
      piazzaData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then(function (response) {
      dispatch({
        type: ASK_PIAZZA_QUESTION_SUCCESS
      })
    }).catch(function (error) {
      dispatch({
        type: ASK_PIAZZA_QUESTION_FAILURE,
        payload: { error }
      })
    })

}
