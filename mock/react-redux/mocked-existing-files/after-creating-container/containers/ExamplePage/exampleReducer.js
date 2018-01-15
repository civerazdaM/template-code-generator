import { fromJS } from 'immutable';
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

export default exampleReducer;