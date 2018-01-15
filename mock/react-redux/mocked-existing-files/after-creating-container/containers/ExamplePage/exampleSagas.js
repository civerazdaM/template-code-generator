import { takeLatest, put, call } from 'redux-saga/effects';
import { GET_SOMETHING_REQUEST } from './exampleConstants';
import { getSomethingSuccess, getSomethingFailure } from './exampleActions';
import { getSomethingApi } from '../../api/exampleApi';

export function* getSomethingSaga() {
  yield takeLatest(GET_SOMETHING_REQUEST, getSomething);
}

function* getSomething() {
  try {
    let something = yield call(getSomethingApi);
    yield put(getSomethingSuccess(something));
  } catch(e) {
    //eslint-disable-next-line
    console.warn('something fetch failed, please try again ...', e);
    yield put(getSomethingFailure());
  }
}