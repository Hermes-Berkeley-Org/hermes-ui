import { GET_GOOGLE_ACCESS_TOKEN_SUCCESS, GET_GOOGLE_ACCESS_TOKEN_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_GOOGLE_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        googleLoading: false,
        isGoogleAuthenticated: true
      }
    case GET_GOOGLE_ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        googleLoading: false,
        isGoogleAuthenticated: false
      }
    default:
      return state
  }
}
