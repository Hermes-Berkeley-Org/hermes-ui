import { GET_OK_ACCESS_TOKEN_SUCCESS, GET_OK_ACCESS_TOKEN_STARTED, GET_OK_ACCESS_TOKEN_FAILURE, CLEAR_SESSION } from '../actions/types.js'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_OK_ACCESS_TOKEN_STARTED:
            return {
                ...state,
                okLoading: true
            }
        case GET_OK_ACCESS_TOKEN_SUCCESS:
            return {
                ...state,
                okLoading: false,
                isAuthenticated: true
            }
        case GET_OK_ACCESS_TOKEN_FAILURE:
            return {
                ...state,
                okLoading: false,
                isAuthenticated: false
            }
        case CLEAR_SESSION:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }
        default:
            return state
    }
}
