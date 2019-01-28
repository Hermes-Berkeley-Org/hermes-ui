import {
    GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE,
    CREATE_COURSE_STARTED, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILURE,
    CREATE_PIAZZA_BOT_SUCCESS, CREATE_PIAZZA_BOT_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_HOME_DATA_STARTED:
            return {
                ...state,
                homeLoading: true,
                homeDataError: null
            }
        case GET_HOME_DATA_SUCCESS:
            return {
                ...state,
                homeLoading: false,
                homeData: action.payload,
                homeDataError: null
            }
        case GET_HOME_DATA_FAILURE:
            return {
                ...state,
                homeLoading: false,
                homeDataError: action.payload.error
            }
        case CREATE_COURSE_STARTED:
            return {
                ...state,
                createCourseLoading: true
            }
        case CREATE_COURSE_SUCCESS:
            return {
                ...state,
                createCourseLoading: false
            }
        case CREATE_COURSE_FAILURE:
            return {
                ...state,
                createCourseLoading: false,
                createCourseError: action.payload.error
            }
        case CREATE_PIAZZA_BOT_FAILURE:
            return {
                ...state,
                createCourseLoading: false,
                createPiazzaBotErrorMessage: action.payload.msg
            }
        default:
            return state
    }
}
