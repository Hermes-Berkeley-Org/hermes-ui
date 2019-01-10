import { GET_HOME_DATA_STARTED, GET_HOME_DATA_SUCCESS, GET_HOME_DATA_FAILURE } from '../actions/types.js'

export default (state = {}, action) => {
 switch (action.type) {
    case GET_HOME_DATA_STARTED:
        return Object.assign({}, state, {
            ...state,
            homeLoading: true
        })
    case GET_HOME_DATA_SUCCESS:
        return Object.assign({}, state, {
            ...state,
            homeLoading: false,
            homeData: action.payload
        })
    case GET_HOME_DATA_FAILURE:
        return Object.assign({}, state, {
            ...state,
            homeLoading: false,
            homeDataError: action.payload.error
        })
    default:
        return state
  }
}
