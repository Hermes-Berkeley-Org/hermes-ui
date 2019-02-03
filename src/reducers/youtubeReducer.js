import {
  VIDEO_JUMPED, VIDEO_HEARTBEAT
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case VIDEO_JUMPED:
      return {
        ...state,
        videoStartTime: action.payload.seconds,
        videoCurrentTime: action.payload.seconds
      };
    case VIDEO_HEARTBEAT:
      return {
        ...state,
        videoCurrentTime: action.payload.seconds
      }
    default:
      return state;
  }
}
