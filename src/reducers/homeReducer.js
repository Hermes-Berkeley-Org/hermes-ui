import { GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_HOME_DATA_STARTED:
        return Object.assign({}, state, {
            ...state,
            loading: true
        })
    case GET_HOME_DATA_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            data: action.payload
        })
    case GET_HOME_DATA_FAILURE:
        return Object.assign({}, state, {
            ...state,
            loading: false,
            actionPayloadError: action.payload.error
        })
    default:
        return state
  }
}
