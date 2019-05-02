import {
  GET_TRANSCRIPT_STARTED,
  GET_TRANSCRIPT_SUCCESS,
  GET_TRANSCRIPT_FAILURE
} from '../actions/types.js'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TRANSCRIPT_STARTED:
      return {
        ...state,
        transcriptLoading: true,
        transcriptDataError: null
      };
    case GET_TRANSCRIPT_SUCCESS:
      return {
        ...state,
        transcriptLoading: false,
        transcript: action.payload.transcript,
        transcriptDataError: null
      };
    case GET_TRANSCRIPT_FAILURE:
      return {
        ...state,
        transcriptLoading: false,
        transcript: null,
        transcriptNotFound: action.payload.error.response.status === 404,
        transcriptDataError: action.payload.error
      };
    default:
      return state;
  }
}
