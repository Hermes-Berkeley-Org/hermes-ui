import {
  VIDEO_JUMPED, VIDEO_RESUMED
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case VIDEO_JUMPED:
      return {
        ...state,
        jumpedTo: action.payload.seconds
      };
    case VIDEO_RESUMED:
      return {
        ...state,
        jumpedTo: null
      }
    default:
      return state;
  }
}
