import {
  GET_LECTURE_DATA_STARTED,
  GET_LECTURE_DATA_SUCCESS,
  GET_LECTURE_DATA_FAILURE
} from '../actions/types.js';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LECTURE_DATA_STARTED:
      return {
        ...state,
        lectureLoading: true
      };
    case GET_LECTURE_DATA_SUCCESS:
      return {
        ...state,
        lectureLoading: false,
        lectureData: action.payload
      };
    case GET_LECTURE_DATA_FAILURE:
      return {
        ...state,
        lectureLoading: false,
        actionPayloadError: action.payload.error
      };
    default:
      return state;
  }
};
