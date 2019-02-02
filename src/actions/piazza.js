import {
  CREATE_PIAZZA_BOT_STARTED, CREATE_PIAZZA_BOT_SUCCESS, CREATE_PIAZZA_BOT_FAILURE,
  DISABLE_PIAZZA_BOT_STARTED, DISABLE_PIAZZA_BOT_SUCCESS, DISABLE_PIAZZA_BOT_FAILURE,
  ASK_PIAZZA_QUESTION_STARTED, ASK_PIAZZA_QUESTION_SUCCESS, ASK_PIAZZA_QUESTION_FAILURE,
  LOAD_QUESTIONS_STARTED, LOAD_QUESTIONS_SUCCESS, LOAD_QUESTIONS_FAILED
} from './types.js'

import { getCourseData } from './course.js'
import toast from '../utils/toast.js'

import { decrypt } from '../utils/security.js'

const axios = require('axios');
const queryString = require('query-string')

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
    getCourseData(courseId)(dispatch)
    dispatch({
      type: CREATE_PIAZZA_BOT_SUCCESS
    })
    toast.success('Piazza bot successfully created for your course')
  }).catch(function (error) {
    dispatch({
      type: CREATE_PIAZZA_BOT_FAILURE,
      payload: {
        msg: 'Piazza Bot creation failed',
        error
      }
    })
    toast.error('Failed to create Piazza bot, please visit the course page to enable Piazza')
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
    getCourseData(courseId)(dispatch)
    dispatch({
      type: DISABLE_PIAZZA_BOT_SUCCESS
    })
    toast.success('Successfully disabled Piazza for your course')
  }).catch(function (error) {
    dispatch({
      type: DISABLE_PIAZZA_BOT_FAILURE,
      payload: {
        msg: 'Piazza Bot creation failed',
        error
      }
    })
    toast.error('Failed to disable Piazza for your course, please refresh the page and try again')
  })

}

export const askPiazzaQuestion = (courseId, lectureUrlName, videoIndex,
  { question, videoTitle, videoUrl, seconds, piazzaCourseId,
    piazzaLecturePostId, anonymous
  }) => dispatch => {
    const accessToken = decrypt(localStorage.getItem('okToken')).accessToken;

    const piazzaData = new FormData();
    piazzaData.set('question', question);
    piazzaData.set('video_title', videoTitle)
    piazzaData.set('video_url', videoUrl)
    piazzaData.set('seconds', seconds)
    piazzaData.set('piazza_course_id', piazzaCourseId)
    piazzaData.set('piazza_lecture_post_id', piazzaLecturePostId)
    piazzaData.set('anonymous', anonymous ? 'anon' : 'nonanon')

    dispatch({
      type: ASK_PIAZZA_QUESTION_STARTED
    })

    axios.post(
      `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/question`,
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
      toast.success('Posted to Piazza!')
    }).catch(function (error) {
      dispatch({
        type: ASK_PIAZZA_QUESTION_FAILURE,
        payload: { error }
      })
      toast.error('Failed to post question to Piazza, please refresh the page and try again')
    })
}

export const loadQuestions = (courseId, lectureUrlName, videoIndex, startSecond, lecturePostId, piazzaCourseId) => dispatch => {
    const accessToken = decrypt(localStorage.getItem('okToken')).accessToken;

    dispatch({
      type: LOAD_QUESTIONS_STARTED
    })

    const urlParams = {
      'start_second': Math.round(startSecond),
      'end_second': Math.round(startSecond) + 30,
      'lecture_post_id': lecturePostId,
      'piazza_course_id': piazzaCourseId
    }

    axios.get(
      `${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/lecture/${lectureUrlName}/video/${videoIndex}/questions?${queryString.stringify(urlParams)}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    ).then(function (response) {
      dispatch({
        type: LOAD_QUESTIONS_SUCCESS,
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: LOAD_QUESTIONS_FAILED,
        payload: { error }
      })
    })

};
