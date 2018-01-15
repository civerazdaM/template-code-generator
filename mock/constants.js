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
`
};

const mockFilesPaths = {
  'INITIAL_ROOT_REDUCER': 'mock/react-redux/mocked-existing-files/before-creating-container/reducers.js',
  'INITIAL_ROOT_SAGA': 'mock/react-redux/mocked-existing-files/before-creating-container/sagas.js',
  'CREATED_ROOT_REDUCER': 'mock/react-redux/mocked-existing-files/after-creating-container/reducers.js',
  'CREATED_ROOT_SAGA': 'mock/react-redux/mocked-existing-files/after-creating-container/sagas.js',
}

module.exports = {
  compiledStaticTemplates,
  mockFilesPaths
}
