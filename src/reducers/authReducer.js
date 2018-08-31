import { SAVE_ACCESS_TOKEN, GET_ACCESS_TOKEN_SUCCESS, GET_ACCESS_TOKEN_STARTED, GET_ACCESS_TOKEN_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case SAVE_ACCESS_TOKEN:
        localStorage.setItem('ACCESS_TOKEN', action.payload);
        return state
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
            token: action.payload.token
        })
    case GET_ACCESS_TOKEN_FAILURE:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            isAuthenticated: false,
            actionPayloadError: action.payload.error
        })
    default:
        if (!action.type.startsWith('@@')) {
           console.log(action.type)
        }
        return state
  }
}
