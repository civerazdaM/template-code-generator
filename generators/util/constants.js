const projectPath = require('../../config').projectPath;
const projectSourcePath = require('../../config').projectSourcePath;
const projectApiPath = require('../../config').projectApiPath;
const projectContainersPath = require('../../config').projectContainersPath;
const projectComponentsPath = require('../../config').projectComponentsPath;

const baseDirectoryPaths = {
  'SRC': `${projectPath}${projectSourcePath}`,
  'API': `${projectPath}${projectApiPath}`,
  'CONTAINERS': `${projectPath}${projectContainersPath}`,
  'COMPONENTS_COMMON': `${projectPath}${projectComponentsPath}`
};

const fileNameTypes = {
  'PASCAL_CASE': 'PASCAL_CASE',
  'CAMEL_CASE_WITH_END_STRING': 'CAMEL_CASE_WITH_END_STRING',
  'INDEX': 'INDEX',
  'ROOT_REDUCER': 'ROOT_REDUCER',
  'ROOT_SAGA': 'ROOT_SAGA'
};

const endNameStrings = {
  'CONSTANTS': 'Constants',
  'ACTIONS': 'Actions',
  'API': 'Api',
  'SAGAS': 'Sagas',
  'REDUCER': 'Reducer',
  'SELECTORS': 'Selectors',
  'EMPTY': ''
};

const templateFilePaths = {
  'CONSTANTS': 'templates/react-redux/when-creating-new/constants.hbs',
  'ACTIONS': 'templates/react-redux/when-creating-new/actions.hbs',
  'SAGAS': 'templates/react-redux/when-creating-new/sagas.hbs',
  'ROOT_SAGA': 'templates/react-redux/when-creating-new/rootSaga.hbs',
  'REDUCER': 'templates/react-redux/when-creating-new/reducer.hbs',
  'ROOT_REDUCER': 'templates/react-redux/when-creating-new/rootReducer.hbs',
  'SELECTORS': 'templates/react-redux/when-creating-new/selectors.hbs',
  'CONTAINER_COMPONENT': 'templates/react-redux/when-creating-new/containerComponent.hbs',
  'CLASS_COMPONENT': 'templates/react-redux/when-creating-new/classComponent.hbs',
  'STATELESS_COMPONENT': 'templates/react-redux/when-creating-new/statelessComponent.hbs',
  'API': 'templates/react-redux/when-creating-new/api.hbs',
};

const END_OF_IMPORT_ALL = '#END_OF_IMPORT_ALL';

module.exports = {
  baseDirectoryPaths,
  fileNameTypes,
  endNameStrings,
  templateFilePaths,
  END_OF_IMPORT_ALL
}
