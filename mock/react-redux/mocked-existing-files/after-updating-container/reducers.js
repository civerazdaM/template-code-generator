import { combineReducers } from "redux-immutable";
import initial from './containers/InitialPage/initialReducer';
import example from './containers/ExamplePage/exampleReducer';

const rootReducer = combineReducers({
  initial,
  example,
});

export default rootReducer;
