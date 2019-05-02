import {
  GET_EDIT_DATA_STARTED, GET_EDIT_DATA_SUCCESS, GET_EDIT_DATA_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EDIT_DATA_STARTED:
      return {
        ...state,
        vitaminsAndResourcesLoading: true,
        vitaminsAndResourcesError: null
      };
    case GET_EDIT_DATA_SUCCESS:
      return {
        ...state,
        vitaminsAndResourcesLoading: false,
        vitaminsAndResources: action.payload,
        vitaminsAndResourcesError: null
      };
    case GET_EDIT_DATA_FAILURE:
      return {
        ...state,
        vitaminsAndResourcesLoading: false,
        vitaminsAndResources: null,
        vitaminsAndResourcesNotFound: action.payload.error.response.status === 404,
        vitaminsAndResourcesError: action.payload.error
      };
    default:
      return state;
  }
}
