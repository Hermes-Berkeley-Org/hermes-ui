import { GET_GOOGLE_ACCESS_TOKEN_SUCCESS, GET_GOOGLE_ACCESS_TOKEN_STARTED, GET_GOOGLE_ACCESS_TOKEN_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_GOOGLE_ACCESS_TOKEN_STARTED:
        return Object.assign({}, state, {
            ...state,
            googleLoading: true
        })
    case GET_GOOGLE_ACCESS_TOKEN_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            googleLoading: false,
            isGoogleAuthenticated: true
        })
    case GET_GOOGLE_ACCESS_TOKEN_FAILURE:
        return Object.assign({}, state, {
            ...state,
            googleLoading: false,
            isGoogleAuthenticated: false
        })
    default:
        return state
  }
}
