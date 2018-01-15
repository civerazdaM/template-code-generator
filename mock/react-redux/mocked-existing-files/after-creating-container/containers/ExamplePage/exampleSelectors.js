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

export {
  selectExample,
  makeSelectIsGetSomethingInProgress,
  makeSelectIsGetSomethingFailed,
  makeSelectSomething,
}