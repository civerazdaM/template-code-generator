import { takeLatest, put, call } from 'redux-saga/effects';
import { GET_SOMETHING_REQUEST, GET_ANOTHER_REQUEST } from './exampleConstants';
import { getSomethingSuccess, getSomethingFailure, getAnotherSuccess, getAnotherFailure } from './exampleActions';
import { getSomethingApi, getAnotherApi } from '../../api/exampleApi';

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

export function* getAnotherSaga() {
  yield takeLatest(GET_ANOTHER_REQUEST, getAnother);
}

function* getAnother() {
  try {
    let another = yield callWithTokenRefresh(getAnotherApi);
    yield put(getAnotherSuccess(another));
  } catch(e) {
    //eslint-disable-next-line
    console.warn('another fetch failed, please try again ...', e);
    yield put(getAnotherFailure());
  }
}
