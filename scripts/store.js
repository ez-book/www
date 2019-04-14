import { updateUI } from './ui';

// Barebones Redux architecture implementation
export const createStore = (initialState = {}, reducer) => {
  let state = initialState;
  return {
    dispatch: action => {
      state = reducer(action, state);
      if(action && action.request) action.request(); // Manual redux-thunk FTW!
      updateUI(state); // Let's just make our lives simple here!
    },
    getState: _ => state
  };
};
