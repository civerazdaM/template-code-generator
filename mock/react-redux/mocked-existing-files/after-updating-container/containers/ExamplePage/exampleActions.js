import { GET_SOMETHING_REQUEST, GET_SOMETHING_SUCCESS, GET_SOMETHING_FAILURE, GET_ANOTHER_REQUEST, GET_ANOTHER_SUCCESS, GET_ANOTHER_FAILURE } from './exampleConstants';

export function getSomethingRequest() {
  return {
    type: GET_SOMETHING_REQUEST,
  };
}

export function getSomethingSuccess(something) {
  return {
    type: GET_SOMETHING_SUCCESS,
    something
  };
}

export function getSomethingFailure() {
  return {
    type: GET_SOMETHING_FAILURE,
  };
}

export function getAnotherRequest() {
  return {
    type: GET_ANOTHER_REQUEST,
  };
}

export function getAnotherSuccess(another) {
  return {
    type: GET_ANOTHER_SUCCESS,
    another
  };
}

export function getAnotherFailure() {
  return {
    type: GET_ANOTHER_FAILURE,
  };
}
