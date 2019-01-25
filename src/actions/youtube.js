import {
    VIDEO_JUMPED, VIDEO_RESUMED
} from './types.js'

export const videoJumped = (seconds) => dispatch => {
  dispatch({
    type: VIDEO_JUMPED,
    payload: { seconds }
  })
}

export const videoResumed = () => dispatch => {
  dispatch({
    type: VIDEO_RESUMED
  })
}
