import { GET_ROLE_STARTED, GET_ROLE_SUCCESS, GET_ROLE_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_ROLE_STARTED:
        return Object.assign({}, state, {
            ...state,
            instructorLoading: true
        })
    case GET_ROLE_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            instructorLoading: false,
            roleData: action.payload
        })
    case GET_ROLE_FAILURE:
        return Object.assign({}, state, {
            ...state,
            instructorLoading: false,
            roleDataError: action.payload.error
        })
    default:
        return state
  }
}
