import {
  LOAD_QUESTIONS_STARTED, LOAD_QUESTIONS_SUCCESS, LOAD_QUESTIONS_FAILED
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS_STARTED:
      return {
        ...state,
        piazzaQuestionLoading: true,
        piazzaQuestionError: null
      };
    case LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        piazzaQuestionLoading: false,
        piazzaData: action.payload,
        piazzaQuestionError: null
      };
    case LOAD_QUESTIONS_FAILED:
      return {
        ...state,
        piazzaQuestionLoading: false,
        piazzaQuestionError: action.payload.error
      };
    default:
      return state;
  }
}
