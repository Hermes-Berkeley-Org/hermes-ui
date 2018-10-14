import { GET_COURSE_DATA_STARTED, GET_COURSE_DATA_SUCCESS, GET_COURSE_DATA_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_COURSE_DATA_STARTED:
        return Object.assign({}, state, {
            ...state,
            loading: true
        })
    case GET_COURSE_DATA_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            courseResponse: action.payload
        })
    case GET_COURSE_DATA_FAILURE:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            actionPayloadError: action.payload.error
        })
    default:
        return state
  }
}
