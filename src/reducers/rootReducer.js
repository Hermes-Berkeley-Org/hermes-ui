import { combineReducers } from 'redux';
import okAuthReducer from './okAuthReducer';
import googleAuthReducer from './googleAuthReducer'
import homeReducer from './homeReducer'
import courseReducer from './courseReducer'

export default combineReducers({
 okAuthReducer, homeReducer, courseReducer, googleAuthReducer
});
