const compiledStaticTemplates = {
  'ROOT_REDUCER': `#START_OF_REDUCER_IMPORTimport example from './containers/ExamplePage/exampleReducer';#END_OF_REDUCER_IMPORT
#START_OF_REDUCER
  example,
#END_OF_REDUCER
#END_OF_IMPORT_ALL
`,
  'ROOT_SAGA': `#START_OF_SAGA_IMPORTimport { getSomethingSaga } from './containers/ExamplePage/exampleSagas';#END_OF_SAGA_IMPORT
#START_OF_SAGA
    getSomethingSaga(),
#END_OF_SAGA
#END_OF_IMPORT_ALL
`,
  'ACTIONS_UPDATE': `#START_OF_IMPORT_CONSTANTS, GET_ANOTHER_REQUEST, GET_ANOTHER_SUCCESS, GET_ANOTHER_FAILURE #END_OF_IMPORT_CONSTANTS
#END_OF_IMPORT_ALL

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
`,
  'CONSTANTS_UPDATE': `#END_OF_IMPORT_ALL
export const GET_ANOTHER_REQUEST = 'ExamplePage/GET_ANOTHER_REQUEST';
export const GET_ANOTHER_SUCCESS = 'ExamplePage/GET_ANOTHER_SUCCESS';
export const GET_ANOTHER_FAILURE = 'ExamplePage/GET_ANOTHER_FAILURE';
`,
  'API_UPDATE': `#END_OF_IMPORT_ALL

export function getAnotherApi() {
  return callApi({
    url: '/SERVICE_URL',
    method: 'POST',
    body: {
      SOME_PARAMETER_NAME: 'SOME_PARAMETER_VALUE',
    }
  });
}
`,
  'REDUCER_UPDATE': `#START_OF_IMPORT_CONSTANTS, GET_ANOTHER_REQUEST, GET_ANOTHER_SUCCESS, GET_ANOTHER_FAILURE #END_OF_IMPORT_CONSTANTS
#START_OF_IMPORT_INITIAL_STATE,
  another: undefined,
  isGetAnotherInProgress: false,
  isGetAnotherFailed: false
#END_OF_IMPORT_INITIAL_STATE
#START_OF_IMPORT_REDUCER_CASES
    case GET_ANOTHER_REQUEST:
      return state.withMutations((map) => {
        map.set('isGetAnotherInProgress', true)
          .set('isGetAnotherFailed', false)
          .set('another', undefined);
      });
    case GET_ANOTHER_SUCCESS:
      return state.withMutations((map) => {
        map.set('isGetAnotherInProgress', false)
          .set('another', fromJS(action.another));
      });
    case GET_ANOTHER_FAILURE:
      return state.withMutations((map) => {
        map.set('isGetAnotherInProgress', false)
          .set('isGetAnotherFailed', true);
      });
#END_OF_IMPORT_REDUCER_CASES`,
  'SAGAS_UPDATE': `#START_OF_IMPORT_CONSTANTS, GET_ANOTHER_REQUEST #END_OF_IMPORT_CONSTANTS
#START_OF_IMPORT_ACTIONS, getAnotherSuccess, getAnotherFailure #END_OF_IMPORT_ACTIONS
#START_OF_IMPORT_API, getAnotherApi #END_OF_IMPORT_API
#END_OF_IMPORT_ALL

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
`,
  'ROOT_SAGA_UPDATE': `#START_OF_IMPORT_SAGA, getAnotherSaga #END_OF_IMPORT_SAGA
#START_OF_SAGA
    getAnotherSaga(),
#END_OF_SAGA`,
  'SELECTORS_UPDATE': `#START_OF_IMPORT_SELECTOR
const makeSelectIsGetAnotherInProgress = () => createSelector(
  selectExample,
  (exampleState) => exampleState.get('isGetAnotherInProgress')
);

const makeSelectIsGetAnotherFailed = () => createSelector(
  selectExample,
  (exampleState) => exampleState.get('isGetAnotherFailed')
);

const makeSelectAnother = () => createSelector(
  selectExample,
  (exampleState) => exampleState.get('another')
);

#END_OF_IMPORT_SELECTOR
#START_OF_EXPORT_SELECTOR
  makeSelectIsGetAnotherInProgress,
  makeSelectIsGetAnotherFailed,
  makeSelectAnother,
#END_OF_EXPORT_SELECTOR
#END_OF_IMPORT_ALL
`,
  'CONTAINER_COMPONENT_UPDATE': `#START_OF_IMPORT_ACTIONS, getAnotherRequest #END_OF_IMPORT_ACTIONS

#START_OF_IMPORT_SELECTORS, makeSelectIsGetAnotherInProgress, makeSelectIsGetAnotherFailed, makeSelectAnother #END_OF_IMPORT_SELECTORS

#START_OF_IMPORT_PROP_TYPE
  isGetAnotherInProgress: PropTypes.bool.isRequired,
  isGetAnotherFailed: PropTypes.bool.isRequired,
  another: PropTypes.object,
  dispatchGetAnotherRequest: PropTypes.func.isRequired,
#END_OF_IMPORT_PROP_TYPE

#START_OF_IMPORT_FROM_SELECTORS
  isGetAnotherInProgress: makeSelectIsGetAnotherInProgress(),
  isGetAnotherFailed: makeSelectIsGetAnotherFailed(),
  another: makeSelectAnother(),
#END_OF_IMPORT_FROM_SELECTORS

#START_OF_IMPORT_DISPATCH
  dispatchGetAnotherRequest: getAnotherRequest,
#END_OF_IMPORT_DISPATCH`
};

