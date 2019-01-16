import {
  GET_LECTURE_DATA_STARTED,
  GET_LECTURE_DATA_SUCCESS,
  GET_LECTURE_DATA_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LECTURE_DATA_STARTED:
      return {
        ...state,
        lectureLoading: true,
        lectureDataError: null
      };
    case GET_LECTURE_DATA_SUCCESS:
      return {
        ...state,
        lectureLoading: false,
        lectureData: action.payload,
        lectureDataError: null
      };
    case GET_LECTURE_DATA_FAILURE:
      return {
        ...state,
        lectureLoading: false,
        lectureDataError: action.payload.error
      };
    default:
      return state;
  }
}
