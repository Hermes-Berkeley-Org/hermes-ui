import {
    VIDEO_JUMPED, VIDEO_HEARTBEAT
} from './types.js';

export const videoJumped = (seconds) => dispatch => {
  dispatch({
    type: VIDEO_JUMPED,
    payload: { seconds }
  })
}

export const videoHeartbeat = (seconds) => dispatch => {
  dispatch({
    type: VIDEO_HEARTBEAT,
    payload: { seconds }
  })
}
