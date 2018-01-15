import { combineReducers } from "redux-immutable";
import initial from './containers/InitialPage/initialReducer';

const rootReducer = combineReducers({
  initial,
});

export default rootReducer;
