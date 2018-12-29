import {
  GET_ROLE_STARTED,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILURE
} from '../actions/types.js';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ROLE_STARTED:
      return {
        ...state,
        instructorLoading: true
      };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        instructorLoading: false,
        roleData: action.payload
      };
    case GET_ROLE_FAILURE:
      return {
        ...state,
        instructorLoading: false,
        roleDataError: action.payload.error
      };
    default:
      return state;
  }
};
