import {
    VIDEO_JUMPED, VIDEO_RESUMED
} from './types.js'

export const jumpVideo = (seconds) => dispatch => {
  dispatch({
    type: VIDEO_JUMPED,
    payload: { seconds }
  })
}

export const resumeVideo = () => dispatch => {
  dispatch({
    type: VIDEO_RESUMED
  })
}
