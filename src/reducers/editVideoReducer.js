import {
  GET_EDIT_DATA_STARTED, GET_EDIT_DATA_SUCCESS, GET_EDIT_DATA_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EDIT_DATA_STARTED:
      return {
        ...state,
        editDataLoading: true,
        editDataError: null
      };
    case GET_EDIT_DATA_SUCCESS:
      return {
        ...state,
        editDataLoading: false,
        editData: action.payload,
        editDataError: null
      };
    case GET_EDIT_DATA_FAILURE:
      console.log(action.payload)
      return {
        ...state,
        editDataLoading: false,
        editData: null,
        editDataNotFound: action.payload.error.response.status === 404,
        editDataError: action.payload.error
      };
    default:
      return state;
  }
}
