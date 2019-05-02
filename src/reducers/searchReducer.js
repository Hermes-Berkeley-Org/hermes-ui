import {
    SEARCH_STARTED, SEARCH_SUCCESS, SEARCH_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_STARTED:
            return {
                ...state,
                searchLoading: true,
                searchError: null
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchResults: action.payload,
                searchError: null
            }
        case SEARCH_FAILURE:
            return {
                ...state,
                searchLoading: false,
                searchError: action.payload.error
            }
        default:
            return state
    }
}
