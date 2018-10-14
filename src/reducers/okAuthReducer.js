import { GET_OK_ACCESS_TOKEN_SUCCESS, GET_OK_ACCESS_TOKEN_STARTED, GET_OK_ACCESS_TOKEN_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_OK_ACCESS_TOKEN_STARTED:
        return Object.assign({}, state, {
            ...state,
            loading: true
        })
    case GET_OK_ACCESS_TOKEN_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            isAuthenticated: true
        })
    case GET_OK_ACCESS_TOKEN_FAILURE:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            isAuthenticated: false
        })
    default:
        return state
  }
}
