import {
    GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE,
    CREATE_COURSE_STARTED, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILURE,
    CREATE_PIAZZA_BOT_SUCCESS, CREATE_PIAZZA_BOT_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_HOME_DATA_STARTED:
        return Object.assign({}, state, {
            ...state,
            homeLoading: true
        })
    case GET_HOME_DATA_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            homeLoading: false,
            homeData: action.payload
        })
    case GET_HOME_DATA_FAILURE:
        return Object.assign({}, state, {
            ...state,
            homeLoading: false,
            homeDataError: action.payload.error
        })
    case CREATE_COURSE_STARTED:
      return Object.assign({}, state, {
          ...state,
          createCourseLoading: true
      })
    case CREATE_COURSE_SUCCESS:
      return Object.assign({}, state, {
          ...state,
          createCourseLoading: false
      })
    case CREATE_COURSE_FAILURE:
      return Object.assign({}, state, {
          ...state,
          createCourseLoading: false,
          createCourseError: action.payload.error
      })
    case CREATE_PIAZZA_BOT_FAILURE:
      return Object.assign({}, state, {
          ...state,
          createCourseLoading: false,
          createPiazzaBotErrorMessage: action.payload.msg
      })
    default:
        return state
  }
}
