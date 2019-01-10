import {
  GET_VIDEO_DATA_STARTED,
  GET_VIDEO_DATA_SUCCESS,
  GET_VIDEO_DATA_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_VIDEO_DATA_STARTED:
      return {
        ...state,
        videoLoading: true
      };
    case GET_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        videoLoading: false,
        videoData: action.payload
      };
    case GET_VIDEO_DATA_FAILURE:
      return {
        ...state,
        videoLoading: false,
        videoDataError: action.payload.error
      };
    default:
      return state;
  }
}
