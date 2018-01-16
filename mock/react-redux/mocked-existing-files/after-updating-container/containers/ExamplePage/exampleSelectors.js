import { createSelector } from 'reselect';

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

export {
  selectExample,
  makeSelectIsGetSomethingInProgress,
  makeSelectIsGetSomethingFailed,
  makeSelectSomething,
  makeSelectIsGetAnotherInProgress,
  makeSelectIsGetAnotherFailed,
  makeSelectAnother,
}
