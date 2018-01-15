import { GET_SOMETHING_REQUEST, GET_SOMETHING_SUCCESS, GET_SOMETHING_FAILURE } from './exampleConstants';

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