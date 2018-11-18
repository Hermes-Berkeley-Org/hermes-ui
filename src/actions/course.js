import { GET_PLAYLISTS_DATA_STARTED, GET_PLAYLISTS_DATA_SUCCESS, GET_PLAYLISTS_DATA_FAILURE } from './types.js'
import { decrypt } from '../utils/security.js'

const axios = require('axios');

export const getPlaylists = (encryptedTokens, courseId) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
  dispatch({
    type: GET_PLAYLISTS_DATA_STARTED
  })
  dispatch({
    type: GET_PLAYLISTS_DATA_SUCCESS,
    payload: [
      {
        'title': 'Title',
        'date': '5/6/18',
        'route': '/course/234/lecture/0'
      },
      {
        'title': 'Title2',
        'date': '5/7/18',
        'route': '/course/234/lecture/1'
      }
    ]
  })
  // axios.get(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/course/${courseId}/`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   }).then(function (response) {
  //     dispatch({
  //       type: GET_PLAYLISTS_DATA_SUCCESS,
  //       payload: response.data
  //     })
  //   }).catch(function (error) {
  //     dispatch({
  //       type: GET_PLAYLISTS_DATA_FAILURE,
  //       payload: { error }
  //     })
  //   });
}

export const createLecture = (encryptedTokens, courseId, lecture) => dispatch => {
  const { accessToken } = decrypt(encryptedTokens)
}