const mockFilesPaths = {
  'INITIAL_ROOT_REDUCER': 'mock/react-redux/mocked-existing-files/before-creating-container/reducers.js',
  'INITIAL_ROOT_SAGA': 'mock/react-redux/mocked-existing-files/before-creating-container/sagas.js',
  'CREATED_ROOT_REDUCER': 'mock/react-redux/mocked-existing-files/after-creating-container/reducers.js',
  'CREATED_ROOT_SAGA': 'mock/react-redux/mocked-existing-files/after-creating-container/sagas.js',
  'CREATED_ACTIONS': 'mock/react-redux/mocked-existing-files/after-creating-container/containers/ExamplePage/exampleActions.js',
  'CREATED_CONSTANTS': 'mock/react-redux/mocked-existing-files/after-creating-container/containers/ExamplePage/exampleConstants.js',
  'CREATED_API': 'mock/react-redux/mocked-existing-files/after-creating-container/api/exampleApi.js',
  'CREATED_SAGAS': 'mock/react-redux/mocked-existing-files/after-creating-container/containers/ExamplePage/exampleSagas.js',
  'CREATED_REDUCER': 'mock/react-redux/mocked-existing-files/after-creating-container/containers/ExamplePage/exampleReducer.js',
  'CREATED_SELECTORS': 'mock/react-redux/mocked-existing-files/after-creating-container/containers/ExamplePage/exampleSelectors.js',
  'CREATED_CONTAINER_COMPONENT': 'mock/react-redux/mocked-existing-files/after-creating-container/containers/ExamplePage/index.js',
  'UPDATED_ACTIONS': 'mock/react-redux/mocked-existing-files/after-updating-container/containers/ExamplePage/exampleActions.js',
  'UPDATED_CONSTANTS': 'mock/react-redux/mocked-existing-files/after-updating-container/containers/ExamplePage/exampleConstants.js',
  'UPDATED_API': 'mock/react-redux/mocked-existing-files/after-updating-container/api/exampleApi.js',
  'UPDATED_SAGAS': 'mock/react-redux/mocked-existing-files/after-updating-container/containers/ExamplePage/exampleSagas.js',
  'UPDATED_REDUCER': 'mock/react-redux/mocked-existing-files/after-updating-container/containers/ExamplePage/exampleReducer.js',
  'UPDATED_SELECTORS': 'mock/react-redux/mocked-existing-files/after-updating-container/containers/ExamplePage/exampleSelectors.js',
  'UPDATED_CONTAINER_COMPONENT': 'mock/react-redux/mocked-existing-files/after-updating-container/containers/ExamplePage/index.js',
  'UPDATED_ROOT_SAGA': 'mock/react-redux/mocked-existing-files/after-updating-container/sagas.js',
}

module.exports = {
  compiledStaticTemplates,
  mockFilesPaths
}
