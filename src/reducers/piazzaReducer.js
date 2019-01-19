import {
  ASK_PIAZZA_QUESTION_STARTED,
  ASK_PIAZZA_QUESTION_SUCCESS,
  ASK_PIAZZA_QUESTION_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case ASK_PIAZZA_QUESTION_STARTED:
      return {
        ...state,
        piazzaQuestionLoading: true,
        piazzaQuestionError: null
      };
    case ASK_PIAZZA_QUESTION_SUCCESS:
      return {
        ...state,
        piazzaQuestionLoading: false,
        piazzaQuestionError: null
      };
    case ASK_PIAZZA_QUESTION_FAILURE:
      return {
        ...state,
        piazzaQuestionLoading: false,
        piazzaQuestionError: action.payload.error
      };
    default:
      return state;
  }
}
