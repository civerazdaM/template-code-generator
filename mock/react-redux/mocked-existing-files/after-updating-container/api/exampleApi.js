import callApi from '../util/callApi';

export function getSomethingApi() {
  return callApi({
    url: '/SERVICE_URL',
    method: 'POST',
    body: {
      SOME_PARAMETER_NAME: 'SOME_PARAMETER_VALUE',
    }
  });
}

export function getAnotherApi() {
  return callApi({
    url: '/SERVICE_URL',
    method: 'POST',
    body: {
      SOME_PARAMETER_NAME: 'SOME_PARAMETER_VALUE',
    }
  });
}
