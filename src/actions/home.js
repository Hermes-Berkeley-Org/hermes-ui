import {
    GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE,
    CREATE_COURSE_STARTED, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILURE,
    CREATE_PIAZZA_BOT_SUCCESS, CREATE_PIAZZA_BOT_FAILURE
  } from './types.js'
import { decrypt } from '../utils/security.js'

const url = require('url');
const axios = require('axios');

export const getData = (encryptedTokens) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  console.log('hello')
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
          const path = url.parse(courseInfo.piazzaCourseUrl).pathname
          if (!path) {
            dispatch({
              type: CREATE_PIAZZA_BOT_FAILURE,
              payload: {
                msg: 'Piazza Course URL is malformed'
              }
            })
          } else {
            const pathComponents = path.split('/');
            const piazzaCourseId = pathComponents[pathComponents.length - 1] ||
              pathComponents[pathComponents.length - 2];

            const piazzaData = new FormData();
            piazzaData.set('piazza_course_id', piazzaCourseId);
            piazzaData.set('piazza_master_post_id', '')
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
              dispatch({
                type: CREATE_PIAZZA_BOT_SUCCESS,
              })
              dispatch({
                type: CREATE_COURSE_SUCCESS
              })
              getData(localStorage.getItem('okToken'))
            }).catch(function (error) {
              dispatch({
                type: CREATE_PIAZZA_BOT_FAILURE,
                payload: {
                  msg: 'Piazza Bot creation failed'
                }
              })
            })
          }
        } else {
          getData(localStorage.getItem('okToken'))
          dispatch({
            type: CREATE_COURSE_SUCCESS
          })
        }
      }).catch(function (error) {
        dispatch({
          type: CREATE_COURSE_FAILURE,
          payload: { error }
        })
  });
}
