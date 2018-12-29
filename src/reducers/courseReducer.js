import {
  GET_COURSE_DATA_STARTED,
  GET_COURSE_DATA_SUCCESS,
  GET_COURSE_DATA_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_COURSE_DATA_STARTED:
      return {
        ...state,
        courseLoading: true
      };
    case GET_COURSE_DATA_SUCCESS:
      return {
        ...state,
        courseLoading: false,
        courseData: action.payload
      };
    case GET_COURSE_DATA_FAILURE:
      return {
        ...state,
        courseLoading: false,
        actionPayloadError: action.payload.error
      };
    default:
      return state;
  }
}
