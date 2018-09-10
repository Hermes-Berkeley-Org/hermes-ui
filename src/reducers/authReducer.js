import { SAVE_ACCESS_TOKEN, GET_ACCESS_TOKEN_SUCCESS, GET_ACCESS_TOKEN_STARTED, GET_ACCESS_TOKEN_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    // case SAVE_ACCESS_TOKEN:
    //     return Object.assign({}, state, {
    //         ...state,
    //         token: action.payload.token,
    //         refreshToken: action.payload.refreshToken
    //     })
    case GET_ACCESS_TOKEN_STARTED:
        return Object.assign({}, state, {
            ...state,
            loading: true
        })
    case GET_ACCESS_TOKEN_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            isAuthenticated: true,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken
        })
    case GET_ACCESS_TOKEN_FAILURE:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            isAuthenticated: false
        })
    default:
        return state
  }
}
