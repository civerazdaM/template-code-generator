import { all } from "redux-saga/effects";
import { initialSaga } from './containers/InitialPage/initialSagas';
import { getSomethingSaga } from './containers/ExamplePage/exampleSagas';

export default function* rootSaga() {
  yield all([
    initialSaga(),
    getSomethingSaga(),
  ]);
}
