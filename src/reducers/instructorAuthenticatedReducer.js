import { GET_ROLE_STARTED, GET_ROLE_SUCCESS, GET_ROLE_FAILURE, GET_ROLE_NO_COURSE_FOUND } from '../actions/types.js'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROLE_STARTED:
            return {
                ...state,
                instructorLoading: true,
                courseNotFound: false,
                roleDataError: null
            }
        case GET_ROLE_SUCCESS:
            return {
                ...state,
                instructorLoading: false,
                courseNotFound: false,
                roleData: action.payload,
                roleDataError: null
            }
        case GET_ROLE_FAILURE:
            return {
                ...state,
                instructorLoading: false,
                courseNotFound: false,
                roleDataError: action.payload.error
            }
        case GET_ROLE_NO_COURSE_FOUND:
            return {
                ...state,
                instructorLoading: false,
                courseNotFound: true,
                roleDataError: null
            }
        default:
            return state
    }
}
