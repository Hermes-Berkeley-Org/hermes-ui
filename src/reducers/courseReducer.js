import {
  GET_COURSE_DATA_STARTED,
  GET_COURSE_DATA_SUCCESS,
  GET_COURSE_DATA_FAILURE,
  ENABLE_PIAZZA_STARTED,
  ENABLE_PIAZZA_SUCCESS,
  ENABLE_PIAZZA_FAILURE,
  DISABLE_PIAZZA_STARTED,
  DISABLE_PIAZZA_SUCCESS,
  DISABLE_PIAZZA_FAILURE,
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_COURSE_DATA_STARTED:
      return {
        ...state,
        courseLoading: true,
        courseDataError: null
      };
    case GET_COURSE_DATA_SUCCESS:
      return {
        ...state,
        courseLoading: false,
        courseData: action.payload,
        courseDataError: null
      };
    case GET_COURSE_DATA_FAILURE:
      return {
        ...state,
        courseLoading: false,
        courseDataError: action.payload.error
      };
    case ENABLE_PIAZZA_STARTED:
      return Object.assign({}, state, {
          ...state,
          piazzaLoading: true
      })
    case ENABLE_PIAZZA_SUCCESS:
      return Object.assign({}, state, {
          ...state,
          piazzaLoading: false
      })
    case ENABLE_PIAZZA_FAILURE:
      return Object.assign({}, state, {
          ...state,
          piazzaLoading: false,
          piazzaError: action.payload.error
      })
    case DISABLE_PIAZZA_STARTED:
      return Object.assign({}, state, {
          ...state,
          piazzaLoading: true
      })
    case DISABLE_PIAZZA_SUCCESS:
      return Object.assign({}, state, {
          ...state,
          piazzaLoading: false
      })
    case DISABLE_PIAZZA_FAILURE:
      return Object.assign({}, state, {
          ...state,
          piazzaLoading: false,
          piazzaError: action.payload.error
      })
    default:
      return state;
  }
}
