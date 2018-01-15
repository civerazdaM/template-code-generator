import { all } from "redux-saga/effects";
import { initialSaga } from './containers/InitialPage/initialSagas';

export default function* rootSaga() {
  yield all([
    initialSaga(),
  ]);
}
