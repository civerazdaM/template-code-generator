const expect = require('chai').expect;

const baseDirectoryPaths = require('../generators/util/constants').baseDirectoryPaths;
const fileNameTypes = require('../generators/util/constants').fileNameTypes;
const endNameStrings = require('../generators/util/constants').endNameStrings;
const templateFilePaths = require('../generators/util/constants').templateFilePaths;

const checkArguments = require('../generators/util').checkArguments;
const parseInput = require('../generators/util').parseInput;
const compileStaticTemplate = require('../generators/util').compileStaticTemplate;
const compileUpdatedFileContent = require('../generators/util').compileUpdatedFileContent;
const resolveIdentifierRootReducer = require('../generators/util').resolveIdentifierRootReducer;
const resolveIdentifierRootSaga = require('../generators/util').resolveIdentifierRootSaga;

const compiledStaticTemplates = require('../mock/constants').compiledStaticTemplates;
const mockFilesPaths = require('../mock/constants').mockFilesPaths;
const readMockFile = require('../generators/util').readMockFile;

describe('Generator Scripts', function() {
    describe('checkArguments', function() {
        it('should throw an Error if container, action or name arguments are missing', function() {
            const argv = {
                scriptName: 'someScript'
            };

            expect(() => checkArguments(argv)).to.throw('Container, action, name parameters are required for someScript script!\nYou can pass it like this:\nnpm run someScript -- --container=container --action=action --name=name');
        });
    });

  describe('parseInput', function() {
    it('when called from when-creating-new/constants.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:constants'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.CAMEL_CASE_WITH_END_STRING;
      const endNameString = endNameStrings.CONSTANTS;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'exampleConstants.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/exampleConstants.js"
      });
    });

    it('when called from when-creating-new/actions.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:actions'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.CAMEL_CASE_WITH_END_STRING;
      const endNameString = endNameStrings.ACTIONS;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'exampleActions.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/exampleActions.js"
      });
    });

    it('when called from when-creating-new/api.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:api'
      };
      const baseDirectory = baseDirectoryPaths.API;
      const fileNameType = fileNameTypes.CAMEL_CASE_WITH_END_STRING;
      const endNameString = endNameStrings.API;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'exampleApi.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/api/exampleApi.js"
      });
    });

    it('when called from when-creating-new/sagas.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:sagas'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.CAMEL_CASE_WITH_END_STRING;
      const endNameString = endNameStrings.SAGAS;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'exampleSagas.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/exampleSagas.js"
      });
    });

    it('when called from when-creating-new/reducer.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:reducer'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.CAMEL_CASE_WITH_END_STRING;
      const endNameString = endNameStrings.REDUCER;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'exampleReducer.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/exampleReducer.js"
      });
    });

    it('when called from when-creating-new/selectors.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:selectors'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.CAMEL_CASE_WITH_END_STRING;
      const endNameString = endNameStrings.SELECTORS;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'exampleSelectors.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/exampleSelectors.js"
      });
    });

    it('when called from when-creating-new/containerComponent.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:containerComponent'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.INDEX;
      const endNameString = endNameStrings.EMPTY;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'index.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/index.js"
      });
    });

    it('when called from when-creating-new/classComponent.js', function() {
      const argv = {
        container: 'example',
        action: 'getSomething',
        name: 'something',
        scriptName: 'make:classComponent'
      };
      const baseDirectory = baseDirectoryPaths.CONTAINERS;
      const fileNameType = fileNameTypes.INDEX;
      const endNameString = endNameStrings.EMPTY;

      expect(parseInput({argv, baseDirectory, fileNameType, endNameString})).to.deep.equal({
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        constantActionName: 'GET_SOMETHING',
        camelCaseName: 'something',
        pascalCaseName: 'Something',
        fileName: 'index.js',
        filePath: "/Users/stefanmadzarevic/projects/react-redux-starter/src/containers/ExamplePage/components/Something/index.js"
      });
    });
  });

  describe('compileStaticTemplate', function() {
    it('when called from when-creating-new/constants.js', function() {
      const pathToTemplate = templateFilePaths.CONSTANTS;
      const templateArguments = {
        constantActionName: 'GET_SOMETHING',
        pascalCaseContainerName: 'Example'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`export const GET_SOMETHING_REQUEST = 'ExamplePage/GET_SOMETHING_REQUEST';
export const GET_SOMETHING_SUCCESS = 'ExamplePage/GET_SOMETHING_SUCCESS';
export const GET_SOMETHING_FAILURE = 'ExamplePage/GET_SOMETHING_FAILURE';
`);
    });

    it('when called from when-creating-new/actions.js', function() {
      const pathToTemplate = templateFilePaths.ACTIONS;
      const templateArguments = {
        constantActionName: 'GET_SOMETHING',
        camelCaseActionName: 'getSomething',
        camelCaseContainerName: 'example',
        camelCaseName: 'something'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import { GET_SOMETHING_REQUEST, GET_SOMETHING_SUCCESS, GET_SOMETHING_FAILURE } from './exampleConstants';

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
}`);
    });

    it('when called from when-creating-new/api.js', function() {
      const pathToTemplate = templateFilePaths.API;
      const templateArguments = {
        camelCaseActionName: 'getSomething'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import callApi from '../util/callApi';

export function getSomethingApi() {
  return callApi({
    url: '/SERVICE_URL',
    method: 'POST',
    body: {
      SOME_PARAMETER_NAME: 'SOME_PARAMETER_VALUE',
    }
  });
}`);
    });

    it('when called from when-creating-new/sagas.js', function() {
      const pathToTemplate = templateFilePaths.SAGAS;
      const templateArguments = {
        constantActionName: 'GET_SOMETHING',
        camelCaseActionName: 'getSomething',
        camelCaseContainerName: 'example',
        camelCaseName: 'something'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import { takeLatest, put, call } from 'redux-saga/effects';
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
}`);
    });

    it('when called from when-creating-new/reducer.js', function() {
      const pathToTemplate = templateFilePaths.REDUCER;
      const templateArguments = {
        constantActionName: 'GET_SOMETHING',
        pascalCaseActionName: 'GetSomething',
        camelCaseContainerName: 'example',
        camelCaseName: 'something'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import { fromJS } from 'immutable';
import { GET_SOMETHING_REQUEST, GET_SOMETHING_SUCCESS, GET_SOMETHING_FAILURE } from './exampleConstants';

const initialState = fromJS({
  something: undefined,
  isGetSomethingInProgress: false,
  isGetSomethingFailed: false
});

function exampleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SOMETHING_REQUEST:
      return state.withMutations((map) => {
        map.set('isGetSomethingInProgress', true)
        .set('isGetSomethingFailed', false)
        .set('something', undefined);
      });
    case GET_SOMETHING_SUCCESS:
      return state.withMutations((map) => {
        map.set('isGetSomethingInProgress', false)
        .set('something', fromJS(action.something));
      });
    case GET_SOMETHING_FAILURE:
      return state.withMutations((map) => {
        map.set('isGetSomethingInProgress', false)
        .set('isGetSomethingFailed', true);
    });
    default:
      return state;
  }
}

export default exampleReducer;`);
    });

    it('when called from when-creating-new/selectors.js', function() {
      const pathToTemplate = templateFilePaths.SELECTORS;
      const templateArguments = {
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseName: 'something',
        pascalCaseName: 'Something'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import { createSelector } from 'reselect';

const selectExample = (state) => state.get('example');

const makeSelectIsGetSomethingInProgress = () => createSelector(
  selectExample,
  (exampleState) => exampleState.get('isGetSomethingInProgress')
);

const makeSelectIsGetSomethingFailed = () => createSelector(
  selectExample,
  (exampleState) => exampleState.get('isGetSomethingFailed')
);

const makeSelectSomething = () => createSelector(
  selectExample,
  (exampleState) => exampleState.get('something')
);

export {
  selectExample,
  makeSelectIsGetSomethingInProgress,
  makeSelectIsGetSomethingFailed,
  makeSelectSomething,
}`);
    });

    it('when called from when-creating-new/containerComponent.js', function() {
      const pathToTemplate = templateFilePaths.CONTAINER_COMPONENT;
      const templateArguments = {
        camelCaseActionName: 'getSomething',
        pascalCaseActionName: 'GetSomething',
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseName: 'something',
        pascalCaseName: 'Something'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSomethingRequest } from './exampleActions';
import { makeSelectIsGetSomethingInProgress, makeSelectIsGetSomethingFailed, makeSelectSomething } from './exampleSelectors';
import Spinner from "../../componentsCommon/Spinner";
import FailurePage from "../../componentsCommon/FailurePage";
import Something from './components/Something';

class ExamplePage extends Component {

  componentWillMount(){
    this.props.dispatchGetSomethingRequest();
  }

  render() {
    let { isGetSomethingInProgress, isGetSomethingFailed, something } = this.props;
    let isLoading = !something;
    let isFailed = isGetSomethingFailed;

    if(isFailed){
      return(<FailurePage />);
    }

    if(isLoading){
      return(<Spinner />);
    }

    return (<Something something={ something.toJS() } />);
  }
}

ExamplePage.propTypes = {
  isGetSomethingInProgress: PropTypes.bool.isRequired,
  isGetSomethingFailed: PropTypes.bool.isRequired,
  something: PropTypes.object,
  dispatchGetSomethingRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isGetSomethingInProgress: makeSelectIsGetSomethingInProgress(),
  isGetSomethingFailed: makeSelectIsGetSomethingFailed(),
  something: makeSelectSomething(),
});

const mapDispatchToPropsObj = {
  dispatchGetSomethingRequest: getSomethingRequest,
};

export default connect(mapStateToProps, mapDispatchToPropsObj) (ExamplePage);
`);
    });

    it('when called from when-creating-new/classComponent.js', function() {
      const pathToTemplate = templateFilePaths.CLASS_COMPONENT;
      const templateArguments = {
        camelCaseName: 'something',
        pascalCaseName: 'Something'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(`import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Something extends Component {
  render() {
    return (

    );
  }
}

Something.propTypes = {
  something: PropTypes.object.isRequired
};

export default Something;`);
    });

    it('when called from when-creating-new/rootReducer.js', function() {
      const pathToTemplate = templateFilePaths.ROOT_REDUCER;
      const templateArguments = {
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(compiledStaticTemplates.ROOT_REDUCER);
    });

    it('when called from when-creating-new/rootSaga.js', function() {
      const pathToTemplate = templateFilePaths.ROOT_SAGA;
      const templateArguments = {
        camelCaseContainerName: 'example',
        pascalCaseContainerName: 'Example',
        camelCaseActionName: 'getSomething'
      };

      expect(compileStaticTemplate({pathToTemplate, templateArguments})).to.equal(compiledStaticTemplates.ROOT_SAGA);
    });
  });

  describe('compileUpdatedFileContent', function() {

    it('when called from when-creating-new/rootReducer.js', function() {
      let re1 = /(.|\s)const rootReducer/ig;
      let re2 = /const rootReduce(.|\s)*}\);/ig;
      let regexArray = [{regexExp: re1, FILE_FLAG: '/\nconst rootReducer', resolveIdentifier: resolveIdentifierRootReducer}, {regexExp: re2, FILE_FLAG: '});', resolveIdentifier: resolveIdentifierRootReducer}];
      expect(compileUpdatedFileContent({pathToFile: mockFilesPaths.INITIAL_ROOT_REDUCER, compiledTemplate: compiledStaticTemplates.ROOT_REDUCER, regexArray})).to.equal(readMockFile(mockFilesPaths.CREATED_ROOT_REDUCER));
    });

    it('when called from when-creating-new/rootSaga.js', function() {
      let re1 = /(.|\s)export default function\* rootSaga/ig;
      let re2 = /export default function\* rootSaga(.|\s)*]\);/ig;
      let regexArray = [{regexExp: re1, FILE_FLAG: '\n\nexport default function* rootSaga', resolveIdentifier: resolveIdentifierRootSaga}, {regexExp: re2, FILE_FLAG: '  ]);', resolveIdentifier: resolveIdentifierRootSaga}];
      expect(compileUpdatedFileContent({pathToFile: mockFilesPaths.INITIAL_ROOT_SAGA, compiledTemplate: compiledStaticTemplates.ROOT_SAGA, regexArray})).to.equal(readMockFile(mockFilesPaths.CREATED_ROOT_SAGA));
    });
  });
});
