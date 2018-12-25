import { combineReducers } from 'redux';
import okAuthReducer from './okAuthReducer';
import googleAuthReducer from './googleAuthReducer'
import homeReducer from './homeReducer'
import courseReducer from './courseReducer'
import lectureReducer from './lectureReducer'
import videoReducer from './videoReducer'
import instructorAuthenticatedReducer from './instructorAuthenticatedReducer'
import transcriptReducer from './transcriptReducer'

export default combineReducers({
  okAuthReducer,
  homeReducer,
  courseReducer,
  lectureReducer,
  videoReducer,
  googleAuthReducer,
  instructorAuthenticatedReducer,
  transcriptReducer
});
