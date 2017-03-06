import { REHYDRATE } from 'redux-persist/constants';
import _ from 'lodash';

const initialState = {
  url: '',
  history: [],
};

function navigateTracking(state = initialState, action) {
  if (action.type === REHYDRATE) {
    return _.clone(initialState);
  }
  if (action.type === 'NAV_TO') {
    return {
      ...state,
      url: action.payload,
      history: [...state.history, action.payload],
    };
  }
  if (action.type === 'NAV_BACK') {
    return {
      ...state,
      url: state.history[state.history.length - 2],
      history: state.history.slice(0, -1),
    };
  }
  return state;
}

module.exports = navigateTracking;
